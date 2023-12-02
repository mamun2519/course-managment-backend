import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db: process.env.DATABASE,
  jwt: {
    secret_token: process.env.SECRET_TOKEN,
    expire_in: process.env.EXPIRE_IN,
  },
};
