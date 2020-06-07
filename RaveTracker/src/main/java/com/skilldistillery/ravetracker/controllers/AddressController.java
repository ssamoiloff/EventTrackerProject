package com.skilldistillery.ravetracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.ravetracker.entities.Address;
import com.skilldistillery.ravetracker.services.AddressService;

@RestController
@RequestMapping("api")
public class AddressController {

	@Autowired
	private AddressService svc;
	
	@GetMapping("addresses")
	public List<Address> getAllEnabled() {
		return svc.getAllEnabled();
	}
	
	@GetMapping("addresses/{aid}")
	public Address getByIdEnabled(
			@PathVariable Integer aid,
			HttpServletResponse resp) {
		
		try {
			Address addr = svc.addressByIdEnabled(aid);
			if (addr == null) {
				resp.setStatus(404);
			}
			return addr;
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
	}
	
	@GetMapping("addresses/countries/{cc}")
	public List<Address> getByCountryCodeEnabled(
			@PathVariable String cc,
			HttpServletResponse resp) {
		
		try {
			List<Address> addrs = svc.addressesByCountryCode(cc);
			if (addrs.size() == 0) {
				resp.setStatus(404);
			}
			return addrs;
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
	}
}
