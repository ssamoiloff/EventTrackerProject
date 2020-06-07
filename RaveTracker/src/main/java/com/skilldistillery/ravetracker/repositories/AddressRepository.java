package com.skilldistillery.ravetracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.ravetracker.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	List<Address> findByEnabledTrue();
	List<Address> findByEnabledFalse();
	List<Address> findByEnabledTrueAndCountryCode(String cc);
	Address findByIdAndEnabledTrue(int aid);
}
