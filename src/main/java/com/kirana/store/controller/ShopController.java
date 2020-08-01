package com.kirana.store.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kirana.store.model.Shop;
import com.kirana.store.repository.ShopRepository;

@RestController
public class ShopController {
    @Autowired
    ShopRepository shopRepository;

    @GetMapping("/shops")
    public List<Shop> getShops() {
        List<Shop> shopsList = shopRepository.findAll();
        return shopsList;
    }

    @GetMapping("/shop/{id}")
    public Optional<Shop> getShop(@PathVariable ObjectId id) {
        Optional<Shop> user = shopRepository.findById(id);
        return user;
    }

    @PutMapping("/shop/{id}")
    public Optional<Shop> updateShop(@RequestBody Shop newShop, @PathVariable ObjectId id) {
        Optional<Shop> optionalShop = shopRepository.findById(id);
        if (optionalShop.isPresent()) {
            Shop shop = optionalShop.get();
            shop.setShopName(newShop.getShopName());
            shop.setOwner(new ObjectId(newShop.getOwner()));
            shop.setGstNumber(newShop.getGstNumber());
            shop.setAddressLine(newShop.getAddressLine());
            shop.setCity(newShop.getCity());
            shop.setPincode(newShop.getPincode());
            shop.setRange(newShop.getRange());
            shop.setService(newShop.getService());
            shopRepository.save(shop);
        }
        return optionalShop;
    }

    @DeleteMapping(value = "/shop/{id}", produces = "application/json; charset=utf-8")
    public Map<String, Object> deleteShop(@PathVariable ObjectId id) {
        Map<String, Object> response = new HashMap<>();
        Boolean result = shopRepository.existsById(id);
        shopRepository.deleteById(id);
        response.put("success", result);
        return response;
    }

    @PostMapping("/shop")
    public Map<String, Object> addShop(@RequestBody Shop newShop) {
        Map<String, Object> response = new HashMap<>();
        try {
            ObjectId id = new ObjectId();
            Shop shop = new Shop(id, newShop.getShopName(), new ObjectId(newShop.getOwner()), newShop.getGstNumber(), newShop.getAddressLine(),newShop.getPincode(),newShop.getCity(),newShop.getRange(),newShop.getService());
            shopRepository.insert(shop);
            response.put("success", Boolean.TRUE);
            response.put("result", shop);
            return response;
        } catch (org.springframework.dao.DuplicateKeyException e) {
            response.put("success", Boolean.FALSE);
            response.put("error", "Shop Exist");
            return response;
        } catch (Exception e) {
            response.put("success", Boolean.FALSE);
            return response;
        }
    }
}