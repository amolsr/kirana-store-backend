import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {Shop, ShopRelations, User} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class ShopRepository extends DefaultCrudRepository<
  Shop,
  typeof Shop.prototype._id,
  ShopRelations
> {
  public readonly ownership: BelongsToAccessor<User, typeof Shop.prototype._id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Shop, dataSource);
    this.ownership = this.createBelongsToAccessorFor(
      'ownership',
      userRepositoryGetter,
    );
    this.registerInclusionResolver(
      'ownership',
      this.ownership.inclusionResolver,
    );
  }
}
