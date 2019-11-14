import {Request, Response, NextFunction} from 'express';


module.exports  = function verifyToken (req: Request, res: Response, next: NextFunction) {
  //Do something in Token
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader!.split(" ");
    const bearerToken = bearer[1];
    req.body.token = bearerToken;
    next();
  } else {
    res.status(403).json({
      message: "Forbidden jutsu"
    })
  }

}
