package com.kirana.store.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Document(collection = "user")
public class User {
    @Id
    public ObjectId _id;
    public String get_id() {
        return _id.toHexString();
    }
    private String name;
    @Indexed(unique = true)
    private String email;
    private Long mobile;
    private String password;
}