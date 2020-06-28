Your Solution Documentation
===========================

I began this project by considering the application requirements. There will be three services. We have our frontend, backend and datastore. I decided to use JS (Typescript) across the board as that's what you are using already at HiPages and I will use your MySQL datastore as is as I don't see any reason why it wouldn't be a suitable choice for this application.

# Architecture decisions
## Frontend
I considered several frameworks for the frontend. It made sense to use React as that is what you use at HiPages and is the frontend framework I'm most familiar with. For boilerplates I considered NextJS, Gatsby and CRA but as this SPA will be behind an paywall the benefits provided by NextJS and Gatsby such as SSR and static page generation didn't really provide much benefit over the slimmed down CRA boilerplate you already provided.

## Backend
For the backend however I decided to make a change and switch out the boilerplate provided for a typescript installation of NestJS. In terms of performance benefits it doesn't really provide any over the express boilerplate provided as NestJS is just a wrapper around express but it will allow me to create a much cleaner codebase. I plan to use several of NestJs libraries such as authentication, config, database and validation.

I also considered improving on the microservices architecture you have provided in order to build this application as it allows for greater seperation of business logic. For example I could have created a suburbs, jobs and categories application and had them all communicate with each other through message queues. For the scale of this project it isn't nessecary and would of increased the scope significantly but in a real world application I would recommend using this approach. If I have time to add authentication I will create this as an additional service in order to demonstrate these skills. This will also give me the ability to demonstrate my ability to dockerise an application by including it in the existing docker-compose file.

I also have a reasonable amount of experience using kubernetes so if deploying this to production I would set up a CICD pipeline and use kubernetes to manage auto-scaling to ensure the application can be deployed reliably and also scale efficiently, minimising server costs and downtime.

# Backend

#### Authentication
This application would require authentication to be used in the real world. I will add this functionality last if I have time.

#### Config
I chose to use NestJS config library to ensure I didn't keep environment specific variables in the codebase. This will allow the codebase to be deployed to a different server environment more easily. I did however commit my .env file as this is a test project and you will need to run it. In a real application I would never do this however I may have a .env.example file with placeholder variables to help other developers populate those fields if nessecary.

#### Database
For database connection I used the typeorm library. This allows for a fully typed ORM improving code readability and ensuring that queries to the database are properly sanitised to prevent security issues such as SQL injection.

#### Routes
The following routes have been exposed:
GET /categories
GET /categories/:id
GET /jobs
GET /jobs/:id
PATCH /jobs/:id
GET /suburbs
GET /suburbs/:id

I added pagination to the findAll routes for each entity with a default limit of 5. I also added the ability to filter the /jobs route by status. This will allow me to populate the list for each tab `invited` and `accepted`. I haven't added a data transformer yet to ensure that users don't see contact information for non-accepted jobs but will do this later if I have time. I have added the ability to update the status field of a job by PATCHING a job. I have limited the body to currently only allow the status field to be modified as that was all that was required but in a real application it would allow more fields with validation based on status, user permissions etc.

#### Services
I have used services extensively in this application. Realistically because of it's size and scope it's not really nessecary but it allows for decoupling of business logic from the controllers and keeps the controllers readable and succinct. 

#### Testing
I have added unit tests to all my controllers and services as well as several integration tests. If I had time I would strive for 100% test coverage. I will also add regression tests as I begin development on the frontend should I find any bugs in the backend.

# Frontend

#### UI Framework
For the UI I decided to use Tailwind as it's something I use in a lot of my personal projects and am very familiar with. I like using tailwind because:
- it is highly customisable
- has a built in design system as you can only use styles you have already defined in your configuration
- increases development speed by eliminating context switching between styles and markup
- couples the styles tightly with the markup and when using a library like React this forces you to create reusable components
- Using it's built in PurgeCss library provides smaller stylesheets
- Responsive capabilities out of the box

#### Package management
I chose to use yarn for package management because that's what I usually use. For a while it was faster, had better tree shaking and has support for workspaces but in recent years npm has improved significantly and with new features such as its vulnerability audits I'm not sure which is the better choice these days.

#### Config
As with the backend for any real-world application you should always seperate your environment variables out from your code. I only have the one environment variable containing the `API_PATH` but this was extracted out to ensure the frontend could be deployed and configured to use a different API in the future. I have also committed the .env file again here to ensure it works for you but would not do this with a real application as the file would likely contain secrets you wouldn't want accessible in the codebase.

#### API request library
I considered several solutions for handling API requests along with state management. I have used Redux and Redux saga in the past for larger applications but due to the size of this service it didn't make sense to add all the complexity and boilerplate of using Redux. It's so much work when a lot of it can be handled for you with better results by using an all-in-one solution like the apollo client. I like using these types of libraries for managing my state and API requests mainly because they take care of all the other things you have to think about too such as optimistic responses, caching, error handling amongst others. I have used apollo alot in my other react applications where I've had a GraphQL api and although they do support REST apis their solution is a bit hacky so I opted to use the rest-hooks library from Coinbase. This offers most of the features of Apollo but is primarily built for use with REST Apis. It also gives me the ability to create Resources for each entity type meaning with can keep any transformations of data seperated out from the rest of our application. In my case I added two getters around the `created_at` and `updated_at` fields to get them to return a moment instance so I could cleanly format them.

# Potential improvements
- Authentication
  - Users
  - Permissions
- Full test coverage
- Apply authentication and authorisation middleware to endpoints
- Automated linting and test validation on commit / build
- Improve documentation, potentially add an OpenAPI library like Swagger for self-documenting API
- Add infrastructure as code to facilitate CICD
- Dont expose the id of jobs table and add a non-incremental id to prevent enumeration attacks