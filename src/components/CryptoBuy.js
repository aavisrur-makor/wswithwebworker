import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getWorker } from "../Globalworker";
import { receiveBlotterData } from "../helperFunctions";
import Clicktrading from "./Clicktrading";

function CryptoBuy({ currency, isWsLoaded, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const worker = getWorker();

  const [dataFromWs, setDataFromWS] = useState(null);

  useEffect(() => {
    if (isOpen && isWsLoaded) {
      worker.postMessage({
        type: "send_event",
        message: {
          type: "subscription",
          id: id,
          data: {
            products: [currency],
            quantity: "3.00000000",
            level: true,
            high: true,
            low: true,
            change_daily: true,
          },
        },
      });
    }
  }, [isOpen, isWsLoaded, worker, currency, id]);
  useEffect(() => {
    worker.onmessage = (message) => {
      console.log("Messages", id);
      receiveBlotterData(message, setDataFromWS, id);
    };
  }, [isOpen, worker, currency, id, isWsLoaded]);
  return (
    <Grid container item>
      <Button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        Buy {currency}
      </Button>
      {isOpen && isWsLoaded && (
        <Clicktrading
          dataFromWs={dataFromWs}
          id={id}
          isAbleToRender={isOpen && isWsLoaded}
          currency={currency}
        />
      )}
    </Grid>
  );
}

export default CryptoBuy;
