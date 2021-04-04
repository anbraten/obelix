import { Service as FeathersService } from '@feathersjs/feathers';
import { onBeforeUnmount, onMounted, Ref, ref } from 'vue';

import { ServiceModels } from '~/types';
import AbstractEntity from '~/types/abstractEntity';

import feathers from './useBackend';

function loadServiceEventHandlers<T extends AbstractEntity>(service: FeathersService<T>, data: Ref<T[]>): () => void {
  const onCreated = (item: T): void => {
    data.value = [...data.value, item];
  };

  const onRemoved = (item: T): void => {
    data.value = data.value.filter(_item => _item._id !== item._id);
  };

  const onItemChanged = (changedItem: T): void => {
    data.value = data.value.map(item => {
      if (item._id === changedItem._id) {
        return changedItem;
      }

      return item;
    });
  };

  service.on('created', onCreated);
  service.on('removed', onRemoved);
  service.on('patched', onItemChanged);
  service.on('updated', onItemChanged);

  const unloadEventHandlers = () => {
    service.off('created', onCreated);
    service.off('removed', onRemoved);
    service.off('patched', onItemChanged);
    service.off('updated', onItemChanged);
  };

  return unloadEventHandlers;
}

export type UseFind<T extends AbstractEntity> = {
  data: Ref<T[]>;
  isLoading: Ref<boolean>;
};

export default <T extends keyof ServiceModels>(serviceName: T): UseFind<ServiceModels[T]> => {
  type M = ServiceModels[T];

  // type cast is fine here (source: https://github.com/vuejs/vue-next/issues/2136#issuecomment-693524663)
  const data = ref<M[]>([]) as Ref<M[]>;
  const isLoading = ref(false);

  const service = feathers.service(serviceName) as FeathersService<M>;
  const unloadEventHandlers = loadServiceEventHandlers<M>(service, data);

  const find = async () => {
    isLoading.value = true;
    data.value = (await service.find({ paginate: false })) as M[];
    isLoading.value = false;
  };

  onMounted(async () => {
    await find();
  });

  feathers.on('connect', () => {
    void find();
  });

  onBeforeUnmount(() => {
    unloadEventHandlers();
  });

  return { data, isLoading };
};
