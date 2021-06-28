const express = require('express');
const router = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

router.get('/',services.homeRoute);

router.get('/addUser',services.addUserRoute);

router.get('/updateUser',services.updateUserRoute);


// API ROUTES

router.post('/api/users',controller.create);
router.get('/api/users',controller.find);
router.put('/api/users/:id',controller.update);
router.delete('/api/users/:id',controller.delete);

module.exports = router;