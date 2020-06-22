package com.skilldistillery.ravetracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.skilldistillery.ravetracker.entities.Address;
import com.skilldistillery.ravetracker.entities.Event;
import com.skilldistillery.ravetracker.repositories.EventRepository;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	private EventRepository repo;
	
	@Override
	public List<Event> getAll() {
		return repo.findAll();
	}

	@Override
	public List<Event> getAllEnabled() {
		return repo.findByEnabledTrue();
	}
	
	@Override
	public List<Event> getAllDisabled() {
		return repo.findByEnabledFalse();
	}
	
	@Override
	public Event eventById(int eid) {
		Optional<Event> opt = repo.findById(eid);
		if (opt.isPresent()) {
			Event event = opt.get();
			return event;
		} else {
			return null;
		}
	}

	@Override
	public Event eventByIdEnabled(int eid) {
		Event event;
		try {
			event = repo.findByIdAndEnabledTrue(eid);
			return event;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<Event> eventsByName(String search) {
		search = "%" + search + "%";
		return repo.findByEnabledTrueAndNameLike(search);
	}
	
	@Override
	public Event createEvent(Event event) {
		try {
			event.setEnabled(true);
			repo.save(event);
		} catch (Exception e) {
			e.printStackTrace();
			event = null;
		}
		return event;
	}
	
	@Override
	public Event updateEvent(int eid, Event event) {
		Optional<Event> current = repo.findById(eid);
		if (current.isPresent()) {
			Event updated = current.get();
			updated.setName(event.getName());
			updated.setDescription(event.getDescription());
			updated.setStartDate(event.getStartDate());
			updated.setEndDate(event.getEndDate());
			updated.setStartTime(event.getStartTime());
			updated.setEndTime(event.getEndTime());
			updated.setImgURL(event.getImgURL());
			updated.setAttending(event.isAttending());
			repo.saveAndFlush(updated);
			return updated;
		} else {
			return null;
		}
	}
	
	@Override
	public boolean disableEvent(int eid) {
		Optional<Event> opt = repo.findById(eid);
		if (opt.isPresent() && opt.get().isEnabled() == true) {
			Event toDisable = opt.get();
			toDisable.setEnabled(false);
			repo.saveAndFlush(toDisable);
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public boolean enableEvent(int eid) {
		Optional<Event> opt = repo.findById(eid);
		if (opt.isPresent()) {
			Event toEnable = opt.get();
			toEnable.setEnabled(true);
			repo.saveAndFlush(toEnable);
			return true;
		} else {
			return false;
		}
	}

}
