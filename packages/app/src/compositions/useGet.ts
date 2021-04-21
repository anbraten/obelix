import { Id, Service as FeathersService } from '@feathersjs/feathers';
import { onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue';

import { ServiceModels } from '~/types';
import AbstractEntity from '~/types/abstractEntity';

import feathers from './useBackend';

function loadServiceEventHandlers<T extends AbstractEntity>(
  service: FeathersService<T>,
  _id: Ref<Id | undefined>,
  data: Ref<T | undefined>,
): () => void {
  const onCreated = (item: T): void => {
    if (_id.value === item._id) {
      data.value = item;
    }
  };

  const onRemoved = (item: T): void => {
    if (_id.value === item._id) {
      data.value = undefined;
    }
  };

  const onItemChanged = (item: T): void => {
    if (_id.value === item._id) {
      data.value = item;
    }
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

export type UseGet<T extends AbstractEntity> = {
  data: Ref<T | undefined>;
  isLoading: Ref<boolean>;
};

export default <T extends keyof ServiceModels>(serviceName: T, _id: Ref<Id | undefined>): UseGet<ServiceModels[T]> => {
  type M = ServiceModels[T];

  const data = ref<M>();
  const isLoading = ref(false);

  const service = feathers.service(serviceName) as FeathersService<M>;
  const unloadEventHandlers = loadServiceEventHandlers<M>(service, _id, data);

  const get = async () => {
    isLoading.value = true;
    if (_id.value) {
      data.value = await service.get(_id.value);
    }
    isLoading.value = false;
  };

  onMounted(async () => {
    await get();
  });

  const onConnect = () => {
    void get();
  };
  feathers.on('connect', onConnect);

  watch(_id, async () => {
    await get();
  });

  onBeforeUnmount(() => {
    unloadEventHandlers();
    feathers.off('connect', onConnect);
  });

  return { isLoading, data };
};
