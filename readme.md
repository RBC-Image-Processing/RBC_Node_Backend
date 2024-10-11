# RBC MidAp

## Introduction
RBC conducts scientific research, provides diagnostics services, and implements innovative
health interventions to protect the nation against diseases and other health threats.

## The Backend

To get the backend running follow the following steps:

1.  swith to the backend part by entering `cd midApBackend`
2. Create a `.env` file. Copy the content of `.env.example`, and set your own environment variables.
3. Run `npm install` to install all project dependencies
4. Run `npm run migrate` to run all migrations
5. Run `npm run seed` to seed the primary data to the database
6. Run `npm run dev` if you want to run the program in the development mode or `npm start` if you want to start the program in production mode.
7. You can also run `npm run test` to run tests or `npm run test:dev` to run tests in development mode
8. The API documentation can be accessed at `<appurl>/api-doc`

At this point, the backend application should be ready to serve requests from the frontend.

Note: In case you want to undo all migrations run, you can use `npm run undo:migrations` script. To undo just the last migration, you can run `undo:last:migration`.
