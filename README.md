# tomtom-n.ext-hackathon-2021

Merges data from the dutch government into the TomTom map API.

## Features
- shows de-iced roads in different colors.
- shows parking garages and their current parking spot availability

## To build
`docker-compose up --build`

## Api endpoints
`/coords/?lat=number&long=number&max=number&range=number&type=number`
___
This returns items found in the viscinity of the coordinates given.

- `max`: returns max amount of items
- `range`: range in size of coordinates: eg. 0.1deg
- `type`: ParkeerGarage or Strooier
- `lat, long`: the coordinates of the startpoint

`/clear`
___

This clears the database

`/loaddata`
___
Loads the data into the database

