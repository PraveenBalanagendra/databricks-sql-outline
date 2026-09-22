# Databricks SQL Outline

Adds Databricks SQL table symbols to VS Code's built-in Outline view. It recognizes `CREATE TABLE`, `CREATE OR REPLACE TABLE`, and `CREATE TABLE IF NOT EXISTS` declarations, including qualified and backtick-quoted Unity Catalog names.

## Local installation

1. Run `npm install` in this folder.
2. Run `npm run package` to build the extension.
3. Install the generated `databricks-sql-outline-0.0.1.vsix` through Extensions > `...` > Install from VSIX.
4. Reload VS Code and open a `.sql` file.
5. Open View > Open View > Outline. Use the Outline menu's Sort By > Name for alphabetical ordering.

The extension is private and is not published to the Marketplace.
