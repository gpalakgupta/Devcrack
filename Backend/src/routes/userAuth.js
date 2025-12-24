const express = require('express');

const router = express.Router();


// Register

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/profile',getProfile);

// login

// logout

// get user profile
