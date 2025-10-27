const nodemailer = require("nodemailer");
require("dotenv").config();
async function sendMail(formData, originalFilename) {
    const {
        fullname, phone, gender, age, disabled, houseStatus,
        email, amount, maritalStatus, pitch, picturePath
    } = formData;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"Grant Application" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: `New Grant Application from ${fullname}`,
        html: `<h3>New Grant Application</h3>
           <p><strong>Full Name:</strong> ${fullname}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Gender:</strong> ${gender}</p>
           <p><strong>Age:</strong> ${age}</p>
           <p><strong>Disabled:</strong> ${disabled ? 'Yes' : 'No'}</p>
           <p><strong>House:</strong> ${houseStatus}</p>
           <p><strong>Marital Status:</strong> ${maritalStatus}</p>
           <p><strong>Funding Requested (€):</strong> ${amount}</p>
           <p><strong>Pitch:</strong> ${pitch}</p>`,
        attachments: picturePath ? [
            { filename: originalFilename, path: picturePath }
        ] : [],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent');
        return true;
    } catch (err) {
        console.error('❌ Error sending email:', err);
        return false;
    }
}


module.exports = sendMail;