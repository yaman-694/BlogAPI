import jwt from 'jsonwebtoken';


const createAccessToken = (_id: string): string => {

    // const userpower= md5(User_Type);
    const maxAge = 3 * 24 * 60 * 60;
    const Token = jwt.sign({ _id }, process.env.TOKEN_HEADER_KEY as string, {
        expiresIn: maxAge
    });
    return Token;
}

export default createAccessToken;
