import { Button, Input } from "antd";
import { ChessBoard } from "components/ChessBoard";
import { useGameContext } from "contexts/gameContext";
import React from "react";
import { useContract, useContractEvent, useProvider, useSigner } from "wagmi";
import ChessABI from "contracts/chessABI";
import SetupGame from "components/SetupGame";

export default function Home() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const { game, startGame } = useGameContext();
  const handleSubmit = () => {
    startGame(input);
  };
  console.log("Game", game);

  const contract = useContract({
    address: game?.gameAddress,
    abi: ChessABI,
    signerOrProvider: signer ? signer : provider,
  });
  console.log("CONTRACT", contract);

  const [input, setInput] = React.useState<string>("");

  useContractEvent({
    address: game?.gameAddress,
    abi: ChessABI,
    eventName: "ValidateMove",
    // @ts-ignore
    listener(requestId: string, isValid: boolean) {
      console.log("EVENT", requestId, isValid);
    },
  });

  useContractEvent({
    address: game?.gameAddress,
    abi: ChessABI,
    eventName: "GameReady",
    // @ts-ignore
    listener(requestId: string, isValid: boolean) {
      console.log("EVENT", requestId, isValid);
    },
  });

  if (!game || !game.gameAddress || game.gameAddress === "") {
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
  } else if (contract!.FEN.name === "") {
    return <SetupGame />;
  }
  return (
    <div>
      playing game: {game?.gameAddress}
      <ChessBoard fen={game?.fen} />
    </div>
  );
}
