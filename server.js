const express = require('express');
const cors = require('cors');
const sendMail = require('./mailer');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

const app = express();


app.use(cors({
    origin: "*",
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());


app.post('/contact', upload.single('picture'), async (req, res) => {
    try {
        const formData = req.body;
        if (req.file) formData.picturePath = req.file.path;

        const success = await sendMail(formData, req.file?.originalname);

        if (success) {
            return res.status(200).json({ message: 'Form sent successfully!' });
        } else {
            return res.status(500).json({ message: 'Failed to send email.' });
        }
    } catch (err) {
        console.error('Server error', err);
        return res.status(500).json({ message: 'Server error occurred.' });
    }
});


app.listen(3000, () => console.log('🚀 Server running on port 3000'));
