const worker = new Worker(new URL('./workerWebsocket.js', import.meta.url))

export default worker
