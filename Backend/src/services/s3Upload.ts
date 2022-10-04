import Log from "../middlewares/Log";
import AWS from "aws-sdk";

export default async function upload(
  id: string,
  buffer: Buffer,
  originalname: string
) {
  if (process.env.NODE_ENV === "test") {
    const data = {
      Location: "this worked",
      name: originalname,
    };
    Log.info("Uploaded File to S3");
    return data;
  }
  try {
    Log.info("Uploading File to S3");
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const fileExtension = originalname.split(".").pop();
    // upload image to s3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${id}.${fileExtension}`,
      Body: buffer,
    };
    const data = await s3.upload(params).promise();
    Log.info("Uploaded File to S3");
    return data;
  } catch (err) {
    return false;
  }
}
