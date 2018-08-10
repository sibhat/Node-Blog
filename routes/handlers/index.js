const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userDb = require('../../data/helpers/userDb');
const db = require('../../data/dbConfig');

module.exports = {
    tokenGenerate: user => {
        const optional = {
            maxAge: '2 days'
        }
        const token = jwt.sign({
            user
        }, process.env.SECRET_KEY, optional)
        return token;
    },
    protect: (req, res, next) => {
        const token = req.headers.autorization;
        jwt.verify(token, process.env.SECRET_KEY, (err, dToken) => {
            if (err) {
                next({
                    status: 401,
                    message: 'valid token require to access requested info'
                })
            } else {
                req.dToken = dToken;
                next();
            }
        })

    },
    signIn: (req, res, next) => {
        const userToSignIn = req.body
        if (userToSignIn.username) {
            db('users').where({
                    username: userToSignIn.username
                }).first()
                .then(user => {
                    if (bcrypt.compareSync(user.password, userToSignIn.password)) {
                        const token = module.exports.tokenGenerate(user);
                        if (token) {
                            localStorage.setItem('jwt', token);
                        } else {
                            next({
                                status: 401,
                                message: 'error while decoding password'
                            })
                        }
                    } else {
                        next({
                            status: 401,
                            message: 'incorrect password'
                        })
                    }
                })
                .catch(error => {
                    next({
                        status: 500,
                        message: 'User name wasnt found:'
                    })
                })
        }
    },
    signUp: (req, res, next) => {
        const newUser = req.body
        if (newUser.password && newUser.username) {
            newUser.password = bcrypt.hashSync(newUser.password, 10)

            userDb
                .insert(newUser)
                .then(id => {
                    userDb.get(id[0])
                        .then(user => {
                            const token = module.exports.tokenGenerate(user);
                            res.status(200).json(token) // this might change since there is no jwt created.
                        })
                        .catch(error => {
                            next({
                                status: 401,
                                message: 'error while getting the newly created user',
                                code: error.message

                            })
                        })
                })
                .catch(error => {
                    next({
                        status: 401,
                        message: 'error while creating a user',
                        code: error.message
                    })
                })

        } else {
            next({
                status: 401,
                message: 'need password and username to sign up'
            })
        }
    }
}