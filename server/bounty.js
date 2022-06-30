const express = require('express');
const {v4 : uuid} = require('uuid');
const bountyRouter = express.Router();

const bounties = [
    {first : "luke", last : "skywalker", living : true, amount : 1000, type : "jedi", _id : uuid()},
    {first : "anakin", last : "skywalker", living : true, amount : 1000, type : "jedi", _id : uuid()},
    {first : "ahsoka", last : "tano", living : true, amount : 800, type : "jedi", _id : uuid()},
    {first : "darth", last : "vader", living : true, amount : 800, type : "sith", _id : uuid()},
]

bountyRouter.route("/")
    .get((req, res)=>{
        res.send(bounties);
    })
    .post((req, res)=>{
        const newBounty = req.body;
        newBounty._id = uuid();
        bounties.push(newBounty);
        res.send(bounties);
    })

bountyRouter.route("/:id")
    .put((req, res)=>{
        const id = req.params.id;
        const index = bounties.findIndex(bounty=> bounty._id === id);
        Object.assign(bounties[index], req.body);
        res.send(bounties);
    })
    .delete((req, res)=>{
        const id = req.params.id;
        const index = bounties.findIndex(bounty=> bounty._id === id);
        bounties.splice(index, 1);
        res.send(bounties);  
    })

    
module.exports = bountyRouter;