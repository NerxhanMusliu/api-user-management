## Description

This is a user management API developed based on [Nest](https://github.com/nestjs/nest) js framework.

### Before starting with installation make sure that port 4000 and 3000 are not used by any other services

## Installation

```bash
$ npm install
```

### Before running the app, run this docker command

```bash
docker-compose up
```
This is going to create a mongo db container locally


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### After the app is up and running please run this command to create a super-admin users

```bash
Method: POST
URL: localhost:4000/users/super-admin
```

#### This endpoint is going to create a superuser with the following credentials

```bash
email: super@admin.com
pw: 123456
```

#### We can use this user later on to create other users, organizations, teams and projects
