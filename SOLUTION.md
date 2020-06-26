Your Solution Documentation
===========================

I began this project by considering the application requirements. There will be three services. We have our frontend, backend and datastore. I decided to use JS (Typescript) across the board as that's what you are using already at HiPages and I will use your MySQL datastore as is as I don't see any reason why it wouldn't be a suitable choice for this application.

# Architecture decisions
### Frontend
I considered several frameworks for the frontend. It made sense to use React as that is what you use at HiPages and is the frontend framework I'm most familiar with. For boilerplates I considered NextJS, Gatsby and CRA but as this SPA will be behind an paywall the benefits provided by NextJS and Gatsby such as SSR and static page generation didn't really provide much benefit over the slimmed down CRA boilerplate you already provided.

### Backend
For the backend however I decided to make a change and switch out the boilerplate provided for a typescript installation of NestJS. In terms of performance benefits it doesn't really provide any over the express boilerplate provided as NestJS is just a wrapper around express but it will allow me to create a much cleaner codebase. I plan to use several of NestJs libraries such as authentication, config, database and possibly validation.

# Backend

### Authentication

### Database

### Routes

