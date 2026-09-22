// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export interface TableDeclaration {
	name: string;
	nameStart: number;
	nameEnd: number;
	line: number;
}

const tableDeclarationPattern = /^\s*CREATE\s+(?:OR\s+REPLACE\s+)?TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([A-Za-z0-9_.`$-]+)/i;

export function findTableDeclarations(text: string): TableDeclaration[] {
	return text.split(/\r?\n/).flatMap((lineText, line) => {
		const match = tableDeclarationPattern.exec(lineText);
		if (!match || match.index === undefined || match[1] === undefined) {
			return [];
		}

		const rawName = match[1];
		const nameStart = match.index + match[0].indexOf(rawName);
		return [{
			name: rawName.replace(/`/g, ''),
			nameStart,
			nameEnd: nameStart + rawName.length,
			line,
		}];
	});
}

class DatabricksSqlDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
	provideDocumentSymbols(document: vscode.TextDocument): vscode.DocumentSymbol[] {
		return findTableDeclarations(document.getText()).map((table) => {
			const lineRange = document.lineAt(table.line).range;
			const nameRange = new vscode.Range(
				new vscode.Position(table.line, table.nameStart),
				new vscode.Position(table.line, table.nameEnd),
			);
			return new vscode.DocumentSymbol(
				table.name,
				'Databricks table',
				vscode.SymbolKind.Struct,
				lineRange,
				nameRange,
			);
		});
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {

	context.subscriptions.push(
		vscode.languages.registerDocumentSymbolProvider(
			{ language: 'sql', scheme: 'file' },
			new DatabricksSqlDocumentSymbolProvider(),
		),
	);
}

// This method is called when your extension is deactivated
export function deactivate(): void {}
