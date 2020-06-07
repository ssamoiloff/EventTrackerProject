package com.skilldistillery.ravetracker.services;

import java.util.List;

import com.skilldistillery.ravetracker.entities.Event;

public interface EventService {

	List<Event> getAll();
	List<Event> getAllEnabled();
	List<Event> getAllDisabled();
	Event eventById(int eid);
	Event eventByIdEnabled(int eid);
	List<Event> eventsByName(String search);
	Event createEvent(Event event);
	Event updateEvent(int eid, Event event);
	boolean disableEvent(int eid);
	boolean enableEvent(int eid);
}
