# An app for Dota 2 teams, players, heroes, and stats using React and [Hasura](https://hasura.io/) 

## development
#### Running `docker-compose up` will start up the development containers for the Hasura engine, and PostgreSQL.
#### `cd` into `/src/client` and execute `yarn start` in your shell to start up the webpack-dev-server.

* Hasura console - [http://localhost:1337](http://localhost:1337).
* React app - [http://localhost:9000](http://localhost:9000).

Hasura may fail to connect to the PostgreSQL server, if that happens, running `docker-compose up` usually works.

**Note**: until the Hasura CLI supports tracking tables, [https://github.com/hasura/graphql-engine/issues/1418](issue #1418), every brand new Hasura container instance needs some assistance; you need to tell it to track all the tables it found in the PostgreSQL schema. To do so:

1. Open the Hasura console: [http://localhost:1337](http://localhost:1337).
2. Navigate to the `Data` tab
3. Select the `dota_2` schema from the dropdown
4. Next to the _Untracked tables or views_ heading click _Track all_

That should do it; everything should be communicating now.
