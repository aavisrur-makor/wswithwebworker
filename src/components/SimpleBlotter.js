import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import TableComponent from "../tables/TableComponent";
import { getWorker } from "../Globalworker";

export const SimpleBlotter = ({
  openTable,
  tableName,
  tableType,
  columns,
  isWsLoaded,
}) => {
  const [dataFromWS, setDataFromWS] = useState(null);
  const worker = getWorker();

  //send to ws
  useEffect(() => {
    if (openTable && isWsLoaded) {
      worker.postMessage({
        type: "send_event",
        message: { type: tableType, data: {} },
      });
    }
  }, [tableType, worker, openTable, isWsLoaded]);

  //recieving from worker.
  useEffect(() => {
    const receiveBlotterData = (message) => {
      if (
        message.data &&
        message.data.type === "pnl_monitor" &&
        message.data.content
      ) {
        setDataFromWS(message.data.content);
      }
      if (
        message.data &&
        message.data.type === "intraday_monitor" &&
        message.data.content
      ) {
        setDataFromWS(message.data.content.intraday_monitor_table);
      }
    };
    worker.onmessage = (message) => {
      receiveBlotterData(message);
    };
  }, [worker, tableType, openTable]);
  return (
    <Grid container style={{ overflowX: "auto" }}>
      <Grid style={{ maxHeight: "500px", width: "100%" }} item xs={12}>
        {openTable && dataFromWS && (
          <TableComponent
            loading={false}
            tableType={tableType}
            columns={columns}
            dataFromWS={dataFromWS}
          />
        )}
      </Grid>
    </Grid>
  );
};
