import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class SampleServices {
  @Models("form") model: any;


  async postForm (body: any) {


    try {
      
      const partialForm = {
        clientId: body.clientId,
        fullName: body.fullName,
        emailAddress: body.emailAddress,
        company: body.company,
        contactNo: body.contactNo,
        subject: body.subject,
        message: body.message,
      }
      console.log(body.promoCode, body.birthday);
      if (body.promoCode === undefined && body.birthday === undefined) {
        console.log("trap");
        const companyForm = await this.model.create(partialForm);
        return {status:200, message: "Form Added Succesfully", data: companyForm, meta: {}};
      }
    } catch (error) {
      return { status: 404, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {}
      }
    }
  }

  async getInquiries() {

    try {
      const list = await this.model.find();
      return {status: 200, message: "get List of Inguiries Successful", data: list, meta: {}}
    } catch (error) {
      return { status: 404, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {}}
    }

  }

}