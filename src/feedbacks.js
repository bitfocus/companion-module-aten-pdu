export function UpdateFeedbacks(self) {
	self.setFeedbackDefinitions({
		check_outlet_status: {
			name: 'Outlet Status',
			type: 'boolean',
            showInvert: false,
			defaultStyle: {
				bgcolor: 0xff0000,
				color: 0x000000,
			},
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Outlet',
					default: 1,
					min: 1,
					max: 8,
					clampValues: true,
				},
                {
					id: 'state',
					type: 'dropdown',
					label: 'Value',	
                    default: "ON",
                    choices: [
                        { id: "ON", label: "On" },
						{ id: "OFF", label: "Off" },
						{ id: "PENDING", label: "Pending" }]			
				},
			],
			callback: (feedback) => {                 
                return self.getVariableValue('outlet' + feedback.options.num) == feedback.options.state;
			},
		},
	})
}