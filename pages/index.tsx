import { Button, Input } from "antd";
import { Chess } from "chess.js";
import { useGameContext } from "contexts/gameContext";
import React from "react";
import { Chessboard } from "react-chessboard";

export default function Home() {
  const { game, setGame } = useGameContext();
  const handleSubmit = () => {
    setGame({ gameAddress: input });
  };

  const [input, setInput] = React.useState<string>("");

  if (!game) {
    return (
      <div className="">
        <Game />
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
  } else return <div>playing game: {game.gameAddress}</div>;
}

export const Game: React.FC = () => {
  const chess = new Chess();

  const [fen, setFen] = React.useState<undefined | string>();
  React.useEffect(() => {
    if (typeof window !== "undefined") setFen(chess.fen());
  }, []);

  if (fen) {
    return (
      <Chessboard position={fen} boardWidth={600} arePiecesDraggable={false} />
    );
  }
  return <></>;
};
