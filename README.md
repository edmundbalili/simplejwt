# SimpleJWT

A crude and basic REST implementaton that handles JWT (jsonwebtoken) using NuxtJS.

  - Uses 
    - MongoDB as for storing data like users and blacklisted tokens
    - jsonwebtoken for JWT processing
    - bcryptjs for password hashing
    - and validatorjs for validating data
  - NuxtJS can serve our application as backend and frontend, rather having separate node instances
  - Available endpoints are:
    - [POST] /register : accepts email and password as input
      - conditions:
        - email must be valid
        - password
          - minimum of 8 characters
          - must have at least 1 lowercase letter
          - must have at least 1 uppercase letter
          - must have at least 1 digit/number
          - and must have at least 1 special character except < and >
    - [POST] /login : accepts email and password and returns token on successful login
    - [GET] /verify : accepts token to verify
    - [DELETE] /logout : accepts token and flags it as blacklisted token to avoid reuse
    - [POST] /create : 
      - accepts auth bearer token; 
      - a mock endpoint that undergoes token checking before processing data
      - this endpoint assumes data entry and is just a proof-of-concept
      
### Installation
Open on directory then command:
```sh
$ npm install
$ npm run dev
```
### Todo
  - Input sanitation
  - NuxtJS Auth method implementation
