import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import config from "../config/config"

// export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
//   //Get the jwt token from the head
//   let token = <string>req.headers["authorization"]
//   let jwtPayload;

//   //Try to validate the token and get data
//   try {
//     token = token.split(" ")[1]
//     jwtPayload = <any>jwt.verify(token, config.keySecret);
//     console.log(jwtPayload)
//     res.locals.jwtPayload = jwtPayload
//   } catch (error) {
//     //If token is not valid, respond with 401 (unauthorized)
//     res.status(401).send()
//     return;
//   }

//   //The token is valid for 1 hour
//   //We want to send a new token on every request
//   const { userId, username } = jwtPayload
//   const newToken = jwt.sign({ userId, username }, config.keySecret, {
//     expiresIn: "1h"
//   });
//   res.setHeader("token", newToken)

//   //Call the next middleware or controller
//   next()
// }

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
      let token = <string>req.headers["authorization"]
      let jwtPayload;

      if (!token) throw new Error("No Bearer");

      token = token.split(" ")[1];
      jwtPayload = <any>jwt.verify(token, config.keySecret);
      const { userId, username } = jwtPayload
      next();
  } catch (error) {
    if(error)
      return res
          .status(401)
          .send({ error: 'Token invalidado' });
  }
};
