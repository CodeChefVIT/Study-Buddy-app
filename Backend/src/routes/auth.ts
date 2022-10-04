import { Router } from "express";
import Login from "../controllers/Auth/Login";
import Joi from "joi";
import Register from "../controllers/Auth/Register";
const router = Router();

const schema = {
  signup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirm: Joi.string().required().equal(Joi.ref("password")),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

router.post("/auth/sendEmail", Login.sendRequest);
router.post("/auth/register", Register.create);

router.post("/auth/login", Login.login);

export default router;
