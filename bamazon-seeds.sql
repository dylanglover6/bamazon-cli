DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(255) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)

);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	("Giant Teddy Bear", "Toys", 50, 130),
	("World's Fastest RC Car", "Toys", 100, 95),
    ("Fully Functional Grappling Hook", "Toys", 150, 40),
    ("Replica Knight Platebody Armor", "Toys", 250, 25),
    ("Sugarfree Gummy Bears", "Candy", 5, 300),
    ("Cheeseburger Flavored Gum", "Candy", 7, 280),
    ("Full House Season 3", "Movies", 25, 150),
    ("Troll 2", "Movies", 50, 80),
    ("80 Foot Long Garden Hose", "Household", 80, 80),
    ("Finely Sharpened Katana", "Household", 200, 50)

