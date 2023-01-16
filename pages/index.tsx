import { Button, Input } from "antd";
import { ChessBoard } from "components/ChessBoard";
import { useGameContext } from "contexts/gameContext";
import React from "react";

export default function Home() {
  const { game, startGame } = useGameContext();
  const handleSubmit = () => {
    startGame(input);
  };

  const [input, setInput] = React.useState<string>("");

  if (!game) {
    return (
      <div className="">
        <Input.Group>
          <Input
            addonBefore="Game Address"
            placeholder="Input contract address of game"
            defaultValue={game?.gameAddress}
            style={{ width: "40%" }}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Input.Group>
      </div>
    );
  } else
    return (
      <div>
        playing game: {game?.gameAddress}
        <ChessBoard fen={game?.fen} />
      </div>
    );
}
