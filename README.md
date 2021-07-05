### Node Authentication API

API for registering users with mongodb and authentication using a JWT (json web token). This app uses passport and passport-jwt and uses a JWT strategy



Usage
`npm install`
`npm start`

## Current Endpoints

POST /users/register
POST /users/authenticate   // Gives back a token
GET /users/profile         // Needs json web token to authorize