export const receiveBlotterData = (message, cb, id) => {
  if (
    message.data &&
    message.data.type === "pnl_monitor" &&
    message.data.content
  ) {
    cb(message.data.content);
  }
  if (
    message.data &&
    message.data.type === "intraday_monitor" &&
    message.data.content
  ) {
    cb(message.data.content.intraday_monitor_table);
  }
  if (
    message.data &&
    message.data.type === "subscription" &&
    message.data.content &&
    message.data.id === id
  ) {
    cb(message.data.content);
  }
};
