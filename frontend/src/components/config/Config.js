const Config = {
  version: 0.1,

  apiDomain: 'http://localhost:8080',

  endpoints: {
    auth: {
      registration: '/api/v1/register',
      login: '/api/v1/login'
    },
    participation: {
      create: '/api/v1/participation',
      update: '/api/v1/participation/{uuid}',
      pending: '/api/v1/participation/all/pending/{page}'
    },
    competitions: {
      adminAll: '/api/v1/competition/all/{page}',
      active: '/api/v1/competition/all/active/{page}',
      userActive: '/api/v1/competition/user/{page}',
      userParticipate: '/api/v1/competition/user/participate/{page}'
    },
    users: {
      adminAll: '/api/v1/admin/all/{page}',
      addUser: '/api/v1/admin/register/user',
      addJury: '/api/v1/admin/register/jury'
    },
    user: {
      byUuid: '/api/v1/user/{uuid}',
      forgetPassword: '/api/v1/forget-password',
      passwordChange: '/api/v1/change-password?token='
    },
    userDetailsEdit: {
      getByUuid: '/api/v1/user/{uuid}',
      updateByUuid: '/api/v1/user/{uuid}/profile'
    }
  }
};

export default Config;