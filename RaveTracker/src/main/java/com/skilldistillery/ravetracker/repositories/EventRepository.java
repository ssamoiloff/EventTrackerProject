package com.skilldistillery.ravetracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.ravetracker.entities.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

	List<Event> findByEnabledTrue();
	List<Event> findByEnabledFalse();
	List<Event> findByNameAndEnabledTrue(String name);
}
