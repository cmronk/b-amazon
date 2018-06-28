DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;
CREATE TABLE products (
	item_id INT NOT NULL,
	product_name VARCHAR(45) NULL,
	department_name VARCHAR(45) NULL,
	price DECIMAL (10, 2) NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (01, "How-to pet a cat DVD", "Self-improvement", 9.99, 75);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (02, "Programming for Dummies", "Technology", 29.99, 40);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (03, "Used MacBooks", "Technology", 899.95, 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (04, "iPhone 20 Crystal Case", "Future", 49, 15);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (05, "XL 'I can haz cheezeburger' Tee", "Clothing", 30, 20);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (06, "Surfboard", "Sports Equipment", 400, 7);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (07, "Holographic Rubik's Cube", "Toys", 19.99, 30);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (08, "Short-shorts", "Clothing", 29, 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (09, "Grass Scented Bath Bombs", "Health and Beauty", 5.99, 60);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "A Single Grain of Rice", "Food", 0.01, 100000000);


SELECT * FROM products