import AbstractEntity from './abstractEntity';

export type Ref<T extends AbstractEntity> = T['_id'];
