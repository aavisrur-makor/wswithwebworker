const worker = new Worker(new URL('./worker.js', import.meta.url))

export default worker
