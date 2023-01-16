import { Button, Input } from "antd";
import { useGameContext } from "contexts/game";
import React from "react";

export default function Home() {
  const { game, setGame } = useGameContext();
  const handleSubmit = () => {
    setGame({ gameAddress: input });
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
  } else return <div>playing game: {game.gameAddress}</div>;
}
