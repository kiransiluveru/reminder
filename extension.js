// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "remainder" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let timerId = null;
	let disposalbeForClearRemainder = vscode.commands.registerCommand('extension.clearRemainder', () => {
		if (timerId) {
			clearInterval(timerId);
			vscode.window.showInformationMessage("Successfully cleared the remainder");
			timerId = null;
		}
	});
	let disposable = vscode.commands.registerCommand('extension.startRemainder', function () {
		// The code you place here will be executed every time your command is executed
		let remainderMessage = "Hey, It's almost 2 hours happened till you opened Visual Studio Code :) "
		const inputBox = vscode.window.showInputBox({ prompt: "Provide the Message to show in the Remainder for every 2 hours from now :  " });
		inputBox.then((success) => {
			if (remainderMessage !== undefined && remainderMessage !== "") {
				remainderMessage = success;
			}
			vscode.window.showInformationMessage("Remainder is Started ");
			timerId = setInterval(() => {
				vscode.window.showInformationMessage(remainderMessage);
			}, 7200000);

		}, () => { });
		if (timerId) {
			clearInterval(timerId);
		}
		// Display a message box to the user
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposalbeForClearRemainder);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	console.log(" Remainders extension was deactivted")
}

module.exports = {
	activate,
	deactivate
}
