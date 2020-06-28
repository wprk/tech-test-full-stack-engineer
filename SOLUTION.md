Your Solution Documentation
===========================

I began this project by considering the application requirements. There will be three services. We have our frontend, backend and datastore. I decided to use JS (Typescript) across the board as that's what you are using already at HiPages and I will use your MySQL datastore as is as I don't see any reason why it wouldn't be a suitable choice for this application.

# Architecture decisions
## Frontend
I considered several frameworks for the frontend. It made sense to use React as that is what you use at HiPages and is the frontend framework I'm most familiar with. For boilerplates I considered NextJS, Gatsby and CRA but as this SPA will be behind an paywall the benefits provided by NextJS and Gatsby such as SSR and static page generation didn't really provide much benefit over the slimmed down CRA boilerplate you already provided.

## Backend
For the backend however I decided to make a change and switch out the boilerplate provided for a typescript installation of NestJS. In terms of performance benefits it doesn't really provide any over the express boilerplate provided as NestJS is just a wrapper around express but it will allow me to create a much cleaner codebase. I plan to use several of NestJS's libraries such as authentication, config, database and validation.

I also considered improving on the microservices architecture you have provided in order to build this application as it allows for greater separation of business logic. For example I could have created a suburbs, jobs and categories application and had them all communicate with each other through message queues. For the scale of this project it isn't nessecary and would of increased the scope significantly but in a real world application I would recommend using this approach. If I have time to add authentication I will create this as an additional service in order to demonstrate these skills. This will also give me the ability to demonstrate my ability to dockerise an application.

I also have a reasonable amount of experience using kubernetes so if deploying this to production I would set up a CICD pipeline and use kubernetes to manage auto-scaling to ensure the application can be deployed reliably and also scale efficiently, minimising server costs and downtime.

# Backend

#### Authentication
This application would require authentication to be used in the real world. I will add this functionality last if I have time.

#### Config
I chose to use NestJS config library to ensure I didn't keep environment specific variables in the codebase. This will allow the codebase to be deployed to a different server environment more easily. I did however commit my .env file as this is a test project and you will need it to run. In a real application I would never do this to ensure secrets aren't accidently exposed. I do usually create a .env.example file with placeholder variables to help other developers populate those fields if nessecary.

#### Database
For connecting to the database I chose to use the typeorm library. This allows for a fully typed ORM improving code readability and ensuring that queries to the database are properly sanitised to prevent security issues such as SQL injection. Using typeorm as the ORM also has the added benefit of enabling us to swap out the database storage to another type such as postgres or mongo without having to rewrite large chunks of the codebase.

#### Routes
The following routes have been exposed:
GET /categories
GET /categories/:id
GET /jobs
GET /jobs/:id
PATCH /jobs/:id
GET /suburbs
GET /suburbs/:id

I added pagination to the findAll routes for each entity with a default limit of 5. I also added the ability to filter the /jobs route by status. This will allow me to populate the list for each tab `invited` and `accepted`. I added multiple typeorm entities for jobs which extend a base job entity this allows me to ensure that users don't see contact information for non-accepted jobs. I have added the ability to update the status field of a job by PATCHING a job. I have limited the body to currently only allow the status field to be modified as that was all that was required but in a real application it would allow more fields with validation based on status, user permissions etc.

#### Services
I have used services extensively in this application. Realistically because of it's size and scope it's not really nessecary but it allows for decoupling of business logic from the controllers and keeps the controllers readable and succinct. 

#### Testing
I have added unit tests to all my controllers and services as well as several integration tests. If I had time I would aim to achieve 100% test coverage. I will also add regression tests as I begin development on the frontend should I find any bugs in the backend.

# Frontend

#### Authentication
I added a very basic example of how I'd go about adding authentication to this application, I didn't have time to build the server side for authentication but you should be able to see how I would of gone about it from the frontend perspective. I built out an AuthProvider class and mocked out what the response from the server would be with a basic JWT token (set to expire at the end of the year). I then wrapped the Route for the jobs page with the ProtectedRoute component and redirect to the /login page if the user isn't authenticated. Whenever we have a token I then pass it along to all API calls where it would of been checked by the Auth middleware (if I had time to add it) before returning results.

#### Config
As with the backend for any real-world application you should always seperate your environment variables out from your code. I only have the one environment variable containing the `API_PATH` but this was extracted out to ensure the frontend could be deployed and configured to use a different API in the future. I have also committed the .env file again here to ensure it works for you but would not do this with a real application as the file would likely contain secrets you wouldn't want accessible in the codebase.

#### Design Framework
For the UI I decided to use Tailwind as it's something I use in a lot of my personal projects and am very familiar with. I like using tailwind because:
- it is highly customisable
- has a built in design system as you can only use styles you have already defined in your configuration
- increases development speed by eliminating context switching between styles and markup
- couples the styles tightly with the markup and when using a library like React this forces you to create reusable components
- Using it's built in PurgeCSS library allows for smaller stylesheets
- Responsive out of the box

#### Package management
I chose to use yarn for package management mainly becuase that's what I usually use. Historically Yarn was faster, had better tree shaking and had exclusive support for workspaces but in recent years npm has improved significantly matching the improvements Yarn has and add new features such as vulnerability audits so I'm not sure which is the better choice these days so I went with what I know.

#### Responsive Design
As I was only given a tablet size design mockup I based the design at all breakpoints on that. On larger screen sizes I've set a max-width using tailwind's `max-w-3xl` class which limits the width to `48rem`. I also ensured that the card content wraps as it is reduced in size. Ideally I would of had a mobile and desktop design too so the design could be optimised for various breakpoints.

#### Security
As any response returned from the server is accessible on the client even if it's not displayed I opted to transform the response depending on the job status. This ensures that you can only see the contact details once you have accepted a job.

#### State management
I considered several solutions for handling API requests and state management. I have used Redux and Redux saga in the past for larger applications but due to the size of this service it didn't make sense to add all the complexity and boilerplate of Redux. It's so much work when a lot of it can be handled for you with better results by using an all-in-one solution like apollo-client. I like using these types of libraries for managing my state and API requests mainly because they take care of all the other things you have to think about too such as optimistic responses, caching and error handling amongst others. I have used apollo alot in my other react applications where I've had a GraphQL api and although they do support REST apis their solution is a bit hacky so I opted to use the rest-hooks library from Coinbase. This offers most of the features of Apollo but is primarily built for use with REST Apis. It also gives me the ability to create Resources for each entity type meaning with can keep any transformations of data separated out from the rest of our application. In my case I added two getters around the `created_at` and `updated_at` fields to get them to return a moment instance so I could cleanly format them.

#### User experience
In the mockups I was given all jobs had a small description but in the real-world this is unlikely to be the case. To prevent the cards from growing too large I added some styles to ensure a description of more than 4 lines would be truncated and would only expand on hover. It also shows an elipsis to indicate that there is more content to be displayed. I also considered making this description section scrollable but thought this might be frustrating for the user and it would be nicer for them to be able to read the full description on hover.

# Potential improvements
- Database improvements
  - Users
  - Permissions
- Full test coverage
- Apply authentication and authorisation middleware to endpoints
- Automated linting and test validation on commit / build
- Improve documentation, potentially add an OpenAPI library like Swagger for self-documenting API
- Add infrastructure as code to facilitate CICD
- Dont expose the id of jobs table and add a non-incremental id to prevent enumeration attacks
- Implement either pagination or infinite scrolling to the JobLists. I built the functionality into the backend but ran out of time to implement it on the frontend
- Use seperate routes for invited and accepted so that the state is persisted on refresh
- Improve accessibility across the site but particularly with the Tabs component. A quick improvemnt would be adding correct aria labels
- Add animations to tab active state and cards
- Improved typehinting throughout both applications but particularly on the frontend
- Fix issue with description hover where you can't immediately click a button as they move when you're no longer hovering