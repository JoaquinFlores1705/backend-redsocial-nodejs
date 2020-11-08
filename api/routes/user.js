'use strict'

const express = require('express');
let UserController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/autenticate');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/users'});


api.get('/home', UserController.home);

api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.put('/upload-image-user/:id', [md_auth.ensureAuth,md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;