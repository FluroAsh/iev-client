# iEV CHARGING STATION APPLICATION

## Client Application Link
- [TBD - Netlify]()

## TABLE OF CONTENTS
--------------------- 
1. [Purpose](#purpose)
2. [Functionality & Features](#functionalityfeatures)
3. [Target Audience](#target-audience)
4. [Tech Stack](#tech-stack)
5. [Dataflow Diagram](#dataflow-diagram)
6. [Application Architecture Diagram](#application-architecture-diagram)
7. [User Stories](#user-stories)
8. [Wireframes](#wireframes)
   1. [Wireframes (1)](#wireframes-1)
   2. [Wireframes (2)](#wireframes-2)
9.  [Trello Screenshots](#trello-screenshots)

## Purpose
--------------------- 
Climate change is real and Australia has done very little to help with the climate crisis compared to other countries around the world, with various green initiatives.

Petrol price doubled in the last few months and it will continue to go up. Australia is currently being hammered by petrol prices that have not been seen since the Global Financial Crisis in 2008 where a litre of fuel would have set you back 212.9 cents. At their peaks many states are seeing these prices rise above this all time high, exceeding over 220 cents per litre, while currently going on an average of 193 cents nationwide. 

Electric Vehicles are the future but with little action from the government, buying an EV is still relatively expensive and people are hesitant due to the charging logistics and lack of charging station infrastructure around the country.

If you live in the city and do not own a house, owning an EV is a real challenge, with charging stations being far and few between. On the other hand, if you own a house with a solar power plant, and a charging station at home, most of the time the charging station is not used to its full potential and the surplus solar power is sold to the power company at a heavily discounted price. 

This is where iEV comes in. iEV promotes interconnected community networks for EV charging stations. iEV helps connect EV drivers and EV charger owners so that the EV charging stations network can grow exponentially and as a result create a sustainable and widespread charging stations network. 

With iEV, charging station hosts can earn a premium on their surplus energy derived from their solar plan (or off peak power), rather than selling at a discounted price back to power companies. iEV helps people who do not own a house feel more confident with buying an EV as iEV offers a huge community based charger network and on that they can find and book a charging station in their neighbourhood fairly easily. With the ability to pre-book charging facilities on iEV, travellers can go on a long distance trip with peace of mind in terms of refilling logistics.


## Functionality/Features
--------------------- 
### User Signup/Signin
- Users will be able to have the ability to register with username/email & password
- Users can be authenticated with an existing/generated JWT `(JSON Web Token)` at login/signup
- OAUTH is an additional consideration after MVP has been created

### Charging Station (CRUD)
Hosts can create charging stations for renting purposes. Only registered/logged-in users will be able to create new charging stations/locations. 
Host can edit/update charging stations details such as unavailability dates, edit plug type, take a charging station on/off market etc. 
Host can delete the charging station(s) from the database.
Renters and hosts can view a charging station details. Hosts can access all of their charging stations payment status. 

### User vehicle (CRD)
All users can add their vehicle details to their profile to personalize their charging stations search (only compatible charging stations are shown in their search results).
Users can view the vehicle list and each vehicle details
Users can delete the vehicle from the database

### Booking System (CRU): 
- Allow users to request booking for *charging sessions* for an allocated date
- Only signed-in users can make bookings. 
- Signed-in users can access and manage all of their bookings such as checking their booking details including host details, booking requests status.
- Host can approve/reject booking requests.
- Renters can make payments to approved booking requests.
- Renters can cancel booking(s) 3 days prior to the booking date(s) if their plan changes. Users will not be able to cancel bookings after this (more flexibility and cancellation methods later if we have time).
- A booking should include the charging station’s details such as address, instructions, host’s name, phone number etc.

### Charging Station Search (R)
- Users should be able to search an address (or city, postcode) and get a list of nearby charging stations without having to sign up or signed-in
- Then be able to select which charging station they would like to charge at, view availability, add to booking cart and finally send a booking request
- When user signed-in to search, they will see a list of charging stations which are compatible to their car only (if they have added their vehicle details to their account already) 

### Payment Method for Bookings (C)
#### Stripe/Other Payment Processing Application 
- Should allow users to enter payment details prior to finalise the booking
- Once the payment is made and confirmed by Stripe, booking status should change to paid and booking records need to be updated and payment records need to be created.

### Review System (CRUD)
- Users should be able to leave reviews based on their experience (rated from 1-5) 
- Host can review renter and vice versa
- These reviews should be associated with a host, and the user who created it
- They should appear under each charging station ‘listing’ and each user profile page.


## Target Audience
--------------------- 
- EV owners and drivers
- EV home charging station owners
- Commercial EV charging stations providers (eg. Tesla, E-station, Jetcharge, etc.)
- Homeowners with solar power and power surplus after household uses. Encourage those people to invest in an EV charging station business with iEV.


## Tech Stack
--------------------- 
### Frontend
- React

### Backend (API)
- Express
- Node.js

### Database
- PostgreSQL
- SQL

## Dataflow Diagram
--------------------- 
![dataflow diagram](./docs/dataflow-diagram.png)

## Application Architecture Diagram
--------------------- 
![application architecture diagram](./docs/application-architecture-diagram.png)

## User Stories
--------------------- 
### Martin
> Martin is a 45 year old dad who is a clean energy fanatic, he owns an EV - Tesla model X. He also has a Tesla supercharger at home. He has a solar power system at home.
- As a host I want to be able to set unavailability dates so that on specific dates I can use my charger for my car, or in case I am unable to provide access to the charging station for an extended period of time.
- I want to be able to see the requesting users' profile, name, and reviews so that I can have an idea of how the requestor is before approve/deny their access to my property/charging station `(Not MVP)`
- I want to rent my charger to others on a platform that facilicates an easy transaction, with little work from my end so that I can earn a premium on my solar power surplus with as little work as possible. I'm a busy guy after all!
- I want to have the ability to approve or deny a request to access to my property/charger so that I feel secure in knowing I have the choice to decide who has access to my private residence.
- As a host I *also* want the ability to book a charging station for when I go on a long distance trip, with all the security a typical user would have.
- As Martin, I want my personal details are secured so that hackers cannot access it for malicious purposes.

### Damien
> Damien is a 30 year old sales manager, he has an EV - Ford Kuga 2021 and uses it quite often for work. Sasha lives in an old apartment building that has no EV charging facility. Sasha normally has to charge his car at night or on the weekend at either a nearby supermarket or shopping center.
- I need to charge my EV regularly (weekly), I want to book more than 1 date at a time so I do not need to make repetitive bookings every week.
-  I want to rent a charging station near home so that I can charge my car without having to worry about parking limits at a shopping mall.
-  I want to book a few stations in different locations at a time so that when I go on a long distance work trip, I can refill as I go. Ideally, it should be easy to track all my current bookings via the app.
-  I want to be able to cancel the booking if my plan changes so that I don't have to pay for what I don't intend to use.
-  I prefer to make payment for my booking through the app so I don't have to worry about bringing cash or making payment at the property. This makes me feel more comfortable and secure in dealing with the third-parties involved.

### EV Charge
> EVCharge is an EV charging station provider. EVCharge owns multiple charging stations in multiple locations around Australia. EVCharge machines allow users to fill and pay based on their actual kwh usage.
- We welcome everyone and want users to be able to instantly book our stations, so we have an admin person to manually approve the bookings and communicate with customers. 
- We have payment facilities at the charging stations so we want users to pay us there, that way we don’t have to deal with third party payment etc.

## Wireframes
--------------------- 
### Wireframes (1)
![wireframes](./docs/wireframes-1.png)

### Wireframes (2)
![wireframes](./docs/wireframes-2.png)

## Trello Screenshots
--------------------- 
![trello-1](docs/trello-1.png)
![trello-2](docs/trello-2.png)
![trello-3](docs/trello-3.png)
![trello-4](docs/trello-4.png)
![trello-5](docs/trello-5.png)
![trello-6](docs/trello-6.png)
![trello-7](docs/trello-7.png)
![trello-8](docs/trello-8.png)
![trello-9](docs/trello-9.png)
![trello-10](docs/trello-10.png)
![trello-11](docs/trello-11.png)
![trello-12](docs/trello-12.png)
![trello-12](docs/trello-13.png)
