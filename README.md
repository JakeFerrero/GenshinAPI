# GenshinAPI
API simulating the Genshin Impact gacha system, while also allowing users to view and add/delete characters and weapons, in the case more are added to the game.

## Setup
You can ensure the proper versions of Node and NPM are installed by using
```
nvm i
```

Install dependancies via
```
npm install
```

Compile Typescript using
```
npm run build
```

When pulling the latest version of this project, the sqlite database should already be correctly configured
in the `genshin_api_db` file. No additional setup is necessary. However, if for some reason this file is missing
or corrupt, you can use the following to re-initialize the sqlite database.
```
node initDb.js
```

## How to Use
Start the NestJS server with either
```
npm run start
```
or
```
nest start
```
Then use Postman, Thunderclient for VSCode, or any other API client to hit the API.

## Testing
The Jest framework is used for testing. You can run the unit and integration tests by using
```
npm run test
```

## TODOs
* Add integration tests for character endpoints.
* Add endpoints for weapons.
* Have a gacha simulator that more accurately simulates the gacha in Genshin, where pulls include weapons or characters and have the correct rates.
* todo
