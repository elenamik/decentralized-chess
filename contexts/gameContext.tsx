import React from "react";
import { Chess } from "chess.js";

type GameState = {
  gameAddress: string;
  players?: [string, string];
  fen?: string;
};

const getContractAddress = () => {
  console.log(
    "env",
    process.env.NODE_ENV,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );
  if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  )
    return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  else return "";
};

const GameContext = React.createContext<GameState | any>({});

export const GameProvider: React.FC<React.ProviderProps<any>> = ({
  children,
}) => {
  const [game, setGame] = React.useState<GameState | undefined>({
    gameAddress: getContractAddress(),
  });

  const startGame = (gameAddress: string) => {
    const chess = new Chess();
    setGame({ gameAddress: gameAddress, players: ["", ""], fen: chess.fen() });
  };

  return (
    <GameContext.Provider
      value={{ game, setGame: setGame, startGame: startGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
