import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authController = {
    async googleAuth(req: Request, res: Response) {
        try {
            const { token } = req.body;
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            
            const payload = ticket.getPayload();
            if (!payload) {
                throw new Error('Invalid token');
            }

            let user = await User.findOne({ googleId: payload.sub });
            if (!user) {
                user = await User.create({
                    googleId: payload.sub,
                    email: payload.email,
                    name: payload.name,
                    picture: payload.picture
                });
            }

            const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET);
            res.json({ token: jwtToken, user });
        } catch (error) {
            res.status(401).json({ message: 'Authentication failed' });
        }
    }
}; 