const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
});


const development={
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'xyzuvw',
    db: 'oreo_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'vsharma7dec@gmail.com',
            pass: 'Vinit7dec@'
        }
    },
    google_clientID: "471255257016-t2hcj75m27698u1iqprgt8gd0l4fsbjn.apps.googleusercontent.com",
    google_clientSecret: "FyBmVSMyvqwfM5JUKDhmT1E-",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'oreo',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production={
    name: 'production',
    asset_path: '.'+process.env.OREO_ASSET_PATH,
    session_cookie_key: process.env.OREO_SESSION_COOKIE,
    db: process.env.OREO_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.OREO_GMAIL_USER,
            pass: process.env.OREO_GMAIL_PASSWORD
        }
    },
    google_clientID: process.env.OREO_GOOGLE_CLIENTID,
    google_clientSecret: process.env.OREO_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.OREO_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.OREO_JWT_SECRET,  
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
} 
module.exports = eval(process.env.OREO_ENVIRONMENT) == undefined ? development : eval(process.env.OREO_ENVIRONMENT);