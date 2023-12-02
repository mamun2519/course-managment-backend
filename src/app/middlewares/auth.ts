import { NextFunction, Request, Response } from "express";

import config from "../../config";
import { Secret } from "jsonwebtoken";
import API_Error from "../../errors/appError";
import { jwtHelpers } from "../../utils/jwtToken";
import { StatusCodes } from "http-status-codes";

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new API_Error(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret_token as Secret
    );
    req.user = verifiedUser;
    //check role

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
