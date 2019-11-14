// import { SampleController } from "./controllers/sample/sample.controller";
import { FormController } from "./controllers/form/form.controller";
import { UserController} from "./controllers/user/user.controller";

export const routes = [
  {
    controllers: [FormController, UserController],
    middlewares: [],
    path: "",
  },
];
