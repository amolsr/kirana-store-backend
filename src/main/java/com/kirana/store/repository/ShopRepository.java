package com.kirana.store.repository;

import com.kirana.store.model.Shop;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShopRepository extends MongoRepository<Shop, ObjectId> {

}