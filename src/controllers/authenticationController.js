import UserModel from '../models/user';
import passwordUtil from '../helpers/bcrypt';
import sendMail from '../helpers/MailConfig';


class authenticationController {
    constructor() {
        this.securitycode = 0;
    }
    getSecuritycode() {
        return this.securitycode;
    }
    setSecurityCode() {
        this.securitycode = Math.floor(Math.random() * 9000) + 1000;
    }
    static async getOTP(req, res) {
        const user = await UserModel.findOne({ nID: req.body.nid });
        if (!user) {
            res.status(401).json({ "message": "user doesnt exist" });
        }
        else {
            const authcontroller = new authenticationController();
            authcontroller.setSecurityCode();
            const OTP = authcontroller.getSecuritycode();
            req.session.OTP = OTP;
            try {
                console.log(user.email);
                await sendMail(user.email, OTP);
                res.status(200).json({ "message": "email sent successful" })
            } catch (error) {
                console.log(error);
                res.status(404).json({ "message": "not able to send email" })
            }
        }
    }

    static async citizenLogin(req, res) {
        const nid = req.body.nid;
        const sentOtp = req.body.otp;
        const OTP = req.session.OTP;

        if (sentOtp == OTP) {
            try {
                const user = await UserModel.findOne({ nID: nid });
                if (!user) {
                    res.status(401).json({ "message": "user doesn't exist" });
                } else {
                    req.session.user = user._id;
                    delete req.session.OTP;
                    console.log(req.session.OTP);
                    res.status(200).json({ "message": "authentication successful" })
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ "message": "internal server errorr" })
            }
        } else {
            console.log("sent otp == " + sentOtp + "session otp ==" + OTP);
            res.status(401).json({ "message": "invalid OTP" });
        }
    }

}


export default authenticationController;