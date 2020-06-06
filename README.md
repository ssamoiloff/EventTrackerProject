## Event Tracker Project

### Week 11-13 Project for Skill Distillery

## Overview

Rave Tracker is a service that will eventually be a hub for the American EDM subculture to find and post events in the Dance Music scene. Unregistered users will be able to search events, while registered users will have the ability to create content in addition to search for it. The intention is to unite ravers and casual festival/party goers and provide an aggregated source of information regarding EDM events, and to eventually expand the scope of this service to include countries outside of the United States. At this time, functionality will solely be focused towards the Junglists out there (Drum & Bass fans), as I personally feel we are in the most need of growth in the American scene.

## API Endpoints

| Returns | Verb  | URI   | Description |
|---------|-------|-------|-------------|
| List&lt;Event&gt; | GET | api/events | Retrieve list of events |
| Event | GET | api/events/{eid} | Retrieve single event by ID |
| List&lt;Event&gt; | GET | api/events/search/{search} | Search events by name |
| Event | POST | api/events | Create an event |
| Event | PUT | api/events/{eid} | Update an event |
| void | DELETE | api/events/{eid} | Disable an event |

## Technologies Used
* MySQL, MySQL Workbench
* JPA/Hibernate
* Spring Boot
* Spring Data JPA
* Postman
* Git/Github
