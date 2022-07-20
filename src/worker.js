const { default: axios } = require('axios')

let ws = {}
const tables = ['intraday_monitor', 'pnl_monitor', 'subscription']

const webSocketInit = async (setIsLoaded) => {
	// let result = await axios.put('https://dev.rest-api.enigma-x.io/auth', {
	// 	username: 'ykabariti',
	// 	password: '12345678',
	// })
	// const token = await result.data.token
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiWjczdHJ5aWM1SzQwd0ZKVWJFYWJLRFNDamZzYW5hd2FIb3dxNGhxU3E3MUY3VWl6elhFMU1GME9wNUVDbW9jcmxnVmpTTGh0Smdic1ZwZktrRmRrN2ZqcU5ObFJnclltaDZyM0RMOGJMMlhPUy92RTNaMjNyZTV3enFqUTFiSVUzWlZrcGpGTDRDMUptd2c2Q1hTNjlRaGZrMXB4N0gvSktqNGpjYUxuQlF6N2M3dVE5elR0QThKTTYzalV2OVV2YzY0Wit2eDNCK2xTYSt5eUx3ODcyU2VEZzJxTUptWEdDTmpsS2UvUHFZVlpqV05peEpUTjV0UVEvQzlVaTI0bnJRQThYTFgyV3FnWnNETUhoK1BzSWZjK0ZIRnJBN0tEZ3hESmhWaExEZjAwd1o1RnFrYm9uTzVIMDExTVVvb1YrRTM1UDQyUERNcTdtNXBUZVJlOFpBbUN4b3NoSStxV3BFT0hmYUN5cjFnaG12dGpmYi9BSS8xUG9LYnB4Ni8xbVlUVmx2WUZaUk13NmFUVFU2R1ZpT2VBRnU3TnlQSzhiY3NBa3NDVlZGaWlYTWhHby9NdXRuTTA4NFFPc3dGdmR2NVdDRkg5azJZRERqSURiT3FvYW9PUktLQmk3MmoreERMMGtrZEdXOUZBaC9vYmZEcXBsdU1xMzV0NWttR1VyUnY0cE9iYUMxOWo3ZmRlQ3VMYzQvamdoZjNpb0dFRkN4ZWdBZE4xdUhETUNiRHZMYVJlZXpuNDBxZy9pQkpvRHdjZ0dnalBqSUVLT0RUUFpFUGpKdz09IiwiaWF0IjoxNjU4MzExNzMzLCJleHAiOjE2NTgzOTgxMzN9.T7aAqWFOrcIWOApYrqi9cNFIkmvjonI7z-Y0K1xAhSA'
	let url = `wss://dev.ws-api.enigma-x.io/?token=${token}`
	for (let table of tables) {
		const a = new WebSocket(url)

		ws[table] = a

		// ws[table].onopen = () => {
		//   ws[table].send(JSON.stringify({ type: table, data: {} }));
		// };
		ws[table].onopen = () => {
			console.log(`${table} Websocket connected!`)
		}
		ws[table].onmessage = async (e) => {
			const data = await JSON.parse(e.data)
			postMessage({ type: data.type, data: data })
		}
		ws[table].onclose = () => {
			console.log(`${table} Websocket connection lost`)
		}
		ws[table].onerror = (err) => {
			console.log(err)
		}
	}
	postMessage('Hello')
}

const sendEventToWebSocket = (tableType, message) => {
	console.log(tableType, message, ws[tableType])

	ws[tableType].send(JSON.stringify(message))

	console.log(ws[tableType])
}

onmessage = ({ data }) => {
	switch (data.type) {
		case 'init':
			console.log('data', data.setIsLoaded)
			webSocketInit(data.setIsLoaded)
			break

		case 'send_event':
			console.log(data.message)
			sendEventToWebSocket(data.message.type, data.message)
			break
		// case "market_data":
		//   console.log(ws);
		//   // await openWebSocketToTable(data.type);
		//   // await sendEventToWebSocket(data.type, data.message);
		//   break;
		default:
			break
	}
}
