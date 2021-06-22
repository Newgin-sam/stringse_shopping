const AccessControl = require('accesscontrol');

const allRights = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*']
}

let grantObject = {
    admin: {
        profile: allRights
    },
    user: {
        profile: {
            'read:own': ['*', '!password', '!_id'],
            'update:own': ['*', '!password', '!_id'],
        }
    }
}

const roles = new AccessControl(grantObject);

module.exports = { roles };