const express = require('express');
const server = express();

const tagDb = require('../../data/helpers/tagDb');

//GET /tags
server.get('/', (req, res)=>{
    tagDb.get()
    .then(result => (
        res.status(200).json({tags: result})
    ))
})

//POST /user
server.post('/', (req, res)=>{
    const newUser = req.body;
    tagDb.insert(newUser)
    .then(result=> tagDb.get(result.id))
    .then(result => (res.status(200).json({User: result})))
    .catch(error => res.status(500).json({"error": error.message}))
})

//PUT /user
server.put('/:id', (req, res)=>{
    const update = req.body;
    const id = req.params.id;
    tagDb.update(id, update)
    .then(result=> result === 1 ? tagDb.get(id)
        .then(result => (res.status(200).json({PostID: result})))
    : res.status(400).json({"error": "index not found"}))
    .catch(error => res.status(500).json({"error": error.message}))
})
//DELETE /user
server.delete('/:id', (req, res)=>{
    const id = req.params.id;
    tagDb.remove(id)
    .then(result => ( result=== 1 ? res.status(200).json({result: "the post have been deleted"}) : res.status(400).json({"error": "couldnt found post at the index"})))
    .catch(error => res.status(500).json({"error": error.message}))
})

module.exports = server;

