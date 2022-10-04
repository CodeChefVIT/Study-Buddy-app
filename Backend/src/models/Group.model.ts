import mongoose from "../providers/Database";
import { IUserModel } from "./User.model";

interface module {
  name: string;
  daysToComplete: number;
  completedUsers: IUserModel[];
  date: Date;
}

export interface IGroupModel extends mongoose.Document {
  name: string;
  image: string;
  description: string;
  inviteCode: string;
  members: IUserModel[];
  requests: IUserModel[];
  admin: IUserModel;
  subject: string;
  quizes: IQuiz[];
  modules: module[];
  date: Date;
}

const GroupSchema = new mongoose.Schema<IGroupModel>({
  name: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  },
  description: { type: String, default: "" },
  inviteCode: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: { type: String, required: true },
  quizes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  modules: [
    {
      name: { type: String, required: true },
      daysToComplete: { type: Number, required: true },
      completedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

interface lastAttempt {
  question: string;
  answer: string;
  correct: boolean;
}

interface attempted {
  user: IUserModel;
  noOfAttempts: number;
  lastAttempt: lastAttempt[];
  score: number;
  date: Date;
}

interface questions {
  question: string;
  options: string[];
  answer: string;
}

export interface IQuiz extends mongoose.Document {
  group: IGroupModel;
  time: string;
  creator: IUserModel;
  attempted: attempted[];
  questions: questions[];
  date: Date;
}

const QuizSchema = new mongoose.Schema<IQuiz>({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Groups" },
  time: { type: String, required: true, default: "00:00:00" },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attempted: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      noOfAttempts: { type: Number, default: 0 },
      lastAttempt: [
        {
          question: { type: String },
          answer: { type: String },
          correct: { type: Boolean },
        },
      ],
      score: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
    },
  ],
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      answer: { type: String, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

const Group = mongoose.model<IGroupModel>("Groups", GroupSchema);
const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);

export { Group, Quiz };
