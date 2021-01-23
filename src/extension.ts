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
	const response = await fetch(apiUrl);
	const json = await response.json();
	vscode.window.showInformationMessage(`${json.quote}`);
}
export function deactivate() { }
