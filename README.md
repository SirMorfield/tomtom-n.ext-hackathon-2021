# Team TimTim: tomtom-n.ext-hackathon-2021

Merges data from the dutch government into the TomTom map API.

## Implemented Features
- shows de-iced roads in different colors.
### Visualisation
to see the data goto [localhost](http://localhost) when running

## To build
`docker-compose up --build`

## Api endpoints
`/coords/?lat=number&long=number&max=number&range=number&type=string`
___
This returns items found in the viscinity of the coordinates given.

- `max`: returns max amount of items
- `range`: range in size of coordinates: eg. 0.1deg
- `type`: ParkingGarage or Strooier
- `lat, long`: the coordinates of the startpoint
___
`/clear`

This clears the database
___
`/loaddata`
Loads the data into the database

