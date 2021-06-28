
const axios = require('axios');


/**
 * @description Home Route
 * @method Get /
*/
exports.homeRoute = (req,res) =>{

    // Make get Request to /api/users
    axios.get("http://localhost:3000/api/users")
    .then(function(response){
        res.render('index',{users:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

/**
 * @description Add User Route
 * @method Get /addUser
*/
exports.addUserRoute = (req,res) =>{
    res.render('./include/_addUser');
}

/**
 * @description Update User Route
 * @method Get /updateUser
*/
exports.updateUserRoute = (req,res) =>{

    axios.get("http://localhost:3000/api/users",{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('./include/_updateUser',{user:userdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}