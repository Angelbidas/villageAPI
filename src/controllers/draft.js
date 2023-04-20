import userModel from '../models/user';
import { hashedPassword,compareHashedPassword } from '../helpers/bcrypt';
import generateToken from '../helpers/tokenGenerator';

class adminAUthentication {
    static async createUser(req, res) {
        req.body.password=await hashedPassword(req.body.password)
        const user=new userModel({role:"admin",...req.body})
        try {
            const data = await user.save();
            res.status(200).json({ "message": "successfully saved" })
        } catch (error) {
            console.log(error);
            res.status(404).json({ "message": "unable to signup" })
        }
    }
    static async loginUser(req, res) {
        const emaill = req.body.email;
        const password = req.body.password;
        try {
            const user = await userModel.findOne({ email: emaill });
            if (!user) {
                res.status(401).json({ "message": "user not found" })
            }
            else {
                if (user.role != "admin") {
                    res.status(401).json({ "message": "NO ADMIN PRIVILAGE" })
                }
                else {
                    let match=await compareHashedPassword(user.password,password);
                    if (match) {
                        res.status(200).json({ "message": "password not matching" })
                    }
                    else {
                        const tk=await generateToken(emaill);
                        res.status(200).json({ "message": "succesfully logged in",token:tk })
                    }
                }
            }
        } catch (error) {
            res.status(500).json({"message":"internal server error"});
        }
    }

    static async loginMudugudu(req, res) {
        const emaill = req.body.email;
        const password = req.body.password;
        try {
            const user = await userModel.findOne({ email: emaill });
            if (!user) {
                res.status(401).json({ "message": "user not found" })
            }
            else {
                if (user.role != "mudugudu") {
                    res.status(401).json({ "message": "NO MUDUGUDU PRIVILAGE" })
                }
                else {
                    let match=await compareHashedPassword(user.password,password);
                    if (match) {
                        res.status(200).json({ "message": "password not matching" })
                    }
                    else {
                        const tk=await generateToken(emaill);
                        res.status(200).json({ "message": "succesfully logged in",token:tk })
                    }
                }
            }
        } catch (error) {
            res.status(500).json({"message":"internal server error"});
        }
    }
}

export default adminAUthentication;