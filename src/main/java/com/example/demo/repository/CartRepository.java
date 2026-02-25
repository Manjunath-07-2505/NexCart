package com.example.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Cart_item;

public interface CartRepository extends JpaRepository<Cart_item, Integer> {

    Optional<Cart_item> findByUser_UserIdAndProduct_ProductId(
            Integer userId, Integer productId);
}
