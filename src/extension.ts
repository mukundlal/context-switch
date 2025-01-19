import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const sidebarProvider = new ContextSwitcherSidebar(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "contextSwitcherSidebar", // Must match the `id` in package.json
            sidebarProvider
        )
    );
}

// This method is called when your extension is deactivated
export function deactivate() {}

export class ContextSwitcherSidebar implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true, // Allow JavaScript in the Webview
            localResourceRoots: [this._extensionUri]
        };

        // Set HTML content
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Context Switcher</title>
            </head>
            <body>
                <h1>Context Switcher</h1>
                <p>Select an option:</p>
               
            </body>
            </html>
        `;
    }
}
