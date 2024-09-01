import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const URL = `${process.env.REACT_APP_API_URL}/ocr`;

  try {
    const { data } = await axios.post(URL, req.body);

    return res.status(201).send(data);
  } catch (err: any) {
    console.log(err);

    return res.status(500).send(err);
  }
}
