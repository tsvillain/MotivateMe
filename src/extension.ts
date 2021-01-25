import * as vscode from 'vscode';
import fetch from 'node-fetch';

let myStatusBarItem: vscode.StatusBarItem;
const apiUrl = 'http://quotes.stormconsultancy.co.uk/random.json';

export function activate({ subscriptions }: vscode.ExtensionContext) {

	const myCommandID = 'vsmotivate.start';
	subscriptions.push(vscode.commands.registerCommand(myCommandID, () => {
		showQuote();
	}));

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = myCommandID;
	subscriptions.push(myStatusBarItem);

	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	updateStatusBarItem();

}

function updateStatusBarItem(): void {
	myStatusBarItem.text = 'Motivate Me';
	myStatusBarItem.show();
}


async function showQuote() {

	try {
		const response = await fetch(apiUrl);
		const json = await response.json();
		if (response.status === 200) {
			vscode.window.showInformationMessage(`${json.quote}`);
		} else {
			vscode.window.showInformationMessage(`Something went Wrong\nContact Developer`);
		}
	} catch (error) {
		vscode.window.showInformationMessage(`I can't work Offline`);
	}

}
export function deactivate() { }
