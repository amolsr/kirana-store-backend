import {Entity, model, property} from '@loopback/repository';

@model()
export class UserCredentials extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectID'},
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
  })
  userId?: string;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations;
