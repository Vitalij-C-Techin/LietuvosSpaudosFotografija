const Config = {
  version: 0.1,

  apiDomain: 'http://localhost:8080',

  endpoints: {
    auth: {
      registration: '/api/v1/register',
      login: '/api/v1/login',
    },
    competitions: {
      adminAll: '/api/v1/competition/all/{page}',
      userActive: '/api/v1/competition/user/{page}',
      userParticipate: '/api/v1/competition/user/participate/{page}'
    },
    user: {
      byUuid: '/api/v1/user/{uuid}'
    }
  }
};

export default Config;