import { Router } from "express";
import Joi from "joi";
import Question from "../controllers/Api/Question";
import TestCases from "../controllers/Api/TestCases";
import Submission from "../controllers/Api/Submission";
import Login from "../controllers/Auth/Login";
import { authorise } from "../middlewares/Authorise";
import Validate from "../middlewares/Validate";

const router = Router();

const schema = {
  id: Joi.object({
    id: Joi.string().required(),
  }),
  submit: Joi.object({
    questionId: Joi.string().required(),
    code: Joi.string().required(),
    language: Joi.string().required(),
  }),
};

router.get("/questions", Question.getAll);
router.get(
  "/questions/:id",
  authorise,
  Validate.params(schema.id),
  Question.getByID
);

router.post("/questions", Question.createQuestion);

router.post("/testcases", TestCases.createTestCases);

router.post(
  "/submit",
  authorise,
  Validate.body(schema.submit),
  Submission.create
);

router.get("/profile", authorise, Login.myprofile);

router.post("/getLeaderBoard", authorise, Submission.getLeaderboard);

export default router;
