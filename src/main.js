import { InstanceBase, Regex, InstanceStatus } from '@companion-module/base'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdateVariableDefinitions, InitVariables, DestroyVariables } from './variables.js' 

export { UpgradeScripts }

export default class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		InitVariables(this)

		this.updateStatus(InstanceStatus.Ok)
		
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definition		
	}
	
	async configUpdated(config) {
		this.config = config

		DestroyVariables(this) 
		InitVariables(this)
	}
	async destroy() {
		DestroyVariables(this)
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
			},
			{
				type: 'checkbox',
				id: 'pollingenabled',
				label: 'Enable Feedback',
				default: false
			},
			{
				type: 'number',
				id: 'pollInterval',
				label: 'Poll Interval in MS',
				width: 8,
				min: 500,
				default: 1000,				
				isVisibleExpression: '$(options:pollingenabled)',
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}
