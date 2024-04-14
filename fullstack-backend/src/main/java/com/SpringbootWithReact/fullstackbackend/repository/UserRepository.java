package com.SpringbootWithReact.fullstackbackend.repository;

import com.SpringbootWithReact.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User, Long> {
}
