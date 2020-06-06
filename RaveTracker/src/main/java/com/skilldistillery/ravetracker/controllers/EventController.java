package com.skilldistillery.ravetracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.ravetracker.entities.Event;
import com.skilldistillery.ravetracker.services.EventService;

@RestController
@RequestMapping("api")
public class EventController {

	@Autowired
	private EventService svc;

	@GetMapping("events")
	public List<Event> getAllEnabled() {
		return svc.getAllEnabled();
	}

	@GetMapping("events/{eid}")
	public Event getByIdEnabled(
			@PathVariable Integer eid,
			HttpServletResponse response) {
		
		try {
			Event event = svc.eventByIdEnabled(eid);
			if (event == null) {
				response.setStatus(404);
			}
			return event;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			return null;
		}
	}
	
	@GetMapping("events/search/{search}")
	public List<Event> searchByNameAndEnabled(
			@PathVariable String search,
			HttpServletResponse response) {
		
		try {
			List<Event> events = svc.eventsByName(search);
			if (events.size() == 0) {
				response.setStatus(404);
			}
			return events;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			return null;
		}
	}
}
