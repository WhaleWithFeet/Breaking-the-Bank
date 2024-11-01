
const accounts = {
};
let loggedAccount = null;
window.onload = function() {
    releaseStorage(); 
};
//
// Functions which allow an account to be analyzed and stored
//
function interperetLogin(event) {
    releaseStorage(); 
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const account = accounts[username];
    if (account && account.password === password) {
        loggedAccount = account; 
        localStorage.setItem("loggedInUser", username);
        alert("Login successful");
        window.location.href = "homepage.html";
    } else {
        alert("You entered an incorrect username or password. Try again.");
    }
}

function interperetSignUp(event){
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if(!accounts[username]) {
        accounts[username] = new Account(username, password);
        storeAccounts();
        alert("Account created successfully.");
        window.location.href = "login.html";
    }
    else {
        alert("An account already exists by that username. Try again.")
        return;
    }
}

function storeAccounts(){
    localStorage.setItem('VaultAccounts', JSON.stringify(accounts));
}
function releaseStorage() {
    const storedAccounts = JSON.parse(localStorage.getItem('VaultAccounts')) || {};
    for (let username in storedAccounts) {
        const storedAccount = storedAccounts[username];
        const account = new Account(username, storedAccount.password);
        account.checkingBalance = storedAccount.checkingBalance || 0;
        account.savingsBalance = storedAccount.savingsBalance || 0;
        accounts[username] = account;
    }
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (loggedInUsername && accounts[loggedInUsername]) {
        loggedAccount = accounts[loggedInUsername];
    }
}
//
//The Account class
//
class Account {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.checkingBalance = 0;
        this.savingsBalance = 0;
    }
    checkCheckingBalance() {
        const balance = this.checkingBalance ?? 0;
        alert("Your current checking balance is $" + balance.toFixed(2));
    }

    checkSavingsBalance() {
        const balance = this.savingsBalance ?? 0;
        alert("Your current savings balance is $" + balance.toFixed(2));
    }
    depositChecking(amount) {
        amount = parseFloat(amount);
        if (amount >= 0.00 && !isNaN(amount)) {
            this.checkingBalance += amount;
            alert("Operation successful.");
            return;
        }
        alert("Invalid operation: type error or invalid amount entered.");
    }
    withdrawalChecking(amount) {
        amount = parseFloat(amount);
        if (amount >= 0.00 && !isNaN(amount) && amount <= this.checkingBalance) {
            this.checkingBalance -= amount;
            alert("Operation successful.");
            return;
        }
            alert("Invalid operation: insufficient funds, type error, or invalid amount entered.");
    }
    depositSavings(amount) {
        amount = parseFloat(amount);
        if (amount >= 0.00 && !isNaN(amount)) {
            this.savingsBalance += amount;
            alert("Operation successful");
            return;
        }
            alert("Invalid operation: type error or invalid amount entered.");
    }
    withdrawalSavings(amount) {
        amount = parseFloat(amount);
        if (amount >= 0.00 && !isNaN(amount) && amount <= this.savingsBalance) {
            this.savingsBalance -= amount;
            alert("Operation successful.");
            return;
        }
        alert("Invalid operation: insufficient funds, type error, or invalid amount entered.");
    }
}

// 
//Functions to handle account operation submissions
//
function checkCheckingBalance() {
    if (loggedAccount) {
        loggedAccount.checkCheckingBalance();
    } else {
        alert("No account is currently logged in.");
    }
}
function checkSavingsBalance() {
    if (loggedAccount) {
        loggedAccount.checkSavingsBalance();
    } else {
        alert("No account is currently logged in.");
    }
}
function depositChecking(event) {
    event.preventDefault();
    const amountInput = document.getElementById("depositchecking");
    const amount = amountInput.value;
    if(amount == 0) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    if (loggedAccount) {
        loggedAccount.depositChecking(amount);
        saveAccount();
    }
    amountInput.value = "";
}
function depositSavings(event) {
    event.preventDefault();
    const amountInput = document.getElementById("depositsavings");
    const amount = amountInput.value;
    if(amount == 0) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    if (loggedAccount) {
        loggedAccount.depositSavings(amount);
        saveAccount();
    }
    amountInput.value = ""; 
}
function withdrawalChecking(event) {
    event.preventDefault();
    const amountInput = document.getElementById("withdrawalchecking");
    const amount = amountInput.value;
    if(amount == 0) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    if (loggedAccount) {
        loggedAccount.withdrawalChecking(amount);
        saveAccount();
    }
    if(amount >= loggedAccount.checkingBalance) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    amountInput.value = ""; 
}
function withdrawalSavings(event) {
    event.preventDefault();
    const amountInput = document.getElementById("withdrawalsavings");
    const amount = amountInput.value;
    if(amount == 0) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    if (loggedAccount) {
        loggedAccount.withdrawalSavings(amount);
        saveAccount();
    }
    if(amount >= loggedAccount.checkingBalance) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    amountInput.value = "";
}
function logout() {
    if (loggedAccount) {
        saveAccount();
    }
    localStorage.removeItem('loggedInUser');
    loggedAccount = null;
    window.location.href = "login.html";
}
function saveAccount() {
    if (loggedAccount) {
        accounts[loggedAccount.username] = loggedAccount;
        storeAccounts();
    }
}
//
// API calls
//
async function getStockInfo(){
    try{
        const response = await fetch('https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=ynz12GyWGUsmiJni91lapm5j5guVpf5i');
        if(!response.ok){
            alert("call did not go through")
        }
        const stocks = await response.json();
        return stocks;
    } catch(error){
        alert("call did not go through 2", error);
    }
   
}
//
// Stock Graph
//
document.addEventListener("DOMContentLoaded", function() {
    window.ctx = document.getElementById('myChart').getContext('2d');
    printStocks();
});

async function printStocks(){
    const stocks = await getStockInfo();
    const results = stocks ? stocks.results : [];      // Array of daily stock data
    
    const dates = results.map(item => new Date(item.t).toLocaleDateString());
    const prices = results.map(item => item.c);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: "AAPL Stock Price",
                data: prices,
                backgroundColor: "rgba(10, 20, 30, .2)",
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
