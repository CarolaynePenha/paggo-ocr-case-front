import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const region = process.env.AWS_REGION;
    console.log("region: ", region);
    const accessKeyId = process.env.AWS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const s3BucketName = process.env.AWS_S3_BUCKET_NAME;
    const uniqueName =
      (req.query.fileName as string).replace("s", "-") + Date.now().toString();
    if (!accessKeyId || !secretAccessKey || !s3BucketName || !region) {
      throw new Error("AWS credentials invalid");
    }
    const client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    const command = new PutObjectCommand({
      Bucket: s3BucketName,
      Key: uniqueName,
      ContentType: req.query.fileType as string,
    });
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    return res.status(200).send({ signedUrl, uniqueName });
  } catch (err: any) {
    console.log(err);

    return res.status(500).send(err);
  }
}
