
# Expenses Tracker Backend API


This project is a backend API built using Node.js and Express.
It implements a secure authentication system using JWT access tokens
and refresh tokens. The API supports user signup, login, token refresh,
and protected routes.


## Installation

1. Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

2. Clone the repository
```
git clone https://github.com/username/project-name
```

3. Install dependencies
```
npm install
```
4. Create .env file
```
Add the required environment variables.
```
5. Start the server
```
npm run dev
   ``` 
## Usage/Examples

After starting the server, the API will run on:

http://localhost:5001/api/auth

You can test the endpoints using Postman.
Users can create an account, log in, and access protected routes
using the access token.


## API Reference

#### create user

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullName` | `string` | **Required**. Your Name |
| `email` | `string` | **Required**. Your Email |
| `password` | `string` | **Required**. Your Password |
| `profile_pic` | `string` | image link |

#### login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. your Email |
| `password` | `string` | **Required**. Your password |


#### logout

```http
    POST /api/auth/logot
```

#### update-profile

```http
    PUT /api/auth/update-profile
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `new_pic` | `string` | **Required**. Your new pic|


#### General Update

```http
    PUT /api/auth/general-update
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullName` | `string` | **Required**. Your new Name|
| `Email` | `string` | **Required**. Your new Email|


#### Password Update

```http
    PUT /api/auth/password-update
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `old Password` | `string` | **Required**. Your old Password|
| `new Password` | `string` | **Required**. Your new Password|


#### Refresh Token

```http
    POST /api/auth/refresh
```

 require refresh token in header


#### ADD Title List

```http
    POST /api/auth/title
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Your title list|


#### Title-Fetch

```http
    GET /api/auth/title-fetch
```

#### GET EXPENSES

```http
    GET /api/auth/get/{:id}
```

#### ADD EXPENSES

```http
    POST /api/auth/add/{:id}
```


#### TITLE Update

```http
    PUT /api/auth/title-update/{:id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Your user id|
| `title` | `string` | **Required**. Your new title|


#### Title Delete

```http
    DELETE /api/auth//title-delete/{:id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Your user id|
## Tech Stack

**Server:** Node, Express, jsonwebtoken, uuid, helmet, 

express-rate-limit, cloudinary, bcryptjs
## Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request


## Features

-JWT authentication 
-Access token + refresh token system
-Axios interceptor support
-Secure password hashing
-Rate limiting

