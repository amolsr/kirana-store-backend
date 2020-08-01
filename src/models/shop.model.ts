import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Shop extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  shopName: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  gstNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  addressLine: string;

  @property({
    type: 'number',
    required: true,
  })
  pincode: number;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'number',
    required: true,
  })
  range: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  service: string[];

  @belongsTo(() => User, {name: 'ownership'})
  owner: string;

  constructor(data?: Partial<Shop>) {
    super(data);
  }
}

export interface ShopRelations {
  // describe navigational properties here
}

export type ShopWithRelations = Shop & ShopRelations;
