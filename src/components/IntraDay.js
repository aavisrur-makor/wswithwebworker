import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { SimpleBlotter } from "./SimpleBlotter";

function IntraDay({ isWsLoaded, tableType }) {
  const [openTable, setOpenTable] = useState(false);
  const handleOpen = () => {
    setOpenTable((prev) => !prev);
  };
  const blotterProps = {
    tableType,
    openTable: openTable,
    isWsLoaded,
    columns: [
      { name: "currency" },
      { name: "last_price" },
      { name: "net_delta" },
      { name: "open_delta" },
      { name: "trade_delta" },
    ],
  };
  console.log(
    `RENDERING ${tableType}!`,
    `Open table ${tableType} ${openTable}`
  );
  return (
    <>
      {isWsLoaded && (
        <Button onClick={handleOpen}>{`Open Intraday Monitor`}</Button>
      )}
      <Grid item style={{ width: "50%" }}>
        <SimpleBlotter {...blotterProps} />
      </Grid>
    </>
  );
}

export default IntraDay;
