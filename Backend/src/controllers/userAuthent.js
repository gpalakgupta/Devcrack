
const User = require('../models/user');
const validate = erequire('../utils/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req,res)=>{
    try{

        validate(req.body);
        const {firstName,emailId,password} = req.body;
        req.body.password = await bcrypt.hash(password,10);


        const user = await User.create(req.body);
        const token = jwt.sign({_id: user._id, emailId:emailId},"process.env.JWT_SECRET",{expiresIn : 60*60});

        res.cookie('token',token,{maxAge : 60*60*1000});

        res.status(201).json({message : 'User registered successfully', user});
         
        
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}


const login = async (req,res)=>{
    try{
        const {emailId,password} = req.body;

        if(!emailId || !password){
            throw new Error('Email and password are required');
        }
        const user = await User.findOne({emailId});

        const match = await bcrypt.compare(password,user.password);
        if(!match){
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({_id: user._id, emailId:emailId},"process.env.JWT_SECRET",{expiresIn : 60*60});

        res.cookie('token',token,{maxAge : 60*60*1000});
        res.status(200).json({message : 'Login successful'});
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}


const logout = (req,res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({message : 'Logout successful'});
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}