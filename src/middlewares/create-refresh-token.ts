import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createRefreshToken = (_id: string): string => {

    // const userpower= md5(User_Type);
    const maxAge = 30 * 24 * 60 * 60;
    const token = jwt.sign({ _id }, process.env.TOKEN_HEADER_KEY as string, {
        expiresIn: maxAge
    });
    return token;
}
export default createRefreshToken;
