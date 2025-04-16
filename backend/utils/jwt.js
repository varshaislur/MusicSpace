import jwt from 'jsonwebtoken';

const generateToken = (user) => {   
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return token;
}

const verifyToken = (token) => {    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}