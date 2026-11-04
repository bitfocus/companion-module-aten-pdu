import * as http from "http";

export function UpdateVariableDefinitions(self) {
	self.setVariableDefinitions({
		outlet1: { name: 'outlet1' },
		outlet2: { name: 'outlet2' },
		outlet3: { name: 'outlet3' },
		outlet4: { name: 'outlet4' },
		outlet5: { name: 'outlet5' },
		outlet6: { name: 'outlet6' },
		outlet7: { name: 'outlet7' },
		outlet8: { name: 'outlet8' },		
	})
}

let timerID = null
export function InitVariables(self) {
	const timeoutObj = setInterval(tick, self.config.pollInterval, self)
	timerID = timeoutObj[Symbol.toPrimitive]()
}
export function DestroyVariables(self) {	
	clearInterval(timerID);
	timerID = null;
}

function tick(self) {

	http.get({
		hostname: self.config.host,
		path: "/api/device/relay"
	}, response => {
		
		if(response.statusCode == 200) {
			
			let data = '';

			response.on('data', d => data += d.toString() )
			response.on('end', () => {							
				let lines = data.split('\n')
				
				self.setVariableValues({
					outlet1: lines[1].substring(4, lines[1].length - 5),
					outlet2: lines[2].substring(4, lines[2].length - 5),
					outlet3: lines[3].substring(4, lines[3].length - 5),
					outlet4: lines[4].substring(4, lines[4].length - 5),
					outlet5: lines[5].substring(4, lines[5].length - 5),
					outlet6: lines[6].substring(4, lines[6].length - 5),
					outlet7: lines[7].substring(4, lines[7].length - 5),
					outlet8: lines[8].substring(4, lines[8].length - 5),
				})
				self.checkAllFeedbacks()
			});
		}
	});	
}