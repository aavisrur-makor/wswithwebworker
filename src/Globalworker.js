let worker;

const initWorker = () => {
  worker = new Worker(new URL("./worker.js", import.meta.url));
};

const getWorker = () => {
  if (worker) {
    return worker;
  } else {
    return new Worker(new URL("./worker.js", import.meta.url));
  }
};

module.exports = { initWorker, getWorker };
