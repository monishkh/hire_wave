
import jwt from "jsonwebtoken";


// verify token
export const authenticate = async (req, res, next) => {

    try {
        // get token from request cookies
        const token = req.cookies.token;
        
        

        // if token is not present, return unauthorized
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }

        // verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        // if token is invalid, return unauthorized
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };


        // set user id to request object
        req.id = decode.userId;

        // call next middleware
        next();
        } catch (error) {
        console.log('Error in verifyToken', error);
        res.status(500).json({ message: "Internal server error" });
    }


}
