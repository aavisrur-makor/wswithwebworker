import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { getWorker, initWorker } from "./Globalworker";
import { SimpleBlotter } from "./components/SimpleBlotter";
import MarketData from "./components/MarketData";
import PnlMonitor from "./components/PnlMonitor";
import IntraDay from "./components/IntraDay";
import Clicktrading from "./components/Clicktrading";
import { CircularProgress, Divider, Grid } from "@material-ui/core";
import CryptoBuy from "./components/CryptoBuy";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    initWorker();
    const worker = getWorker();
    worker.postMessage({ type: "init" });

    worker.onmessage = (message) => {
      if (message.data.type === "init") {
        setIsLoaded(message.data.data);
      }
    };
  }, []);

  return (
    <>
      {isLoaded ? (
        <Grid container direction="column" justifyContent="center">
          <Grid item container>
            <Grid item>
              <CryptoBuy
                key="bf5d15d0-415f-11ec-b255-ad01e0712738"
                id="bf5d15d0-415f-11ec-b255-ad01e0712738"
                currency={"BTC-USD"}
                isWsLoaded={isLoaded}
                type="click_trading"
              />
            </Grid>
            <Grid item>
              <CryptoBuy
                key="bfa88422-1632-427b-bbc7-de104d7ffad5"
                id="bfa88422-1632-427b-bbc7-de104d7ffad5"
                currency={"BTC-EUR"}
                isWsLoaded={isLoaded}
                type="click_trading"
              />
            </Grid>

            {/* <Grid item>
              <CryptoBuy
                currency={"ETH-USD"}
                isWsLoaded={isLoaded}
                type="click_trading"
              />
            </Grid> */}
          </Grid>
          <Divider style={{ padding: "20px", color: "black" }}></Divider>
          <Grid item xs={12} container>
            <Grid item xs={4}>
              <IntraDay tableType="intraday_monitor" isWsLoaded={isLoaded} />
            </Grid>
            <Grid item xs={4}>
              <PnlMonitor tableType="pnl_monitor" isWsLoaded={isLoaded} />
            </Grid>

            <Grid item xs={4}>
              <IntraDay tableType="intraday_monitor" isWsLoaded={isLoaded} />
            </Grid>
            <Grid item xs={4}>
              <PnlMonitor tableType="pnl_monitor" isWsLoaded={isLoaded} />
              {/* <IntraDay isWsLoaded={isLoaded} /> */}
            </Grid>
            <Grid item xs={4}>
              <IntraDay tableType="intraday_monitor" isWsLoaded={isLoaded} />
            </Grid>
            <Grid item xs={4}>
              <PnlMonitor tableType="pnl_monitor" isWsLoaded={isLoaded} />
              {/* <IntraDay isWsLoaded={isLoaded} /> */}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default App;
