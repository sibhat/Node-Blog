const express = require('express');
const server = express.Router();

const postDb = require('../../data/helpers/postDb');

//GET /posts
server.get('/', (req, res)=>{
    postDb.get()
    .then(result => (
        res.status(200).json({posts: result})
    ))
})
// Get /posts by ID
server.get('/:id', (req, res)=>{
    postDb.get(req.params.id)
    .then(result => (
        res.status(200).json({posts: result})
    ))
})

//POST /posts
server.post('/', (req, res)=>{
    const post = {...req.body};
    postDb.insert(post)
    .then(result=> postDb.get(result.id))
    .then(result => (res.status(200).json({PostID: result})))
    .catch(error => next(new Error ({code :500, "error": error.message})))
})

server.get('/:id/tag/', (req, res)=>{
    postDb.getPostTags(req.params.id)
    .then(result => (
        res.status(200).json({Users: result})
    ))
    .catch(error => res.status(500).json({"error": error.message}))
})


//PUT /posts
server.put('/:id', (req, res)=>{
    const update = req.body;
    const id = req.params.id;
    postDb.update(id, update)
    .then(result=> result === 1 ? postDb.get(id)
        .then(result => (res.status(200).json({PostID: result})))
    : res.status(400).json({"error": "index not found"}))
    .catch(error => res.status(500).json({"error": error.message}))
})

//DELETE /posts
server.delete('/:id', (req, res)=>{
    const id = req.params.id;
    postDb.remove(id)
    .then(result => ( result=== 1 ? res.status(200).json({result: "the post have been deleted"}) : res.status(400).json({"error": "couldnt found post at the index"})))
    .catch(error => res.status(500).json({"error": error.message}))
})

// //GET /posts/:id
// server.get('/posts/:id', (req, res)=>{
//     postDb.getPostTags(req.params.id)
//     .then(result => (
//         res.status(200).json({PostsTag: result})
//     ))
// })
module.exports = server;