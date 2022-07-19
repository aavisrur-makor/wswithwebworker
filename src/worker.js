const { default: axios } = require("axios");

let ws = {};
const tables = ["intraday_monitor", "pnl_monitor", "balance", "subscription"];
const webSocketInit = async (setIsLoaded) => {
  let result = await axios.put("https://dev.rest-api.enigma-x.io/auth", {
    username: "ykabariti",
    password: "12345678",
  });
  const token = await result.data.token;
  let url = `wss://dev.ws-api.enigma-x.io/?token=${token}`;
  for (let table of tables) {
    ws[table] = new WebSocket(url);
    // ws[table].onopen = () => {
    //   ws[table].send(JSON.stringify({ type: table, data: {} }));
    // };

    ws[table].onmessage = (e) => {
      const data = JSON.parse(e.data);
      postMessage({ ...data, table });
    };
  }
  postMessage({ type: "init", data: true });
};

const openWebSocketToTable = async (tableType) => {
  return new Promise((res, rej) => {
    res((ws[tableType] = new WebSocket("ws://52.51.33.70:3010")));
  });
};
const sendEventToWebSocket = (tableType, message) => {
  console.log(tableType, message, ws[tableType]);

  ws[tableType].send(JSON.stringify(message));
};

onmessage = async ({ data }) => {
  switch (data.type) {
    case "init":
      console.log("data", data.setIsLoaded);
      await webSocketInit(data.setIsLoaded);
      break;
    case "send_event":
      console.log(data.message);
      sendEventToWebSocket(data.message.type, data.message);
      break;
    // case "market_data":
    //   console.log(ws);
    //   // await openWebSocketToTable(data.type);
    //   // await sendEventToWebSocket(data.type, data.message);
    //   break;
    default:
      break;
  }
};
