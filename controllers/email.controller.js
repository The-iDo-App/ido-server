const nodemailer = require("nodemailer");
const uuid = require("uuid");
const { User } = require('../models');

exports.post = async(req, res) => {
    const { sendTo } = req.body;
    const min = 100001;
    const max = 999999;
    const securityCode = Math.floor(Math.random() * (max - min) + min);

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        // host: "smtp-mail.outlook.com", // hostname
        // host: "smtp.ethereal.email",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            // user: "arellanokurt0130@outlook.com",
            // pass: "@REMEMBER0130k",
            // user: testAccount.user, // generated ethereal user
            // pass: testAccount.pass,
            user: "cpe36second@gmail.com",
            pass: "@REMEMBER0130k",
        },
    });

    const options = {
        from: "'iDo Dating' <cpe36second@gmail.com>", // sender address
        to: sendTo, // list of receivers
        subject: "iDo Dating security code", // Subject line 
        html: `
          <p style="color:gray;font-size:16px;">iDo Dating Application</p>
          <p style="color:steelblue;font-size:30px;">Security code</p>
          <p>Please use the following security code for the iDo Dating Account ${sendTo}.
          </p><p>Security code: <strong>${securityCode}</strong></p><p>
          Thanks,
          </p><p>iDo Dating account team</p>
        `, // html body
    }

    let info;
    let devmail;
    try {
        info = await transporter.sendMail(options);
        devmail = nodemailer.getTestMessageUrl(info);
        console.log(devmail);
    } catch (err) {
        throw err;
    }
    if (info)
        return res.json({ securityCode, devmail });
    return res.json({ "Error": "Invalid Connection" });

}

exports.changePassword = async(req, res) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.updateOne({ email }, {
            $set: { password }
        });
    } catch (err) {
        throw err;
    }
    if (user)
        return res.status(200).json({ "success": "user updated" ,user});
    return res.json({ "failed": "an error occured" })
}

