package com.green.greenEarthForUs.user.Repository;

import com.green.greenEarthForUs.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}