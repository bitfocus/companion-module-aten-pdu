import * as http from "http";

export function UpdateActions(self) {
	function createBody(options) {
		const defaultParams = {		
			usr: self.config.username,
			password: self.config.pwd,
		};

		return new URLSearchParams(Object.assign(options, defaultParams)).toString();
	}

	function createAction(name, method) {
		return {
			name: name,
			options: [
				{
					id: 'index',
					type: 'dropdown',
					label: 'Outlet',
					default: "All",
					choices: [
						{ id: "All", label: "All" },
						{ id: 1, label: "1" },
						{ id: 2, label: "2" },
						{ id: 3, label: "3" },
						{ id: 4, label: "4" },
						{ id: 5, label: "5" },
						{ id: 6, label: "6" },
						{ id: 7, label: "7" },
						{ id: 8, label: "8" },
					]
				},
			],
			callback: async (event) => {
				
				const body = createBody( { "method": method, "index": event.options.index });

				//We're using http.request instead of fetch etc because we need to control the headers
				//The ATEN PDU can only handle request with CamelCased Content-Length, and NodeJS lowercases it by default.
				const req = http.request({
					hostname: self.config.host,
					path: event.options.index == "All" ?  "/api/device/relay" : "/api/outlet/relay",
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(body), }
				});
				req.on('error', () => self.updateStatus(InstanceStatus.ConnectionFailure))
				
				req.write(body);
				req.end();
			},
		};
	}

	self.setActionDefinitions({
		switch_on_outlet: createAction("Switch on outlet", "on"),
		switch_on_immediate_outlet: createAction("Switch on outlet immediately", "on_immediate"),
		switch_off_outlet: createAction("Switch off outlet", "off"),
		switch_off_immediate_outlet: createAction("Switch off outlet immediately", "off_immediate"),
		
		switch_reboot_outlet: createAction("Reboot outlet", "reboot"),
	})
}