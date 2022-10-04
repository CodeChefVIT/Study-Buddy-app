import mongoose from "mongoose";

export type TokenDocument = mongoose.Document & {
  token: string;
  user: mongoose.Types.ObjectId;
  expiryDate: Date;
};

const RefreshTokenSchema: mongoose.Schema = new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  expiryDate: { type: Date, required: true },
});

const Token = mongoose.model<TokenDocument>("Token", RefreshTokenSchema);

export default Token;
