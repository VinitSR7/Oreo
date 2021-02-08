const development={
    name: 'development',
    asset_path: '/assets',
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
    
}

const production={
    name: 'production'
}

module.exports = development;