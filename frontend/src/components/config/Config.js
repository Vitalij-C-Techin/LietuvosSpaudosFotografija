const Config = {
  version: 0.1,

  endpoints: {
    auth: {
      registration: `http://localhost:8080/api/v1/register`,
      login: `http://localhost:8080/api/v1/login`,
    },
    user: {
      byUuid: `http://localhost:8080/api/v1/user/{uuid}`
    }
  }
};

export default Config;