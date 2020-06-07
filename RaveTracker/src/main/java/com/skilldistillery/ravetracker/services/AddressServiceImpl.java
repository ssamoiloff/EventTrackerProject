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
		return repo.findByEnabledTrueAndCountryCode(cc);
	}

	@Override
	public Address createAddress(Address address) {
		try {
			address.setEnabled(true);
			repo.save(address);
		} catch (Exception e) {
			e.printStackTrace();
			address = null;
		}
		return address;
	}

	@Override
	public Address updateAddress(int aid, Address address) {
		Optional<Address> current = repo.findById(aid);
		if (current.isPresent()) {
			Address updated = current.get();
			updated.setStreet1(address.getStreet1());
			updated.setStreet2(address.getStreet2());
			updated.setCity(address.getCity());
			updated.setStateProvince(address.getStateProvince());
			updated.setPostalCode(address.getPostalCode());
			updated.setCountryCode(address.getCountryCode());
			repo.saveAndFlush(updated);
			return updated;
		} else {
			return null;
		}
	}

	@Override
	public boolean disableAddress(int aid) {
		Optional<Address> opt = repo.findById(aid);
		if (opt.isPresent()) {
			Address toDisable = opt.get();
			toDisable.setEnabled(false);
			repo.saveAndFlush(toDisable);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean enableAddress(int aid) {
		Optional<Address> opt = repo.findById(aid);
		if (opt.isPresent()) {
			Address toEnable = opt.get();
			toEnable.setEnabled(true);
			repo.saveAndFlush(toEnable);
			return true;
		} else {
			return false;
		}
	}

}
