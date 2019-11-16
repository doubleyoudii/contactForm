import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { CompanyServices } from "../company/company.service";

@Injectable()
export class SampleServices {
  @Models("user") model: any;
  constructor(private services: CompanyServices) {}

  getUser() {
    // Your logic here
    console.log(this.model);
   
    console.log("This is from UserServices.");
    return {"this is from services": "nothing"}
  }

  async postRegisterUser (body: any) {
    try {
      const newUser = {
        email: body.email,
        password: body.password
      };
      console.log(this.model);
      const userData = await this.model.create(newUser);
      return {status: 200, message: "user post Success", data: userData, meta: {}}
    } catch (error) {
      return { status: 404, message: error.errmsg ? error.errmsg : error.toString(), data: [body], meta: {}}
    }

  }


  async findUserbyEmail (email: string) {
    try {
      const userTry = await this.model.findOne({email: email});
      return userTry;
    } catch (error) {
      throw Promise.reject(new Error);
    }
  }
}
