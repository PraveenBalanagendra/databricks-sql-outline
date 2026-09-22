import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { findTableDeclarations } from '../extension';

suite('Extension Test Suite', () => {
	test('finds Databricks table declarations', () => {
		const tables = findTableDeclarations([
			'CREATE TABLE calendar_dm',
			'CREATE OR REPLACE TABLE `main`.`credit-risk`.`counterparty` (',
			'CREATE TABLE IF NOT EXISTS catalog.schema.existing_table',
		].join('\n'));

		assert.deepStrictEqual(tables.map((table) => table.name), [
			'calendar_dm',
			'main.credit-risk.counterparty',
			'catalog.schema.existing_table',
		]);
		assert.strictEqual(tables[1].line, 1);
	});
});
