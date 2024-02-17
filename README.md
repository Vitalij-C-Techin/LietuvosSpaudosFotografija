# Lietuvos Spaudos Fotografija

## Setup project

### Required software

- Java (Version 21)
- PostgreSQL (Version 16)
- NPM (Version 10.2)

### Setup order

1. Database
1. Back-end
1. Frond-end

## Setup database

- Install PostgresSQL 16 (https://www.postgresql.org/download/)
- Create user with name `lsfotografija` with password `qwerty`

```
create user lsfotografija with password 'qwerty';
```

- Create database with name `lsfotografija`

```
create database lsfotografija;
```

- Grand rights

```
\c lsfotografija
grant all privileges on schema public to lsfotografija;
```

### Database test data

- norint isaugoti testinius userius atkomentuoti eilute `LietuvosSpaudosFotografijaApplication`:

```

boolean isSaving = true;

```

- paleisti is naujo aplikacija



## Setup back-end

Directory /backend

Load spring dependencies

```
cmd: mvn dependency:resolve
```

Run spring

```
cmd: mvn spring-boot:run
```

Url: http://localhost:8080

## Setup front-end

Directory /frontend

Load react modules

```
cmd: npm install
```

Run react

```
cmd: npm run dev
```

Url: http://localhost:5173

## Endpoints

Swagger url: /swagger-ui/index.html

### User registration

Request POST /api/v1/registration
```
{
    "name": "string",
    "surname": "string",
    "email": "string",
    "password": "string",
    "birth_year": 0,
    "phone_number": "string",
    "media_name": "string"
}
```
Response
```
{
    "token": "string",
    "user": {
        "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "surname": "string",
        "email": "string",
        "role": "USER",
        "birth_year": 0,
        "phone_number": "string",
        "media_name": "string",
        "created_at": "2024-02-14T18:42:31.547Z"
    }
}
```

### Login

Request GET /api/v1/login

```
{
    "name": "string",
    "surname": "string",
    "email": "string",
    "password": "string",
    "birth_year": 0,
    "phone_number": "string",
    "media_name": "string"
}
```

Response

```
{
    "token": "string",
    "user": {
        "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "surname": "string",
        "email": "string",
        "role": "USER",
        "birth_year": 0,
        "phone_number": "string",
        "media_name": "string",
        "created_at": "2024-02-14T18:38:59.102Z"
    }
}
```