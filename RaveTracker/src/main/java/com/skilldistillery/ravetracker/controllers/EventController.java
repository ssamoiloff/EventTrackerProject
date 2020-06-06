package com.skilldistillery.ravetracker.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.ravetracker.entities.Event;
import com.skilldistillery.ravetracker.services.EventService;

@RestController
@RequestMapping("api")
public class EventController {

	private EventService svc;
	
	@GetMapping("events")
	public List<Event> getAllEnabled() {
		return svc.getAllEnabled();
	}
	
	
}
