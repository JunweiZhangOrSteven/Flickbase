const AccessControl = require('accesscontrol');

const allRights = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*']
}

//we decide what different roles can do
let grantsObject = {
    admin:{
        //create read update and delete anything
        profile: allRights,
        articles: allRights
    },
    user:{
        profile:{
            //user can read they own profile except their password and id
            'read:own':['*','!password','!_id'],
            'update:own':['*','!password','!_id']
        },
        articles:{
            'read:any':['*'],
        }
    }
}

const roles = new AccessControl(grantsObject);

module.exports = { roles }