
let accounts = [
    
];

let checkingBalance = 0;
let savingsBalance = 0;

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
    addAccount(userinput, passinput, 0, 0);
    window.location.href = "login.html";
}

function addAccount(username, password, checkingBalance, savingsBalance){
    const temp_account = {
        username: username,
        password: password,
        checkingbalance: checkingBalance,
        savingsbalance: savingsBalance
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
//Functions involving transactions within the account
//
function checkCheckingBalance(accNum){
    alert("Your current balance is $" + accounts[accNum].checkingBalance);
    return;
}
function checkSavingsBalance(accNum){
    alert("Your current balance is $" + accounts[accNum].savingsBalance);
    return;
}
function depositChecking(accNum, amount){
    if(amount >= 0.00 && Number(amount) == amount) {
        accounts[accNum].checkingBalance += amount;
        alert("Operation successful.");
        return;
    }
    alert("Invalid operation: type error or invalid amount entered.");
}
function withdrawalChecking(accNum, amount){
    if(amount >= 0.00 && Number(amount) == amount && amount <= checkingBalance) {
        accounts[accNum].checkingBalance -= amount;
        alert("Operation successful.");
        return;
    }
    alert("Invalid operation: type error or invalid amount entered.");
}
function depositSavings(accNum, amount){
    if(amount >= 0.00 && Number(amount) == amount) {
        accounts[accNum].savingsBalance += amount;
        alert("Operation successful.");
        return;
    }
    alert("Invalid operation: type error or invalid amount entered.");
}
function withdrawalSavings(accNum, amount){
    if(amount >= 0.00 && Number(amount) == amount && amount <= savingsBalance) {
        accounts[accNum].savingsBalance -= amount;
        alert("Operation successful.");
        return;
    }
    alert("Invalid operation: type error or invalid amount entered.");
}
