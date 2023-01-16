import React from "react";
import { Chessboard } from "react-chessboard";

export const ChessBoard: React.FC<{ fen: string }> = ({ fen }) => {
  console.log("FEN, ", fen);
  if (fen) {
    return (
      <Chessboard position={fen} boardWidth={600} arePiecesDraggable={false} />
    );
  }
  return <></>;
};
