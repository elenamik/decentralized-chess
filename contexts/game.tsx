import React from "react";

type GameState = {
  gameAddress: string;
  players: [string, string];
};

const GameContext = React.createContext<GameState | any>({});

export const GameProvider: React.FC<React.ProviderProps<any>> = ({
  children,
}) => {
  const [game, setGame] = React.useState<GameState | undefined>();

  return (
    <GameContext.Provider value={{ game, setGame: setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
