import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) return res.status(400).send("Missing parameter");
  res.status(201).json(req.body);
};
