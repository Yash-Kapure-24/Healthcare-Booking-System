import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            return res.status(401).json({ success: false, message: "Access Denied, No Token Provided" });
        }

        let token_decode;
        try {
            token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ success: false, message: "Session Expired. Please log in again." });
            }
            return res.status(403).json({ success: false, message: "Invalid Token" });
        }

        // Ensure decoded token matches admin email
        if (!token_decode.email || token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Access Denied, Unauthorized Admin" });
        }

        next();
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default authAdmin;