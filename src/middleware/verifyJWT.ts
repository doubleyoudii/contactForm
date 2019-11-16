import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";

module.exports  = function verifyToken (req: Request, res: Response, next: NextFunction) {
  //Do something in Token
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader!.split(" ");
    const bearerToken = bearer[1];
    req.body.token = bearerToken;

    jwt.verify(req.body.token, "testSecret", async (err: any, authData:any) => {
      if (err) {
        res.status(403).json({
          message: "Forbidden"
        })
      } else {
        req.body.user = authData;
        next();
      }
    })

  } else {
    res.status(403).json({
      message: "Forbidden "
    })
  }

}
