# SimpleJWT

A crude and basic REST implementaton that handles JWT (jsonwebtoken) using NuxtJS.

  - This uses MongoDB as for storing data like users and blacklisted tokens
  - NuxtJS can serve our application as backend and frontend, rather having separate node instances
  - Available endpoints are:
    - [POST] /register : accepts email and password as input
    - [POST] /login : accepts email and password and returns token on successful login
    - [GET] /verify : accepts token to verify
    - [DELETE] /logout : accepts token and flags it as blacklisted token to avoid reuse

### Installation
Open on directory then command:
```sh
$ npm install
$ npm run dev
```
### Todo
  - Input sanitation
  - NuxtJS Auth method implementation
