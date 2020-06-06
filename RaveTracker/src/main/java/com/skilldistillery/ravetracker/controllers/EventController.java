package com.skilldistillery.ravetracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
			HttpServletResponse resp) {
		
		try {
			Event event = svc.eventByIdEnabled(eid);
			if (event == null) {
				resp.setStatus(404);
			}
			return event;
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
	}
	
	@GetMapping("events/search/{search}")
	public List<Event> searchByNameAndEnabled(
			@PathVariable String search,
			HttpServletResponse resp) {
		
		try {
			List<Event> events = svc.eventsByName(search);
			if (events.size() == 0) {
				resp.setStatus(404);
			}
			return events;
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
	}
	
	@PostMapping("events")
	public Event create(@RequestBody Event event,
			HttpServletRequest req, HttpServletResponse resp) {
		try {
			event = svc.createEvent(event);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(event.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			event = null;
		}
		return event;
	}
	
	@PutMapping("events/{eid}")
	public Event update(@PathVariable Integer eid, @RequestBody Event event,
			HttpServletRequest req, HttpServletResponse resp) {
		try {
			event = svc.updateEvent(eid, event);
			if (event == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			event = null;
		}
		return event;
	}
}
