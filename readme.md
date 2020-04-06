# NodeJS + Express Server Boilerplate

A very simple server boilerplate for quick deployment

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Install all the packages by running the following command:

```
npm install
```

#### Environment documents

An example .env.example file have been included. Simply fill in all the necessary details, and remove the ".example" from the .env file. All .env constants will be read in the /config/index.js files, where you can include other constants as required.

#### MYSQL Server

A mysql server will be required to run with this server, however you can configure the boilerplate with a different model if required. As a minimum a users table is required to test the server for signup, login and authenticating test.

```
USERS TABLE

id	int(11)	NO	PRI NULL  auto_increment
username	varchar(255)	NO  NULL
email	varchar(255)	NO  NULL
password	varchar(255)	NO  NULL
password_salt	varchar(255)	NO  NULL
is_active	tinyint(4)	NO		1
updated_datetime	datetime	NO		CURRENT_TIMESTAMP
created_datetime	datetime	NO		CURRENT_TIMESTAMP
```

#### Certificates

A jwt private and public key is required to generate the jwt authentication. An example file have been included, however a new private/key will need to be generated.

## Running the Tests

The simplest way to test the server is by running on a local environment, and using Postman application to generate requests to the server

### Starting the Server

To start the server simply run

```
npm run dev
```

### Signing up a User

In postman create a new request with the following

```
REQUEST METHOD: POST

URL: _server link_/api/signup

BODY: x-www-form-urlencoded (username, email, password)
```

You should get the following response

```
{
    "data": {
        "user": {
            "id": 1,
            "userId": 1,
            "username": "test",
            "email": "test@test.com",
            "is_active": 1
        }
    },
    "status": {
        "code": 200,
        "error": "",
        "message": ""
    }
}
```

### Logging in As a User

In postman create a new request with the following

```
REQUEST METHOD: POST

URL: _server link_/api/login

BODY: x-www-form-urlencoded (username/email, password) - optional to either use username or email
```

You should get the following response

```
{
    "status": {
        "code": 200,
        "error": "",
        "message": ""
    },
    "data": {
        "id": 1,
        "userId": 1,
        "username": "test",
        "email": "test@test.com",
        "is_active": 1
    },
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4NjE3MDk2MSwiZXhwIjoxNTg2MTczMDYxLCJhdWQiOiJodHRwczovL2VucmljaC5oaXJ5YW4ubmV0IiwiaXNzIjoiUnlhbiBDb3JwIiwic3ViIjoidGVzdEB0ZXN0LmNvbSJ9.C0ogGWNr978jixT8ZpUrv3N-FIjHynMwlues69sRPcd4FF2BdRJBsmoymJN4KcIfKaUrh9QZ8L1A9mSs6rqLxA",
    "tokenCreatedDate": "2020-04-06T11:02:41.043Z"
}
```

The token can now be used for authenticating the user.

### Getting the User Data

In postman create a new request with the following (the Authorization token should be as per the one we get from the login)

```
REQUEST METHOD: GET

URL: _server link_/api/users/me

HEADER: Authorization - Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU4NjE2ODgwOSwiZXhwIjoxNTg2MTcwOTA5LCJhdWQiOiJodHRwczovL2VucmljaC5oaXJ5YW4ubmV0IiwiaXNzIjoiUnlhbiBDb3JwIiwic3ViIjoidGVzdEB0ZXN0LmNvbSJ9.h5m-6NE3aj6RvTJxBHj07YJb0OXn4iGNdahUyjtuUi9vAqeoqoLUsll3VdVOB9z8wkA9jloIMv9MEwpdHEkibQ
```

You should get the following response

```
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4NjE3MTE3MywiZXhwIjoxNTg2MTczMjczLCJhdWQiOiJodHRwczovL2VucmljaC5oaXJ5YW4ubmV0IiwiaXNzIjoiUnlhbiBDb3JwIiwic3ViIjoidGVzdEB0ZXN0LmNvbSJ9.IrPIuxDblwENImQRS6pZ9_mc4yAlAMWy3mQVP2UDya_iZh_t9aItWCDTKow9C180JF4ige0SwrBMDZUjv_Q2Ng",
    "tokenCreatedDate": "2020-04-06T11:06:13.242Z",
    "data": [
        {
            "id": 1,
            "userId": 1,
            "username": "test",
            "email": "test@test.com",
            "is_active": 1
        }
    ],
    "status": {
        "code": 200,
        "err": "",
        "msg": ""
    }
}
```

A new token will be automatically generated on each request. This will ensure that the token belonging to an active user will not expire. The token can be saved on the session storage on the frontend application.

### Example of a Bad Token

If a bad token is used, the following response will be received

```
{
    "status": {
        "code": 401,
        "error": "Bad authorisation",
        "msg": "Unauthorized."
    }
}
```

## Authors

- **Ryan Nugraha** - _Initial work_ - (https://github.com/pnuggz)
- **Firman C** - _Major contributor_ - (https://github.com/firmanc)
