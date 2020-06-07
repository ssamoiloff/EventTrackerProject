package com.skilldistillery.ravetracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.ravetracker.entities.Address;
import com.skilldistillery.ravetracker.repositories.AddressRepository;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressRepository repo;
	
	@Override
	public List<Address> getAll() {
		return repo.findAll();
	}

	@Override
	public List<Address> getAllEnabled() {
		return repo.findByEnabledTrue();
	}

	@Override
	public List<Address> getAllDisabled() {
		return repo.findByEnabledFalse();
	}

	@Override
	public Address addressById(int aid) {
		Optional<Address> opt = repo.findById(aid);
		if (opt.isPresent()) {
			Address addr = opt.get();
			return addr;
		} else {
			return null;
		}
	}

	@Override
	public Address addressByIdEnabled(int aid) {
		Address addr;
		try {
			addr = repo.findByIdAndEnabledTrue(aid);
			return addr;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<Address> addressesByCountryCode(String cc) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Address create(Address address) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Address update(int aid, Address address) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean disableAddress(int aid) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean enableAddress(int aid) {
		// TODO Auto-generated method stub
		return false;
	}

}
