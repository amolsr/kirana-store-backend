package com.kirana.store.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "shop")
public class Shop implements Persistable<String> {
    @Id
    public ObjectId _id;

    public String get_id() {
        return _id.toHexString();
    }

    private String shopName;
    private ObjectId owner;

    public String getOwner() {
        return owner.toHexString();
    }

    public Shop(ObjectId _id, String shopName, ObjectId owner, Long gstNumber, String addressLine, String pincode,
            String city, Integer range, String[] service) {
        this._id = _id;
        this.shopName = shopName;
        this.owner = owner;
        this.gstNumber = gstNumber;
        this.addressLine = addressLine;
        this.pincode = pincode;
        this.city = city;
        this.range = range;
        this.service = service;
    }

    @Indexed(unique = true)
    private Long gstNumber;
    private String addressLine;
    private String pincode;
    private String city;
    private Integer range;
    private String[] service;
    @CreatedDate
    private Date createdDate = new Date();
    @LastModifiedDate
    private Date updatedAt;

    @Override
    public String getId() {
        return _id.toHexString();
    }

    @Override
    public boolean isNew() {
        return _id == null;
    }
}