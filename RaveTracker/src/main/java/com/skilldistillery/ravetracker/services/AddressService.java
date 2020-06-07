package com.skilldistillery.ravetracker.services;

import java.util.List;

import com.skilldistillery.ravetracker.entities.Address;

public interface AddressService {

	List<Address> getAll();
	List<Address> getAllEnabled();
	List<Address> getAllDisabled();
	Address addressById(int aid);
	Address addressByIdEnabled(int aid);
	List<Address> addressesByCountryCode(String cc);
	Address createAddress(Address address);
	Address updateAddress(int aid, Address address);
	boolean disableAddress(int aid);
	boolean enableAddress(int aid);
}
