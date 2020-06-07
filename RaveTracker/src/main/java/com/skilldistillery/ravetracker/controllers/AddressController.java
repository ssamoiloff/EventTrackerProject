package com.skilldistillery.ravetracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping("addresses")
	public Address create(@RequestBody Address addr,
			HttpServletRequest req,
			HttpServletResponse resp) {
		
		try {
			addr = svc.createAddress(addr);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(addr.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			addr = null;
		}
		return addr;
	}
	
	@PutMapping("addresses/{aid}")
	public Address update(@PathVariable Integer aid,
			@RequestBody Address addr,
			HttpServletRequest req,
			HttpServletResponse resp) {
		
		try {
			addr = svc.updateAddress(aid, addr);
			if (addr == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			addr = null;
		}
		return addr;
	}
	
	@DeleteMapping("addresses/{aid}")
	public void disable(@PathVariable Integer aid,
			HttpServletResponse resp) {
		
		try {
			if (svc.disableAddress(aid)) {
				resp.setStatus(204);
			} else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
	}
}
