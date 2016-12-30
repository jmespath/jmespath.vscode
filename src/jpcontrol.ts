'use strict';
import * as vscode from 'vscode';
import * as jmespath from 'jmespath';

export class JMESPathController {

    private _outputChannel: vscode.OutputChannel;
    private _lastExpression: string;
    private _lastResult: any;

    constructor() {
        this._outputChannel = vscode.window.createOutputChannel('JMESPath');
        this._lastExpression = '';
    }

    evaluateJMESPathExpression() {
        let editor = vscode.window.activeTextEditor;
        let jsonText = editor.document.getText();
        let jsonDoc = JSON.parse(jsonText);
        vscode.window.showInputBox({
            placeHolder: '',
            prompt: 'Enter a JMESPath expression'
        }).then(value => {
            let query = value;
            try {
                let result = jmespath.search(jsonDoc, query);
                this.displayOnOutputChannel(JSON.stringify(result, null, 2));
            } catch (err) {
                let errorMessage = `${err.name}: ${err.message}`;
                vscode.window.showErrorMessage(errorMessage);
            }
        });
    }

    private displayOnOutputChannel(message: string) {
        this._outputChannel.clear();
        this._outputChannel.append(message);
        this._outputChannel.show();
    }
}