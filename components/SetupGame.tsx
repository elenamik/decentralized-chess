import { Button, Form, Input, Typography, Spin } from "antd";
import { ChessBoard } from "components/ChessBoard";
import { useGameContext } from "contexts/gameContext";
import React from "react";
import { useContract, useContractEvent, useProvider, useSigner } from "wagmi";
import ChessABI from "contracts/chessABI";
import { useMutation } from "react-query";
const { Title } = Typography;

const SetupGame: React.FC<{}> = ({}) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const { game } = useGameContext();

  const contract = useContract({
    address: game?.gameAddress,
    abi: ChessABI,
    signerOrProvider: signer ? signer : provider,
  });

  const { data, mutate, isLoading } = useMutation({
    mutationKey: `${game?.gameAddress}-move`,
    mutationFn: (args: { p1: string; p2: string }) => {
      console.log("MAKING CALL", args);
      return contract!.setUpGame(args.p1, args.p2);
    },
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
  console.log("Data", data);

  const onCreateGameSubmit = async (e: { p1: string; p2: string }) => {
    console.log("SUBMIT", e);
    mutate({ p1: e.p1, p2: e.p2 });
  };

  useContractEvent({
    address: game?.gameAddress,
    abi: ChessABI,
    eventName: "ValidateMove",
    // @ts-ignore
    listener(requestId: string, isValid: boolean) {
      console.log("EVENT", requestId, isValid);
    },
  });
  return (
    <div>
      <Title>Set Up Game:</Title>
      <Title type="secondary" level={5}>
        Contract address: {game.gameAddress}
      </Title>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onCreateGameSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Player 1"
          name="p1"
          rules={[{ required: true, message: "Please input first player!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Player 2"
          name="p2"
          rules={[{ required: true, message: "Please input second player!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Start Game
          </Button>
        </Form.Item>
      </Form>
      {isLoading && <Spin />}
    </div>
  );
};

export default SetupGame;
