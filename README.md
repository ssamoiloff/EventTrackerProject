## Event Tracker Project

### Week 11-13 Project for Skill Distillery

## Overview

Rave Tracker is a service that will eventually be a hub for the American EDM subculture to find and post events in the Dance Music scene. Unregistered users will be able to search events, while registered users will have the ability to create content in addition to search for it. The intention is to unite ravers and casual festival/party goers and provide an aggregated source of information regarding EDM events, and to eventually expand the scope of this service to include countries outside of the United States. At this time, functionality will solely be focused towards the Junglists out there (Drum & Bass fans), as I personally feel we are in the most need of growth in the American scene.

#### From the back to the front:
Database: MySQL

DB Access: Spring Data JPA & Hibernate

Http handling: SpringREST

Frontend: ...


## API Endpoints

#### Event
| Returns | Verb  | URI   | Description |
|---------|-------|-------|-------------|
| List&lt;Event&gt; | GET | api/events | Retrieve list of all events |
| Event | GET | api/events/{eid} | Retrieve single event by ID |
| List&lt;Event&gt; | GET | api/events/search/{search} | Search events by name |
| Event | POST | api/events | Create an event |
| Event | PUT | api/events/{eid} | Update an event |
| void | DELETE | api/events/{eid} | Disable an event |

#### Address
| Returns | Verb  | URI   | Description |
|---------|-------|-------|-------------|
| List&lt;Address&gt; | GET | api/addresses | Retrieve list of all addresses |
| Address | GET | api/addresses/{aid} | Retrieve single address by ID |
| List&lt;Address&gt; | GET | api/addresses/countries/{cc} | Retrieve address by country code |
| Address | POST | api/Addresses | Create an address |
| Address | PUT | api/addresses/{aid} | Update an address |
| void | DELETE | api/addresses/{aid} | Disable an address |

## Technologies Used
* MySQL, MySQL Workbench
* JPA/Hibernate
* Spring Boot
* Spring Data JPA
* Postman
* Git/Github
