-- Sample Databricks SQL script demonstrating table declarations recognized by the Outline view

CREATE TABLE IF NOT EXISTS main.sales.customers (
	customer_id BIGINT,
	first_name STRING,
	last_name STRING,
	email STRING,
	created_at TIMESTAMP
);

CREATE TABLE main.sales.orders (
	order_id BIGINT,
	customer_id BIGINT,
	order_date DATE,
	total_amount DECIMAL(10, 2)
);

CREATE OR REPLACE TABLE main.sales.order_items (
	order_item_id BIGINT,
	order_id BIGINT,
	product_id BIGINT,
	quantity INT,
	unit_price DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS `main`.`inventory`.`products` (
	product_id BIGINT,
	product_name STRING,
	category STRING,
	unit_price DECIMAL(10, 2)
);
