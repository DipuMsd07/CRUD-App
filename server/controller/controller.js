const Userdb = require('../models/model');

// CREATE AND SAVE NEW USER

exports.create = (req,res)=>{

    if(!req.body){
        res.status(400).send({message:"Content Can't Be Empty"});
        return;
    }

    // New User
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // Save User in Database
    user
        .save(user)
        .then(data=>{
            // res.send(data);
            res.redirect('/addUser')
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Some Error Occur While Creating User"})
        })

}

// RETRIEVE AND RETURN ALL USERS OR SINGLE USER

exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not Found User with id "+ id})
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message|| "Error Retrieving User Information"})
        })
    }
    else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error Occured While Retrieving User Information"})
        })
    }
}

// UPDATE NEW USER BY USERID

exports.update =  (req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data Can't Be Updated"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update user with ${id}. Maybe User not Found!!!`});
        }
        else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update user Information"})
    })
}

// DELETE USER

exports.delete = (req,res)=>{

    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Delete user with ${id}. Maybe ID is Wrong!!!`})
        }
        else{
            res.send({message:"User Was Deleted Successfully"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Deleting User"})
    })
}