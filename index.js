const express = require('express');
const morgan = require('morgan');
var cors = require('cors');

const server = express();
server.use(express.json());
server.use(morgan('short'));
server.use(cors());
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

//GET /posts
server.get('/posts', (req, res)=>{
    postDb.get()
    .then(result => (
        res.status(200).json({posts: result})
    ))
})
// Get /posts by ID
server.get('/posts/:id', (req, res)=>{
    postDb.get(req.params.id)
    .then(result => (
        res.status(200).json({posts: result})
    ))
})

//POST /posts
server.post('/posts/', (req, res)=>{
    const post = {...req.body};
    postDb.insert(post)
    .then(result=> postDb.get(result.id))
    .then(result => (res.status(200).json({PostID: result})))
    .catch(error => next(new Error ({code :500, "error": error.message})))
})

server.get('/posts/:id/tag/', (req, res)=>{
    postDb.getPostTags(req.params.id)
    .then(result => (
        res.status(200).json({Users: result})
    ))
    .catch(error => res.status(500).json({"error": error.message}))
})


//PUT /posts
server.put('/posts/:id', (req, res)=>{
    const update = req.body;
    const id = req.params.id;
    postDb.update(id, update)
    .then(result=> result === 1 ? postDb.get(id)
        .then(result => (res.status(200).json({PostID: result})))
    : res.status(400).json({"error": "index not found"}))
    .catch(error => res.status(500).json({"error": error.message}))
})

//DELETE /posts
server.delete('/posts/:id', (req, res)=>{
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

//GET /user
server.get('/user/', (req, res)=>{
    userDb.get()
    .then(result => (
        res.status(200).json({Users: result})
    ))
    .catch(error => res.status(500).json({"error": error.message}))
})

//GET /user/ID
server.get('/user/:id', (req, res)=>{
    userDb.get(req.params.id)
    .then(result => (
        res.status(200).json({Users: result})
    ))
    .catch(error => res.status(500).json({"error": error.message}))
})

//POST /user
server.post('/user/', (req, res)=>{
    const newUser = req.body;
    userDb.insert(newUser)
    .then(result=> userDb.get(result.id))
    .then(result => (res.status(200).json({User: result})))
    .catch(error => res.status(500).json({"error": error.message}))
})

//GET /userPost 
server.get('/user/:id/post/', (req, res)=>{
    userDb.getUserPosts(req.params.id)
    .then(result => (
        res.status(200).json({Users: result})
    ))
    .catch(error => res.status(500).json({"error": error.message}))
})

//PUT /user
server.put('/user/:id', (req, res)=>{
    const update = req.body;
    const id = req.params.id;
    userDb.update(id, update)
    .then(result=> result === 1 ? userDb.get(id)
        .then(result => (res.status(200).json({PostID: result})))
    : res.status(400).json({"error": "index not found"}))
    .catch(error => res.status(500).json({"error": error.message}))
})
//DELETE /user
server.delete('/user/:id', (req, res)=>{
    const id = req.params.id;
    userDb.remove(id)
    .then(result => ( result=== 1 ? res.status(200).json({result: "the post have been deleted"}) : res.status(400).json({"error": "couldnt found post at the index"})))
    .catch(error => res.status(500).json({"error": error.message}))
})


//GET /tags
server.get('/tags', (req, res)=>{
    tagDb.get()
    .then(result => (
        res.status(200).json({tags: result})
    ))
})

//POST /user
server.post('/tags/', (req, res)=>{
    const newUser = req.body;
    tagDb.insert(newUser)
    .then(result=> tagDb.get(result.id))
    .then(result => (res.status(200).json({User: result})))
    .catch(error => res.status(500).json({"error": error.message}))
})

//PUT /user
server.put('/tags/:id', (req, res)=>{
    const update = req.body;
    const id = req.params.id;
    tagDb.update(id, update)
    .then(result=> result === 1 ? tagDb.get(id)
        .then(result => (res.status(200).json({PostID: result})))
    : res.status(400).json({"error": "index not found"}))
    .catch(error => res.status(500).json({"error": error.message}))
})
//DELETE /user
server.delete('/tags/:id', (req, res)=>{
    const id = req.params.id;
    tagDb.remove(id)
    .then(result => ( result=== 1 ? res.status(200).json({result: "the post have been deleted"}) : res.status(400).json({"error": "couldnt found post at the index"})))
    .catch(error => res.status(500).json({"error": error.message}))
})


const PORT_NUMBER = 8000;
server.listen(PORT_NUMBER, () => console.log(`APP is running on ${PORT_NUMBER}`));