const Config = {
    version: 0.1,

    apiDomain: 'http://localhost:8080',

    imagePlaceHolder: '/src/tmp/placeholder-500.jpg',

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
            create: '/api/v1/competition',
            edit: '/api/v1/competition/{uuid}',
            adminAll: '/api/v1/competition/all/{page}',
            active: '/api/v1/competition/all/active/{page}',
            userActive: '/api/v1/competition/user/{page}',
            userParticipate: '/api/v1/competition/user/participate/{page}'
        },
        users: {
            adminAllUsers: ({
                    page,
                    size,
                    sortBy,
                    direction
                }) =>
                `/api/v1/admin/users?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
            addUser: '/api/v1/admin/register/user',
            addJury: '/api/v1/admin/register/jury',
            userDetails: '/api/v1/admin/user/{uuid}',
            updateRole: '/api/v1/admin/user/{uuid}/role',
            blockUser: '/api/v1/admin/user/{uuid}/status'
        },
        user: {
            byUuid: '/api/v1/user/{uuid}',
            forgetPassword: '/api/v1/forget-password',
            passwordChange: '/api/v1/change-password?token='
        },
        userDetailsEdit: {
            getByUuid: '/api/v1/user/{uuid}',
            updateByUuid: '/api/v1/user/{uuid}/profile'
        },
        jury: {
            getSingle: '/api/v1/jury/{uuid}',
            getAll: '/api/v1/jury/all/{page}'
        },
        photo: {
            add: '/api/v1/photo',
            manage: '/api/v1/photo/{uuid}',
            storage: 'photo/{filename}'
        }
    }
};

export default Config;