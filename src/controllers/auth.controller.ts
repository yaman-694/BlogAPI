import { Response } from "express";
import {
    CustomRequest,
    decodedToken,
} from "../interfaces/interfaces";
import createAccessToken from "../middlewares/create-access-token";
import createRefreshToken from "../middlewares/create-refresh-token";
import { UserDocument, UserModel } from "../models/userModel";
import { UserSessionModel } from "../models/userSessionModel";
import bcrypt from "bcrypt";
import exp from "constants";

const createUserController = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        const { email, password, display_name } = req.body as {
            email: string;
            password: string;
            display_name: string;
        };
        const isExist = await UserModel.findOne({ email });
        if (isExist) {
            res.status(403).json({ message: "Email Already Exists" });
            return;
        }
        const userDetails = {
            email,
            password,
            display_name
        };

        const user = await UserModel.create(userDetails);

        const session = await UserSessionModel.create({
            user: user._id,
            ip_address: req.socket.remoteAddress,
            agent: req.get("User-Agent"),
            active: true,
        });

        const JWT_TOKEN_ACCESS = createAccessToken(session._id);
        const JWT_TOKEN_REFRESH = createRefreshToken(session._id);
        res.set({
            "x-access": JWT_TOKEN_ACCESS,
            "x-refresh": JWT_TOKEN_REFRESH,
        });
        res.status(201).json({ body: { message: "User Created Successfully", data: user } });
    } catch (error) {
        console.log(error)
        res.status(400).json({ body: { message: 'Internal Server error', data: "" } });
    }
};

const createSessionController = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        let user: UserDocument | null = null;
        if (email) {
            user = await UserModel.findOne({ email });
        } else {
            res.status(400).json({ body: { message: "Enter credentials" } });
        }
        console.log(user)
        if (
            user !== null && (await bcrypt.compare(password as string, user.password))) {
            const exitingActiveSession = await UserSessionModel.find({
                user: user.userId,
            });
            // logout from all devices
            if (exitingActiveSession.length > 0) {
                await UserSessionModel.updateMany(
                    { user: user.userId, active: true },
                    { active: false }
                );
            }
            const session = await UserSessionModel.create({
                user: user.userId,
                ip_address: req.socket.remoteAddress,
                agent: req.get("User-Agent"),
                active: true,
            });
            const JWT_TOKEN_ACCESS = createAccessToken(session._id);
            const JWT_TOKEN_REFRESH = createRefreshToken(session._id);
            res.setHeader("x-access", JWT_TOKEN_ACCESS);
            res.setHeader("x-refresh", JWT_TOKEN_REFRESH);
            res.status(201).json({ body: { message: "User LoggedIn Successfully", user } });
        } else {
            res.status(400).json({ body: { message: "Invalid login credentials" } });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ data: {}, error: { message: "Internal Server error" } });
    }
}

export { createUserController, createSessionController };