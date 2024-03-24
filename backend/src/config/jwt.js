import jwt from 'jsonwebtoken';

//* create token
const createToken = (data) => {
    let token = jwt.sign(data, "YOUTUBE_SECRET", { // Secret Key: YOUTUBE_SECRET
        algorithm: "HS256",
        expiresIn: "3h" 
    })
    return token
}

//* validate token
//! expire, wrong secret key, token wrong format
// (error, decode) 
const checkToken = (token) => {
    return jwt.verify(token, "YOUTUBE_SECRET", error => error);
}

//* decrypt token
const decodeToken = (token) => {
    return jwt.decode(token);
}

//* refresh token
const createRefToken = (data) => {
    let token = jwt.sign(data, "YOUTUBE_SECRET_REFRESH", { // Secret Key: YOUTUBE_SECRET
        algorithm: "HS256",
        expiresIn: "1m" 
    })
    return token
}

const checkRefToken = (token) => {
    return jwt.verify(token, "YOUTUBE_SECRET_REFRESH", error => error);
}

export {
    createToken,
    checkToken,
    decodeToken,
    createRefToken,
    checkRefToken
}