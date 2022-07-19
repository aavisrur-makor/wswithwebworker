import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getWorker } from "../Globalworker";
import { receiveBlotterData } from "../helperFunctions";

function Clicktrading({ type, currency, isAbleToRender, id, dataFromWs }) {

  console.log("worker", dataFromWs, isAbleToRender);
  return (
    <>
      {dataFromWs ? (
        <Grid container>
          <Paper style={{ border: "1px solid black", width: "400px" }}>
            <Grid item container xs={12}>
              <Typography>{`Currency : ${currency}`}</Typography>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <Typography>Bid</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {dataFromWs[currency].price.bid
                    ? dataFromWs[currency].price.bid.price
                    : "No data to show"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <Typography>Ask</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {dataFromWs[currency].price.ask
                    ? dataFromWs[currency].price.ask.price
                    : "No data to show"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Clicktrading;
