
## Burger Shop

This is an example project showing off splitting up the interface (api), the core (business logic) and the persistence (database). This has many benefits including cleaner code, testability, and easier to swap out things like the database or http api in the future if desired.

### parts

- The Core package, this stores all the business logic, it defines the types but does not directly touch anything impure. This means it can install its own packages that do pure functions, for example lodash, but can't directly touch the database or know how the http layer works.

- The Persistence package, this has the single job of implementing the database calls, for example it takes getUser("id") and turns that in to SQL that will look up the user. This package will use zod to generate and verify the types coming from the database.

- The Interface package, this has the job of converting http api calls in to something usable (thou this is done by the http framework mostly). It needs to call the persistence package to setup the database connection and get the impure functions from that package, then can pass the relevant functions through to the core functions to get them setup to be called on request.

- The Schemas module, this stores a bunch of zod schemas and extracts the types from them. This is mainly based around strongly typing the functions to and from the database, but core and interface packages can use types from it or derive ones from it if they please. 