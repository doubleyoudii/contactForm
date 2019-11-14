import { Controller, Delete, Get, Patch, Post, Put } from "@mayajs/core";
import { Request, Response, NextFunction } from "express";
import { SampleServices } from "./form.service";
import { Check } from "@mayajs/common";

const verify = require("../../middleware/verifyJWT");

@Controller({
  model: "./form.model",
  route: "/form",
})
export class FormController {
  // Inject SampleServices
  constructor(private services: SampleServices) {}

 

  // This is a POST request equal to "/sample/:id/:name"
  @Post({ path: "/:clientId", middlewares: [
    Check("fullName").required(),
    Check("emailAddress").required().isEmail(),
    Check("company").required(),
    Check("contactNo").required(),
    Check("subject").required(),
    Check("message").required()

  ] })
  async post(req: Request, res: Response, next: NextFunction) {
    // Do some POST stuff here
    
    const newForm = await this.services.postForm(req.body);
    res.json(newForm);

  }


  @Get({path: "/admin/inquiries", middlewares: [
    verify
  ]})
  async getInq(req: Request, res: Response, next: NextFunction) {


    const inquiryLists = await this.services.getInquiries();
    res.json(inquiryLists);
  }

  @Get({path: "/admin/inquiries/:id", middlewares: [
    verify
  ]})
  async getInqId(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    const specificInq = await this.services.getInquiriesById(id);
    res.json(specificInq);
  }
}


//Abang for JWT
// jwt.verify(req.body.token, "testSecret", (err: any, authData:any) => {
//   if (err) {
//     res.status(403).json({
//       message: "Forbidden"
//     })
//   } else {
//     res.json({
//       message: 'Post Created',
//       authData
//     })
//   }
// })