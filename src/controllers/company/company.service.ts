import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class CompanyServices {
  @Models("company") model: any;

  getSamples() {
    // Your logic here
    console.log(this.model);
    console.log("This is from CompanyServices.");
  }
}
