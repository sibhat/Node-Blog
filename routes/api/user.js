const express = require('express');
const server = express();


const userDb = require('../../data/helpers/userDb');


//GET /user
server.get('/', (req, res)=>{
    userDb.get()
    .then(result => (
        res.status(200).json({Users: result})
    ))
    .catch(error => res.status(500).json({"error": error.message}))
})

//GET /user/ID
server.get('/:id', (req, res)=>{
    userDb.get(req.params.id)
    .then(result => (
        res.status(200).json({Users: result})
    ))
    .catch(error => res.status(500).json({"error": error.message}))
})

//POST /user
server.post('/', (req, res)=>{
    const newUser = req.body;
    userDb.insert(newUser)
    .then(result=> userDb.get(result.id))
    .then(result => (res.status(200).json({User: result})))
    .catch(error => res.status(500).json({"error": error.message}))
})

//GET /userPost 
server.get('/:id/post/', (req, res)=>{
    userDb.getUserPosts(req.params.id)
    .then(result => (
        res.status(200).json({Users: result})
    ))
    .catch(error => res.status(500).json({"error": error.message}))
})

//PUT /user
server.put('/:id', (req, res)=>{
    const update = req.body;
    const id = req.params.id;
    userDb.update(id, update)
    .then(result=> result === 1 ? userDb.get(id)
    .then(result => (res.status(200).json({PostID: result})))
    : res.status(400).json({"error": "index not found"}))
    .catch(error => res.status(500).json({"error": error.message}))
})

//DELETE /user
server.delete('/:id', (req, res)=>{
    const id = req.params.id;
    userDb.remove(id)
    .then(result => ( result=== 1 ? res.status(200).json({result: "the post have been deleted"}) : res.status(400).json({"error": "couldnt found post at the index"})))
    .catch(error => res.status(500).json({"error": error.message}))
})

module.exports = server;
