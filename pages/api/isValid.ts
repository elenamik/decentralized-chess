// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  valid: boolean;
  game: string;
  player: "BLACK" | "WHITE";
  move: string;
};
type ErrorResponse = {
  error: string;
  message?: string;
};

type Response = Data | ErrorResponse;
interface Body extends NextApiRequest {
  body: {
    game: string;
    player: "BLACK" | "WHITE";
    move: string;
  };
}

export default function handler(req: Body, res: NextApiResponse<Response>) {
  console.log("GOT REQUEST", req.query);
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { game, player, move } = req.query;

  if (!game || !player || !move) {
    return res.status(405).json({
      error:
        "Did not recieve expected arguments. Recieved:" +
        JSON.stringify(req.body),
    });
  }

  // load game from game address

  // game.validateMove

  var randomBoolean = Math.random() < 0.5;

  return res.status(200).json({ valid: randomBoolean, game, player, move });
}
