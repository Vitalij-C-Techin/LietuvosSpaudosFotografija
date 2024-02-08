# Lietuvos Spaudos Fotografija

## Development setup

### Database

- susinstaliuoti postgresSQL 16.1;
- susikurti useri `lsfotografija` su slaptazodziu `qwerty`

```
create user lsfotografija with password 'qwerty';
```

- susikurti DB `lsfotografija`

```
create database lsfotografija;
```

- suteikti teises

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
