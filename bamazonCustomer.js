var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({

  host: "localhost",
  port: 3306,
  user: "root",
  password: "Hazel1995!",
  database: "bamazon"
})

function listProducts() {
  querySongs = "SELECT * FROM products";

  connection.query(querySongs, function (err, data){
    if (err)
      return console.log(err);
    console.log("Welcome to Bamazon! Please view our inventory!")  
    
    for (i=0; i < data.length; i++) {
      console.log(`Product SKU: ${data[i].item_id} | Product Name: ${data[i].product_name} | Department: ${data[i].department_name} | Price: $${data[i].price} | Number in Stock: ${data[i].stock_quantity}`)
    }
      
      inquireCustomer();
  });
   
}

function inquireCustomer() {
  var questions = [
    {
      type: "input",
      name: "purchase.sku",
      message: "What is the SKU of the Item you would like to purchase?",
      validate: function(value) {
        if (value <= 10)
          return true;
      },
    },
    {
      type:"input",
      name: "purchase.quantity",
      message: "How many would you like to purchase?"
    }
  ];

  inquirer.prompt(questions).then(answers=> {
    var purchaseId = answers.purchase.sku;
    var purchaseQuantity = answers.purchase.quantity;

    let query = connection.query("SELECT * FROM products WHERE ?", {
      item_id: purchaseId
    }, function (err, data) {
      if (err) throw err;

      var itemInfo = data[0];

      if (purchaseQuantity <= itemInfo.stock_quantity) {
        console.log("Thanks for your purchase!");

        var updateInventory = "UPDATE products SET ? where ?"

        connection.query(updateInventory, [{
          stock_quantity: itemInfo.stock_quantity - purchaseQuantity
        },
        {
          item_id: purchaseId
        }
      ], function (err, data) {
        if (err) throw err
        console.log("Enjoy your purchase. Your total is $" + (itemInfo.price * purchaseQuantity).toFixed(2));
        console.log(`
        
        Would you like to make another purchase?
      
      `)
      })
      } else {
        console.log("Insufficient Quantity!")
      }
      listProducts();
      

    })

  })
};

listProducts();
