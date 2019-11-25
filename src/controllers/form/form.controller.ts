import { Controller, Delete, Get, Patch, Post, Put } from "@mayajs/core";
import { Request, Response, NextFunction } from "express";
import { SampleServices } from "./form.service";
import { Check } from "@mayajs/common";

const verify = require("../../middleware/verifyJWT");

const nodemailer = require('nodemailer');


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
    
    const newForm : any = await this.services.postForm(req.body);
    console.log(newForm);
    res.status(newForm.status).json(newForm.data);

    if (newForm.data !== undefined) {
      const mailContent = `
      <p>You Have new Contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${newForm.data.fullName}</li>
        <li>Email Address: ${newForm.data.emailAddress}</li>
        <li>Company: ${newForm.data.company}</li>
        <li>Contact Number: ${newForm.data.contactNo}</li>
        <li>Subject: ${newForm.data.subject}</li>
        <li>Message ${newForm.data.message}</li>
      </ul>
    `;

    async function main() {
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.USER_EMAIL, // generated ethereal user
          pass: process.env.USER_PASS // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"William of Techcellar 👻" <${process.env.USER_EMAIL}>`, // sender address
        to: `${process.env.USER_EMAIL}`, // list of receivers
        subject: "Contact form", // Subject line
        text: "Read Me!", // plain text body
        html: mailContent // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    }
    
    main().catch(console.error);
    }
    

  }


  @Get({path: "/admin/inquiries", middlewares: [
    verify
  ]})
  async getInq(req: Request, res: Response, next: NextFunction) {

    const inquiryLists = await this.services.getInquiries();
    res.json(inquiryLists.data);

  }

  @Get({path: "/admin/inquiries/:id", middlewares: [
    verify
  ]})
  async getInqId(req: Request, res: Response, next: NextFunction) {

    let id = req.params.id;
    const specificInq = await this.services.getInquiriesById(id);

    res.status(specificInq.status).json(specificInq.data);

  }
}

