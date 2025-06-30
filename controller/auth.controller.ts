import { Request, Response } from 'express';
import { User } from '../model/auth.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const Register = async (req:Request, res:Response) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                message: "Please fill all the fields",
                success: false
            })
        }

        const extingUser = await User.findOne({email});
        if(extingUser) {
            return res.status(400).send({
                message: 'User already exists',
                success: false
            })
        }

       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser =  await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
       })
       
       res.status(200).send({
            message: "User registered successfully",
            success: true,
            data: newUser
       })

    //    console.log('data', newUser);

    } catch (error: any) {
    console.error("Register Error:", error.message);
    res.status(500).send({
        message: "Failed to register",
        success: false,
        error: error.message
    });
}
}

export const Login = async (req:Request, res:Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: "Please fill all the fields",
                success: false
            })
        }
        const ExistingUser = await User.findOne({ email});
        if(!ExistingUser){
            console.log("User does not exist but working");
            return res.status(400).send({
                message: "User does not exist",
                success: false
            })
        }

        const comparePassword = await bcrypt.compare(password, ExistingUser.password);
        if(!comparePassword){
            return res.status(400).send({
                message: "Invalid credentials",
                success: false
            })
        }

        const token = jwt.sign({ id: ExistingUser._id, role: ExistingUser.role}, process.env.JWT_SECRET as string, {
            expiresIn: '8d'
        })
        res.status(200).send({
            message: "Login successful",
            success: true,
            data: ExistingUser,
            token: token
        })
    } catch (error) {
        res.status(500).send({
            message: "Login failed",
            success: false,
        })
    }
}