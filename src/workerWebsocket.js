const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiWjczdHJ5aWM1SzQwd0ZKVWJFYWJLRFNDamZzYW5hd2FIb3dxNGhxU3E3MUY3VWl6elhFMU1GME9wNUVDbW9jcmxnVmpTTGh0Smdic1ZwZktrRmRrN2ZqcU5ObFJnclltaDZyM0RMOGJMMlhPUy92RTNaMjNyZTV3enFqUTFiSVUzWlZrcGpGTDRDMUptd2c2Q1hTNjlRaGZrMXB4N0gvSktqNGpjYUxuQlF6N2M3dVE5elR0QThKTTYzalV2OVV2YzY0Wit2eDNCK2xTYSt5eUx3ODcyU2VEZzJxTUptWEdDTmpsS2UvUHFZVlpqV05peEpUTjV0UVEvQzlVaTI0bnJRQThYTFgyV3FnWnNETUhoK1BzSWZjK0ZIRnJBN0tEZ3hESmhWaExEZjAwd1o1RnFrYm9uTzVIMDExTVVvb1YrRTM1UDQyUERNcTdtNXBUZVJlOFpBbUN4b3NoSStxV3BFT0hmYUN5cjFnaG12dGpmYi9BSS8xUG9LYnB4Ni8xbVlUVmx2WUZaUk13NmFUVFU2R1ZpT2VBRnU3TnlQSzhiY3NBa3NDVlZGaWlYTWhHby9NdXRuTTA4NFFPc3dGdmR2NVdDRkg5azJZRERqSURiT3FvYW9PUktLQmk3MmoreERMMGtrZEdXOUZBaC9vYmZEcXBsdU1xMzV0NWttR1VyUnY0cE9iYUMxOWo3ZmRlQ3VMYzQvamdoZjNpb0dFRkN4ZWdBZE4xdUhETUNiRHZMYVJlZXpuNDBxZy9pQkpvRHdjZ0dnalBqSUVLT0RUUFpFUGpKdz09IiwiaWF0IjoxNjU4MzEyNDA2LCJleHAiOjE2NTgzOTg4MDZ9.uxisjGro9SYYb5ORGEFI0459JEL6ZgITitMaiKh4ReM'
let url = `wss://dev.ws-api.enigma-x.io/?token=${token}`

const ws = new WebSocket(url)

const sendEventToWebSocket = (tableType, message) => {
	ws.send(JSON.stringify(message))
}
ws.onopen = () => {
	console.log('Connected to Analytics WebSocket!')
	postMessage({
		type: 'ws_status',
		data: {
			isStreaming: true,
		},
	})
}

ws.onmessage = async (event) => {
	const response = JSON.parse(event.data)
	postMessage(response)
}

ws.onclose = () => {
	console.log('Connection closed! Try to reconnect in 5 seconds...')
	postMessage({
		type: 'ws_status',
		data: {
			isStreaming: false,
		},
	})
}

ws.onerror = (err) => {
	console.log(err)
}

onmessage = ({ data }) => {
	switch (data.type) {
		case 'send_event':
			sendEventToWebSocket(data.message.type, data.message)
			break
		default:
			break
	}
}
