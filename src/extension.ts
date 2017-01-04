'use strict';
import * as vscode from 'vscode';
import { JMESPathController } from './jpcontrol';

export function activate(context: vscode.ExtensionContext) {

    let controller = new JMESPathController();
    let disposable = vscode.commands.registerCommand('extension.evaluateJMESPath', () => {
        controller.evaluateJMESPathExpression();
    });

    context.subscriptions.push(disposable);
}


export function deactivate() {
}