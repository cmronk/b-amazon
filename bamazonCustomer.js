var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

console.log("Welcome to BAMAZON! See our current list of products below.  Choose items by Item ID.  Happy shopping!")
function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["ID", "Description", "Department", "Price"],
            colWidths: [5, 35, 20, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price]);
        }
        console.log(table.toString());

        shoppingCart();

    });
};

function shoppingCart() {
    inquirer.prompt([
        {
            type: "list",
            name: "itemID",
            message: "What would you like to purchase? (Use Item ID to select.)",
            choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        },
        {
            type: "input",
            name: "quantityRequested",
            message: "How many would you like sir???"
        }

    ]).then(function (userAnswers) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // checks to see if quantity is in stock.  using -1 to get correct index
            if (userAnswers.quantityRequested < res[(userAnswers.itemID) - 1].stock_quantity) {
                console.log("You have purchased " + userAnswers.quantityRequested + " of " + userAnswers.itemID + ".");
                // calculates total plus taxes
                console.log("Your total is $" + ((userAnswers.quantityRequested * res[(userAnswers.itemID) - 1].price) * 0.0825 + (userAnswers.quantityRequested * res[(userAnswers.itemID) - 1].price)).toFixed(2) + ".");
                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (res[(userAnswers.itemID) - 1].stock_quantity) - userAnswers.quantityRequested
                        },
                        {
                            item_id: userAnswers.itemID
                        }
                    ],
                );
                // "SELECT * FROM products"
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    query.sql;
                });

                endShopping();
            } else {
                console.log("Sorry, we do not have the selected quantity in stock.  Please try another item or less of your chosen item.");
                endShopping();
            }
        })
    });
};

connection.connect(function (err) {
    if (err) throw err;
    displayItems();
});

function endShopping() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "quit",
            message: "Would you like to continue shopping?"
        }
    ]).then(function (userAnswer) {
        if (userAnswer.quit === true) {
            shoppingCart();
        } else {
            connection.end();
        }
    })
};

