import {
  type PresignedPostOptions,
  createPresignedPost,
} from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { hashMessage } from "viem";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucketName = process.env.AWS_BUCKET_NAME;
  if (!accessKeyId || !secretAccessKey || !bucketName) {
    return res
      .status(500)
      .json({ message: "AWS Credentials or bucket name not set" });
  }
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });

  const validated = uploadUrlValidator.parse(req.query);
  const { fileName } = validated;
  const hashedFileName = hashMessage(fileName);

  const uniqueFileName = `${Date.now()}-${hashedFileName}`;

  const params: PresignedPostOptions = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: uniqueFileName,
    Conditions: [["content-length-range", 0, 1000000]],
    Expires: 60,
  };

  const uploadUrl = await createPresignedPost(s3, params);

  res
    .status(200)
    .json({ uniqueFileName: uniqueFileName, uploadUrl: uploadUrl });
}

const uploadUrlValidator = z.object({
  fileName: z.string(),
});
