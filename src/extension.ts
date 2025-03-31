import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;
const STORAGE_KEY = 'targetDate';

export function activate(context: vscode.ExtensionContext) {
	// Create status bar item with Left alignment
	statusBarItem = vscode.window.createStatusBarItem(
		'countdown.timer',
		vscode.StatusBarAlignment.Left,
		100
	);
	statusBarItem.command = 'countdown.setDate';
	context.subscriptions.push(statusBarItem);

	// Register command to set the date
	let setDateCommand = vscode.commands.registerCommand('countdown.setDate', async () => {
		const savedDate = context.globalState.get<string>(STORAGE_KEY);

		if (!savedDate) {
			// No date set, go directly to date input
			const result = await vscode.window.showInputBox({
				prompt: 'Enter target date (MM/DD/YY)',
				placeHolder: 'e.g. 12/31/25'
			});

			if (result) {
				// Parse MM/DD/YY format
				const [month, day, year] = result.split('/').map(n => parseInt(n));
				const date = new Date(2000 + year, month - 1, day);
				if (!isNaN(date.getTime())) {
					await context.globalState.update(STORAGE_KEY, date.toISOString());
					updateStatusBar(date);
				} else {
					vscode.window.showErrorMessage('Please enter a valid date in MM/DD/YY format');
				}
			}
		} else {
			// Date exists, show both options
			const action = await vscode.window.showQuickPick(['Set Date', 'Clear Date'], {
				placeHolder: 'Choose an action'
			});

			if (action === 'Set Date') {
				const result = await vscode.window.showInputBox({
					prompt: 'Enter target date (MM/DD/YY)',
					placeHolder: 'e.g. 12/31/25'
				});

				if (result) {
					// Parse MM/DD/YY format
					const [month, day, year] = result.split('/').map(n => parseInt(n));
					const date = new Date(2000 + year, month - 1, day);
					if (!isNaN(date.getTime())) {
						await context.globalState.update(STORAGE_KEY, date.toISOString());
						updateStatusBar(date);
					} else {
						vscode.window.showErrorMessage('Please enter a valid date in MM/DD/YY format');
					}
				}
			} else if (action === 'Clear Date') {
				await context.globalState.update(STORAGE_KEY, undefined);
				statusBarItem.text = "Set Date";
			}
		}
	});
	context.subscriptions.push(setDateCommand);

	// Initialize status bar
	const savedDate = context.globalState.get<string>(STORAGE_KEY);
	if (savedDate) {
		updateStatusBar(new Date(savedDate));
	} else {
		statusBarItem.text = "Set Date";
	}
	statusBarItem.show();

	// Update countdown every day
	const interval = setInterval(() => {
		const savedDate = context.globalState.get<string>(STORAGE_KEY);
		if (savedDate) {
			updateStatusBar(new Date(savedDate));
		}
	}, 24 * 60 * 60 * 1000);

	context.subscriptions.push({ dispose: () => clearInterval(interval) });
}

function updateStatusBar(targetDate: Date) {
	const now = new Date();
	const diff = targetDate.getTime() - now.getTime();

	if (diff <= 0) {
		statusBarItem.text = 'Date passed';
		return;
	}

	// Calculate total days and weeks
	const totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
	const totalWeeks = Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));

	statusBarItem.text = `${totalWeeks}W/${totalDays}D`;
}

export function deactivate() { }
