import jwt from "jsonwebtoken";
export const generateToken = (data: any, options: jwt.SignOptions) => {
  const secretKey = process.env.JWT_SECRET_KEY || ""; // Change this to your actual secret key
  const token = jwt.sign(data, secretKey, options);
  return token;
};

export const validateToken = (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY || ""; // Change this to your actual secret key
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};
