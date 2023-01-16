import React from "react";
import { Chess } from "chess.js";

type GameState = {
  gameAddress: string;
  players: [string, string];
  fen: string;
};

const GameContext = React.createContext<GameState | any>({});

export const GameProvider: React.FC<React.ProviderProps<any>> = ({
  children,
}) => {
  const [game, setGame] = React.useState<GameState | undefined>();

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
