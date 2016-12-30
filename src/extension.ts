'use strict';
import * as vscode from 'vscode';
import { JMESPathController } from './jpcontrol';

export function activate(context: vscode.ExtensionContext) {

    let controller = new JMESPathController();
    let sb = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
    let disposable = vscode.commands.registerCommand('extension.evaluateJMESPath', () => {
        controller.evaluateJMESPathExpression();
    });
    let locationController = new JMESPathLocationController(sb);

    context.subscriptions.push(disposable);
    context.subscriptions.push(sb);
    context.subscriptions.push(locationController);
}

class JMESPathLocationController {
    private _disposable: vscode.Disposable;
    private _statusBar: vscode.StatusBarItem;
    private _jpLocation: JMESPathLocationCalculator;

    constructor(statusBar: vscode.StatusBarItem) {
        this._statusBar = statusBar;
        let subscriptions: vscode.Disposable[] = [];
        vscode.window.onDidChangeTextEditorSelection(this.onCursorLocationChanged, this, subscriptions);
        this._disposable = vscode.Disposable.from(...subscriptions);
        this._jpLocation = new JMESPathLocationCalculator();
    }

    private onCursorLocationChanged(event: vscode.TextEditorSelectionChangeEvent) {
        let location = event.textEditor.selection.active;
        let jsonText = event.textEditor.document.getText();
        let jpLocation = this._jpLocation.calculateJMESPathLocation(jsonText, location.character);
        this._statusBar.text = jpLocation;
        this._statusBar.show();
    }

    dispose() {
        this._disposable.dispose();
    }
}


class JMESPathLocationCalculator {
    // This class is used to determine the singular
    // JMESPath expression that represents the
    // cursor location in a JSON document.  For example,
    // {"foo": {"bar": "baz"}}
    //                  ^- cursor here
    // Then the jmespath expression for that location is "foo.bar".
    public calculateJMESPathLocation(jsonText: string, location: number): string {
        let jpExpr = `${location}`;
        return jpExpr;
    }
}

export function deactivate() {
}