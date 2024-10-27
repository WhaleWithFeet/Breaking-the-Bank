
let accounts = [
    
];

window.onload = function() {
    releaseStorage(); 
};
//
// Functions which allow an account to be analyzed and stored
//
function interperetLogin(event){
    releaseStorage(); 
    
    event.preventDefault();
    
    let userinput = document.getElementById("username").value;
    let passinput = document.getElementById("password").value;
    for(let i = 0; i < accounts.length;i++){
        if((userinput === accounts[i].username) && (passinput === accounts[i].password) && (passinput !== "") && (userinput !== "")){
            window.location.href = "homepage.html";
            return;
        }
    }

    alert("You put in a username or password which is not in our database. Try again.");

}

function interperetSignUp(event){

    event.preventDefault();
    
    let userinput = document.getElementById("username").value;
    let passinput = document.getElementById("password").value;
    for(let i = 0; i < accounts.length;i++){
        if((userinput === accounts[i].username) && (passinput === accounts[i].password)){
            alert("Someone already has that username, try again");
            return;
        }
    }
    addAccount(userinput, passinput);
    window.location.href = "login.html";
}

function addAccount(username, password){
    const temp_account = {
        username: username,
        password: password,
    };
    accounts.push(temp_account);
    storeAccounts();
}

function storeAccounts(){
    localStorage.setItem('VaultAccounts', JSON.stringify(accounts));
}
function releaseStorage(){
    let temp_account = JSON.parse(localStorage.getItem('VaultAccounts')) || [];
    for(let i = 0; i < temp_account.length;i++){
        accounts.push(temp_account[i]);
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
        alert("Your current checking balance is $" + this.checkingBalance.toFixed(2));
    }
    checkSavingsBalance() {
        alert("Your current savings balance is $" + this.savingsBalance.toFixed(2));
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
//Test instance of an account class
//
const myAccount = new Account("kh", "pass");

// 
//Functions to handle account operation submissions
//
function checkCheckingBalance() {
    myAccount.checkCheckingBalance();
}

function checkSavingsBalance() {
    myAccount.checkSavingsBalance();
}
function depositChecking(event) {
    event.preventDefault();
    const amountInput = document.getElementById("depositchecking");
    const amount = amountInput.value;
    myAccount.depositChecking(amount);
    amountInput.value = "";
}
function depositSavings(event) {
    event.preventDefault();
    const amountInput = document.getElementById("depositsavings");
    const amount = amountInput.value;
    myAccount.depositSavings(amount);
    amountInput.value = ""; 
}
function withdrawalChecking(event) {
    event.preventDefault();
    const amountInput = document.getElementById("withdrawalchecking");
    const amount = amountInput.value;
    myAccount.withdrawalChecking(amount);
    amountInput.value = ""; 
}
function withdrawalSavings(event) {
    event.preventDefault();
    const amountInput = document.getElementById("withdrawalsavings");
    const amount = amountInput.value;
    myAccount.withdrawalSavings(amount);
    amountInput.value = "";
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