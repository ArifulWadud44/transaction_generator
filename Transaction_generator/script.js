const numTransactions = 100;

const categories = {
  "Groceries": { stores: ["Walmart", "Costco"], maxSpending: 1000 },
  "Utilities": { stores: ["HydroOne", "TorontoHydro", "Bell Wifi","Rogers Wifi","FreedomMobile"], maxSpending: 400 },
  "CreditCard Bills": {stores:["CapitalOne","TriangleMastercard","RBC Credit Card","BMO Cashback"], maxSpending: 3800},
  "Subscriptions": { stores: ["Netflix", "Spotify", "Amazon Prime","HBO Max","ESPN+"], maxSpending: 25 },
  "Entertainment": { stores: ["Cineplex", "LittleCanada", "Wonderland","FootballMatch","Baseball"], maxSpending: 300 },
  "Transport": { stores: ["Uber", "Lyft", "Gas"], maxSpending: 150 },
  "Healthcare": { stores: ["Pharmacy", "Doctor's Office"], maxSpending: 4000 },
  "Dining": { stores: ["McDonald's", "Burger King", "Subway","KFC","Steakhouse","Oswmows"], maxSpending: 300 },
  "Shopping": { stores: ["Nike", "Adidas", "Best Buy"], maxSpending: 2000 },
  "Others": { stores: ["Miscellaneous"], maxSpending: 1000 }
};

const transactions = [];
let currentBalance = Math.random() * 10000; // Random initial balance

for (let i = 0; i < numTransactions; i++) {
  const transactionNumber = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  const date = new Date(new Date('2023-03-01').getTime() + Math.random() * (new Date('2023-06-30').getTime() - new Date('2023-03-01').getTime()));
  let transactionName, amountSpent, amountCredited, category1;

  if (i % 2 === 0) {
    // Spending transaction
    const randomCategory = getRandomCategory();
    transactionName = getRandomStoreName(randomCategory);
    amountSpent = Math.random() * categories[randomCategory].maxSpending;
    amountCredited = 0;

    // Adjust the spending transaction if it would result in a negative balance
    if (amountSpent > currentBalance) {
      amountSpent = currentBalance;
    }
    currentBalance -= amountSpent;

    category1 = randomCategory;
  } else {
    // Crediting transaction
    transactionName = "Credit";
    amountSpent = 0;
    amountCredited = Math.random() * 1000;
    currentBalance += amountCredited;

    category1 = "Credit";
  }

  const transaction = {
    "Transaction Number": transactionNumber,
    "Date": date.toISOString().split('T')[0],
    "Transaction Name": transactionName,
    "Amount Spent": amountSpent.toFixed(2),
    "Amount Credited": amountCredited.toFixed(2),
    "Current Balance": currentBalance.toFixed(2),
    "Category 1": category1,
    "Category 2": "",
    "Category 3": ""
  };

  transactions.push(transaction);
}

console.log(transactions);

// Function to get a random category
function getRandomCategory() {
  const categoryKeys = Object.keys(categories);
  const randomIndex = Math.floor(Math.random() * categoryKeys.length);
  return categoryKeys[randomIndex];
}

// Function to get a random store name from a given category
function getRandomStoreName(category) {
  const storeNames = categories[category].stores;
  const randomIndex = Math.floor(Math.random() * storeNames.length);
  return storeNames[randomIndex];
}

// Function to get the category


// Add event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  const transactionTable = document.getElementById("transactionTable");

  transactions.forEach(transaction => {
    const row = transactionTable.insertRow();
    Object.values(transaction).forEach(value => {
      const cell = row.insertCell();
      cell.textContent = value;
    });
  });
});

