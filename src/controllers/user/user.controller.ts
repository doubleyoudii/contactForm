import { Controller, Delete, Get, Patch, Post, Put } from "@mayajs/core";
import { Request, Response, NextFunction } from "express";
import { SampleServices } from "./user.service";
import { Check } from "@mayajs/common";

import jwt from "jsonwebtoken";


@Controller({
  model: "./user.model",
  route: "/user",
})
export class UserController {
  // Inject SampleServices
  constructor(private services: SampleServices) {}

  // This is a POST request equal to "/sample/:id/:name"
  @Post({ path: "/login", middlewares: [
    Check("email").required().isEmail(),
    Check("password").required()
  ] })
  async post(req: Request, res: Response, next: NextFunction) {
    // Do some POST stuff here
    let email = req.body.email;
    let pw = req.body.password;

    const findUser = await this.services.findUserbyEmail(email);


    if (!findUser) {
      res.status(400).json({message: "Email do not exist!"})
    } else {
      if(req.body.password === findUser.password) {
        const payload = {
          email: findUser.email,
          password: findUser.password
        };

        jwt.sign(
          payload,
          "testSecret", //to be pass in env
          {
            expiresIn: 86400 // 1 day in seconds
          },
          (err: any, token: any) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        )

      } else {
        return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
      }

    }
    
  }

  // This is a GET request equal to "/sample"
  @Get({ path: "/", middlewares: [] })
  async get(req: Request, res: Response, next: NextFunction) {
    // Use a function on SampleService
    let test = await this.services.getUser();
    console.log(test);

    // Do some GET stuff here
    res.send("This is a GET request");
  }


}
