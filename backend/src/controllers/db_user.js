import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import {createUser} from '../models/db_user.js';
import { getUserByEmail } from '../models/db_user.js';
import { putUpdateUser } from '../models/db_user.js';



export const registerUser =async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(500).json({message:"Email and password is require"});

        }

        const hashedPassword = await bcrypt.hash(password,10);
        const userId= await createUser(email,hashedPassword);

        res.status(201).json({message:"create acount succesfully", userId});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Serrver error"});
    }
};

export const  loginUser =async(req,res)=>{
    try{
        const {email,password}=req.body;

        const rows = await getUserByEmail(email);
        if(rows.length===0){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const user=rows[0];

        const isMatch =await bcrypt.compare(password,user.password_hash);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }


        const token=jwt.sign(
            {id:user.id,email:user.email},
            JWT_SECRET,{expiresIn: "7d"}
        );


        res.json({
            message:"Login succesfully",
            token,
            user:{
                id:user.id,
                email:user.email,
                display_name:user.display_name,
                avatar_url:user.avatar_url
            }
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};

export const getAccountInfor=async(req,res)=>{
    try{
        const rows =await getUserByEmail(req.user.email);
        if(rows.length===0){
            return res.status(404).json({message:"User not found"});
        }

        const user = rows[0];
        res.json({
            id:user.id,
            email:user.email,
            display_name:user.display_name,
            avatar_url:user.avatar_url
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};

export const updateUser=async(req,res)=>{
    try{
        const id=req.user.id||req.body.id;
        if (!id) return res.status(400).json({ error: "Missing user id" });
        const { email, display_name, avatar_url, theme } = req.body;
        
        const result=await putUpdateUser(id,{
            email, display_name, avatar_url, theme
        });

        if(result.affectedRows===0){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message: " Update user successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Error updating user" });
    }
};