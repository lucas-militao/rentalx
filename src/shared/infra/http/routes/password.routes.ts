import { Router } from "express";

import { ResetUserPasswordController } from "@modules/accounts/useCases/resetPasswordUser/ResetUserPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPassowordMail/SendForgotPasswodMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetUserPasswordController.handle);

export { passwordRoutes };
