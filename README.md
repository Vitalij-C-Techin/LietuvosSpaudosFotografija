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

## Setting Up Mailjet Email Sending Service

To get started with using Mailjet for sending emails, follow these steps:

1. **Create a Mailjet Account**: Visit [Mailjet Signup](https://app.mailjet.com/signup) and sign up for an account. Make sure to confirm your email address.

2. **Access API Credentials**:
   - Go to your Mailjet Account Settings.
   - Navigate to the "Senders and Domains" section and choose "[SMTP and SEND API settings](https://app.mailjet.com/account/relay)".
   - In the opened menu, click on the "See all API credentials" button.

3. **Generate Secret Key**:
   - In the API Key Management section, click on the "Generate secret key" button.

4. **Update Credentials**:
   - Copy the generated secret key.
   - Paste the copied secret key into the `backend/src/main/resources/credentials.yaml` file under the following format:
     ```yaml
     accessKey: API Key
     secretKey: Secret Key
     email: [Your registered email address]
     ```
   - Ensure that the email used for registration is confirmed.

**Note**: It's essential to prioritize the security of your API keys. While we provide instructions for storing credentials in the YAML file, 
it's crucial to understand that the security of these keys is ultimately your responsibility.
We strongly recommend adding the `credentials.yaml` file to your project's `.gitignore` to prevent accidental exposure of sensitive information.

## Predefined Users

- user@mail.com (role: user)
- jury@mail.com (role: jury)
- moderator@mail.com (role: moderator)
- admin@mail.com (role: admin)

Password: qweQWE123!

## Endpoints

Swagger url: /swagger-ui/index.html