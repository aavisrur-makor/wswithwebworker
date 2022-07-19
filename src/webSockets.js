let wsArr = {};
const OpenWebSockets = () => {
  try {
    for (let i = 0; i < 10; i++) {
      wsArr[i] = new WebSocket("ws://52.51.33.70:3010");
    }

    return wsArr;
  } catch (err) {}
};

module.exports = { wsArr, OpenWebSockets };
