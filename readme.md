# REST API (Express, PostgreSQL, TypeScript)

This RESTful API allows users to create, retrieve, update, and delete data on a PostgreSQL database. The API runs on a TypeScript Node.js (Express) server. User authentication is handled using JWT token.

# Project setup
## Database
Create the table in the PostgreSQL database.

    CREATE TABLE "Users"(
        uuid UUID PRIMARY KEY DEFAULT(gen_random_uuid()),
        name VARCHAR(20),
        email VARCHAR(40),
        password VARCHAR(72)
    );

## Install

    npm install

## Create .env

Copy the existing `.env.example` file and rename it to `.env`. After that, enter the missing database information.

## Run the app

To run the application in development mode, execute:

    npm run start-dev

To run the application in normal mode, execute:

    npm run build
    npm run start

# REST API

The API handles a *User* resource, with the fields `name`, `email`, `password` and `uuid`.

---

## `/auth/` Endpoints

## Register
Required payload:

- *name* type `string`, max length 20
- *email* type `string`, max length 40
- *password* type `string`, max length 72

### Request

`POST /auth/register/`

    curl -i --request POST 'http://localhost:8080/auth/register' \
        --header 'Content-Type:application/json'\
        --data '{
            "name": "Tim",
            "email": "tim@mail.com",
            "password": "opuacjEMÄXOEMw"
            }'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Set-Cookie: bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7InV1aWQiOiI5OGRlZGM2MS1kMWU4LTRmMTktYmZkOS1hNWQ2NTFmZTZjNzgiLCJuYW1lIjoiVGltIiwiZW1haWwiOiJ0aW1AbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5WTBsTm1zQUI5dk43N1hIdjNoQzMuUmZoQkROLjlidkFlQi5uaGRNRXZvbFFpR2FRaDZLSyJ9LCJpYXQiOjE2OTM5MTM0NzMsImV4cCI6MTY5MzkxNzA3M30.zjYP8z2s6KCiHAOHUBdg-s2AR-kdwvkp6SsV8mAkxS4; Path=/; HttpOnly
    Content-Type: application/json; charset=utf-8
    Content-Length: 157
    ETag: W/"9d-mULetOQiiA5XDMCtWaj1Ik8rJFo"
    Date: Tue, 05 Sep 2023 11:31:13 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"uuid":"98dedc61-d1e8-4f19-bfd9-a5d651fe6c78","name":"Tim","email":"tim@mail.com","password":"$2b$10$9Y0lNmsAB9vN77XHv3hC3.RfhBDN.9bvAeB.nhdMEvolQiGaQh6KK"}

## Login
Required payload:

- *email* type `string`, max length 40
- *password* type `string`, max length 72

### Request

`POST /auth/login/`

    curl -i --request POST http://localhost:8080/auth/login \
        --header 'Content-Type: application/json' \
        --data '{
            "email": "tim@mail.com",
            "password": "opuacjEMÄXOEMw"
            }'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Set-Cookie: bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXF1ZXN0ZWRVc2VyIjp7InV1aWQiOiI5OGRlZGM2MS1kMWU4LTRmMTktYmZkOS1hNWQ2NTFmZTZjNzgiLCJuYW1lIjoiVGltIiwiZW1haWwiOiJ0aW1AbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5WTBsTm1zQUI5dk43N1hIdjNoQzMuUmZoQkROLjlidkFlQi5uaGRNRXZvbFFpR2FRaDZLSyJ9LCJpYXQiOjE2OTM5MTM2ODUsImV4cCI6MTY5MzkxNzI4NX0.8uv6o-Q3xN6bQbioW2TAReoqzFe639zohlI5XzJfV-0; Path=/; HttpOnly
    Content-Type: application/json; charset=utf-8
    Content-Length: 157
    ETag: W/"9d-mULetOQiiA5XDMCtWaj1Ik8rJFo"
    Date: Tue, 05 Sep 2023 11:34:45 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"uuid":"98dedc61-d1e8-4f19-bfd9-a5d651fe6c78","name":"Tim","email":"tim@mail.com","password":"$2b$10$9Y0lNmsAB9vN77XHv3hC3.RfhBDN.9bvAeB.nhdMEvolQiGaQh6KK"}

## Logout

### Request

`POST/auth/logout/`

    curl -i --request POST http://localhost:8080/auth/logout

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Set-Cookie: bearer=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
    Content-Type: application/json; charset=utf-8
    Content-Length: 32
    ETag: W/"20-xiZGGNyhXb2g7TD8gGXN1nrtAUU"
    Date: Tue, 05 Sep 2023 11:39:30 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"Logout successfull"}
---

## `/users/` Endpoints
The `/users/` endpoint is secured by user authentication. To access this endpoint, one must own a valid JWT token and add it as a cookie to the request.
A token can be obtained by either logging in as an existing user or registering a new user.

## All users

### Request

`GET /users/`

    curl -i --request GET http://localhost:8080/users \
        --cookie bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXF1ZXN0ZWRVc2VyIjp7InV1aWQiOiI5OGRlZGM2MS1kMWU4LTRmMTktYmZkOS1hNWQ2NTFmZTZjNzgiLCJuYW1lIjoiVGltIiwiZW1haWwiOiJ0aW1AbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5WTBsTm1zQUI5dk43N1hIdjNoQzMuUmZoQkROLjlidkFlQi5uaGRNRXZvbFFpR2FRaDZLSyJ9LCJpYXQiOjE2OTM5MTQwOTAsImV4cCI6MTY5MzkxNzY5MH0.7rO6OEsTJQwJlB6ws7MHQMipwg21ouLuouGcpsV8g0Y

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Content-Type: application/json; charset=utf-8
    Content-Length: 178
    ETag: W/"150-1z8k+Jmnfk29hR6SEYw1ImT56tA"
    Date: Tue, 05 Sep 2023 11:43:03 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"users":[{"uuid":"a3ff12a1-4118-4fa0-ab31-4cfe6226bf07","name":"Tim","email":"tim@mail.com","password":"$2b$10$mZ9z/o4KsNM49wga3NTBWuw4cl9fnb/tzKBthBqgiM1QqE/vgDAZC"}]}

## User by ID

### Request

`GET /users/:uuid`

    curl -i --request GET http://localhost:8080/users/a3ff12a1-4118-4fa0-ab31-4cfe6226bf07 \
        --cookie bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXF1ZXN0ZWRVc2VyIjp7InV1aWQiOiI5OGRlZGM2MS1kMWU4LTRmMTktYmZkOS1hNWQ2NTFmZTZjNzgiLCJuYW1lIjoiVGltIiwiZW1haWwiOiJ0aW1AbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5WTBsTm1zQUI5dk43N1hIdjNoQzMuUmZoQkROLjlidkFlQi5uaGRNRXZvbFFpR2FRaDZLSyJ9LCJpYXQiOjE2OTM5MTQwOTAsImV4cCI6MTY5MzkxNzY5MH0.7rO6OEsTJQwJlB6ws7MHQMipwg21ouLuouGcpsV8g0Y

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Content-Type: application/json; charset=utf-8
    Content-Length: 166
    ETag: W/"a6-WZ0yUI0+G4yQNFQxllXD6ndHDuk"
    Date: Tue, 05 Sep 2023 11:52:43 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"uuid":"a3ff12a1-4118-4fa0-ab31-4cfe6226bf07","name":"Tim","email":"tim@mail.com","password":"$2b$10$mZ9z/o4KsNM49wga3NTBWuw4cl9fnb/tzKBthBqgiM1QqE/vgDAZC"}

## Modify user
Required payload:

- (optional) *name* type `string`, max length 20
- (optional) *email* type `string`, max length 40
- (optional) *password* type `string`, max length 72

### Request

`PATCH /users/:uuid`

    curl -i --request PATCH http://localhost:8080/users/a3ff12a1-4118-4fa0-ab31-4cfe6226bf07 \
        --header 'Content-Type: application/json' \
        --cookie bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXF1ZXN0ZWRVc2VyIjp7InV1aWQiOiI5OGRlZGM2MS1kMWU4LTRmMTktYmZkOS1hNWQ2NTFmZTZjNzgiLCJuYW1lIjoiVGltIiwiZW1haWwiOiJ0aW1AbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5WTBsTm1zQUI5dk43N1hIdjNoQzMuUmZoQkROLjlidkFlQi5uaGRNRXZvbFFpR2FRaDZLSyJ9LCJpYXQiOjE2OTM5MTQwOTAsImV4cCI6MTY5MzkxNzY5MH0.7rO6OEsTJQwJlB6ws7MHQMipwg21ouLuouGcpsV8g0Y \
        --data '{
            "name": "Lisa"
            }'

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Content-Type: application/json; charset=utf-8
    Content-Length: 167
    ETag: W/"a7-ezKhBxwCYACveW/NS/7sJF9fLuM"
    Date: Tue, 05 Sep 2023 11:56:45 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"uuid":"a3ff12a1-4118-4fa0-ab31-4cfe6226bf07","name":"Lisa","email":"tim@mail.com","password":"$2b$10$mZ9z/o4KsNM49wga3NTBWuw4cl9fnb/tzKBthBqgiM1QqE/vgDAZC"}

## Delete a user

### Request

`DELETE /users/:uuid/`

    curl -i --request DELETE http://localhost:8080/users/a3ff12a1-4118-4fa0-ab31-4cfe6226bf07 \
        --cookie bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXF1ZXN0ZWRVc2VyIjp7InV1aWQiOiI5OGRlZGM2MS1kMWU4LTRmMTktYmZkOS1hNWQ2NTFmZTZjNzgiLCJuYW1lIjoiVGltIiwiZW1haWwiOiJ0aW1AbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5WTBsTm1zQUI5dk43N1hIdjNoQzMuUmZoQkROLjlidkFlQi5uaGRNRXZvbFFpR2FRaDZLSyJ9LCJpYXQiOjE2OTM5MTQwOTAsImV4cCI6MTY5MzkxNzY5MH0.7rO6OEsTJQwJlB6ws7MHQMipwg21ouLuouGcpsV8g0Y

### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    Set-Cookie: bearer=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
    ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
    Date: Tue, 05 Sep 2023 12:02:15 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
