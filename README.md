
# Burger Shop

This is an example project showing off splitting up the interface (api), the core (business logic) and the persistence (database). This has many benefits including cleaner code, testability, and easier to swap out things like the database or http api in the future if desired.

## Parts

- **The Core module:** This stores all the business logic, it defines the types but does not directly touch anything impure. This means it can install its own packages that do pure functions, for example lodash, but can't directly touch the database or know how the http layer works.

- **The Persistence module:** This has the single job of implementing the database calls, for example it takes getUser("id") and turns that in to SQL that will look up the user. This package will use zod to generate and verify the types coming from the database.

- **The Interface module:** This has the job of converting http api calls in to something usable (thou this is done by the http framework mostly). It needs to call the persistence package to setup the database connection and get the impure functions from that package, then can pass the relevant functions through to the core functions to get them setup to be called on request.

- **The Schemas module:** This stores a bunch of zod schemas and extracts the types from them. This is mainly based around strongly typing the functions to and from the database, but core and interface packages can use types from it or derive ones from it if they please. 

- **The Fetch module:** This uses is a simple module that contains fetch functions to call the interface, using zod schemas to verify the request response. This crosses the network boundary so things need to be extra safe to ensure things work as expected.

- **The Web Service:** Running nextjs 13 and the new app dir, this uses the fetch module to call our services.

## Diagram
![Diagram of the relationship between the modules](./Burger-shop.svg)

## Setup

You'll need some stuff, node, yarn, bun, and a terminal.

1. Install dependencies

 - `yarn`

2. Setup the database, its just a local sqlite3 so nothing crazy
   
 - `cd persistence` // the database layer
 - `bun run migrate` // run the migrations
 - `bun run data` // seed the database with some data (thou not necessary if you don't want the test data for dev)
 - `cd ..` // back to the root

3. Run it

 - `yarn dev`