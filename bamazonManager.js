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

console.log("Welcome to middle management.  Here are your options.")
function askManager() {
    inquirer.prompt([
        {
            type: "list",
            name: "managerChoices",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (choices) {
        switch (choices.managerChoices) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                newProducts();
                break;
        }
    });
};


function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("You've chosen to view available products.");
        var table = new Table({
            head: ["ID", "Description", "Department", "Price", "Quantity in stock"],
            colWidths: [5, 35, 20, 10, 20]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        endManagementView();
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("These items have less than 10 in stock.");
        var table = new Table({
            head: ["ID", "Description", "Department", "Price", "Quantity in stock"],
            colWidths: [5, 35, 20, 10, 20]
        });
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 10) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
            }
        }
        console.log(table.toString());
        endManagementView();

    });
};

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "updatedItems",
            message: "What item would you like to order more of?",
        },
        {
            type: "input",
            name: "orderedQuantity",
            message: "How many would you like to order (or reorder)?"
        }
    ]).then(function (addingItems) {
        var id = addingItems.updatedItems;
        var quantity = addingItems.orderedQuantity;
        connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    // need to fix this so it adds
                    stock_quantity: quantity
                },
                {                    
                    item_id: id
                }
            ],
            function (err, res) {
                if (err) throw err;
                endManagementView();
            }
        );
    });
};

function newProducts() {
    inquirer.prompt([
        {
            type: "input",
            name: "newItems",
            message: "What would you like to add to our inventory?"
        },
        {
            type: "input",
            name: "department",
            message: "What is this classified as?"
        },
        {
            type: "input",
            name: "newPrice",
            message: "How much is this item?"
        },
        {
            type: "input",
            name: "newQuantity",
            message: "How many would you like to order?"
        }
    ]).then(function (managerAnswers) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: managerAnswers.newItems,
                department_name: managerAnswers.department,
                price: managerAnswers.newPrice,
                stock_quantity: managerAnswers.newQuantity
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows);
                endManagementView();
            }
        );
    });
};

function endManagementView() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "quit",
            message: "Would you like to continue inventory management?"
        }
    ]).then(function (userAnswer) {
        if (userAnswer.quit === true) {
            askManager();
        } else {
            connection.end();
        }
    })
};

connection.connect(function (err) {
    if (err) throw err;
    askManager();
});
