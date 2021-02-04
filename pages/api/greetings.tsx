import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  first_name: string;
  last_name: string;
};

export default (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ first_name: "Florian", last_name: "Séran" });
};
