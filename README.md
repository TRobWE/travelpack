![img](https://i.imgur.com/qfsxiVq.png)

## About Travelpack

### Travelpack takes the stress away from planning group trips by creating a central location for messaging and planning. Think of us as GroupMe for trips!

Travelpack is a cross platform application that allows users to communicate in real time as they plan their trips. Users can search through tourist attractions and add items to the group(pack) itinerary. Once the item is on the group itinerary, pack members can gage the groups interest throught a polling feature. Travelpack comes with a built in budget calculator that helps packs estimate the cost of the trip as well as an agenda to help members track what anything what they need to do to prepare for the trip. 

During the trip, users can utilize travelpack's find my pack feature to pin point the real time locations of their pack members and upload photos to the pack photo album to keeps all of their memories in one place!

## Table of Contents

1. [What is Travelpack?](#travelpack)
1. [Team](#Team)
1. [Wireframes](#wireframes)
1. [Tech Stack](#tech-stack)
1. [Database Schema](#database-schema)
1. [Architecture](#architecture)
1. [Development](#development)
    1. [Requirements](#requirements)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Team 
  - __Product Owner__: Rose Espiritu
  - __Scrum Master__: David Delgado
  - __Development Team Members__: Taijon Robinson, David Delgado, Rose Espiritu

## Wireframes 
![img](https://res.cloudinary.com/djdelgado/image/upload/v1501169154/Screen_Shot_2017-07-27_at_10.24.16_AM_hrrjmw.png)

## Tech Stack 
![img](https://i.imgur.com/Dw9ptYs.png)

### Summary of Tech Stack
* Front End: Ionic, Cordova, Angular 2, Typescript
* Server: FeatherJS, Socket.io, Sequalize, Passport
* Server 2: Apache Tomcat, Springboot-JPA, Maven
* Database: PostgreSQL
* Deployment: Docker, Amazon Web Services
* Testing: Travis CI, Mocha, Chai

## Database Schema 
The schema for Travelpack was designed with packs in the center. Packs have a one to many relationship with the itinerary, map, photo, budget, and message to ensure that only members within each pack have access to the data thereby maintaining each pack(groups) privacy.

![img](https://i.imgur.com/bY9BorX.png)

### Summary of database schema:
* Packs have one to many relationship with itinerary, map, photo, budget, and message.
* Users and Packs have a many to many relationship with Group as their join table.
* Each Message belongs to a user and pack.

## Architecture

![img](http://res.cloudinary.com/djdelgado/image/upload/v1501182320/Screen_Shot_2017-07-27_at_2.04.36_PM_wxblib.png)

## Development

### Requirements
- Node.js 8.1.4
- NPM 5.0.3
- Ionic 3.5.0
- Cordova 7.0.1
- Postgresql 9.6

### Installing Dependencies

From within the root directory:
```bash
$ npm install -g cordova
$ npm install -g ionic
$ npm install -g typescript
$ npm install
```

To start front end run:
```bash
$ ionic serve
```
## Contributing 
Check out our initial [Press Release](PRESS-RELEASE.md) . We prepared it the second day of our project in an effort to carve out a vision for our app. Do you think our final product was close to our initial vision? 

If you'd like to contribute checkout our [Contributing Guidelines](_CONTRIBUTING.md)! 
