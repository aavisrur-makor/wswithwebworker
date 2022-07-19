import React from "react";
import { SimpleBlotter } from "./SimpleBlotter";

function MarketData() {
  const blotterProps = {
    previewMode: false,
    id: "123123123123",
    tableType: "market_data",
  };
  return <SimpleBlotter {...blotterProps} />;
}

export default MarketData;
