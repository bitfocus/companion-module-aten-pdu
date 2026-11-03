import { InstanceBase, Regex, InstanceStatus } from '@companion-module/base'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'

export { UpgradeScripts }

export default class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)
		this.updateActions() // export actions
	}
	
	async configUpdated(config) {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'username',
				label: 'Username',
				width: 8,
			},
			{
				type: 'secret-text',
				id: 'pwd',
				label: 'Password',
				width: 8,
			}
		]
	}

	updateActions() {
		UpdateActions(this)
	}
}
