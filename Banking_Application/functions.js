
// A account variable is initialized for later use.
const accounts = {
};
let loggedAccount = null;
// Once a page is loaded, all the session stored values, (which are the stored accounts), are brought back into a list variable.
window.onload = function() {
    releaseStorage(); 
};
//
//
//
// Functions which allow an account to be analyzed and stored
//
//
//
function interpretLogin(event) {
    // First release all the stored accounts, so that we can interpret who is logging in.
    releaseStorage(); 
    event.preventDefault();
    // Gather the user name and password from the login pages text fields, and add the text into the variables username and password.
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // Find a account which matches the given username and put it into the account variable.
    const account = accounts[username];
    // a statement which sees if there is a account which matches both the username and password. If yes, then configure the seesion storage to have a loggedinuser section for later use. Then relocate to the account page. If the account was not found, a error message will be given to the user.
    if (account && account.password === password) {
        loggedAccount = account; 
        // Store the account into the session storage.
        localStorage.setItem("loggedInUser", username);
        alert("Login successful");
        // Move to the account page.
        window.location.href = "account.html";
    } else {
        alert("You entered an incorrect username or password. Try again.");
    }
}

function interpretSignUp(event){
    event.preventDefault();
    // Gather the user name and password from the sign up pages text fields, and add the text into the variables username and password.
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // If a account dosent already exist in storage, create a account with the username and password given. If a account already does exist, give a error message to the user.
    if(!accounts[username]) {
        // new account created.
        accounts[username] = new Account(username, password);
        // Store the new account in the session storage.
        storeAccounts();
        alert("Account created successfully.");
        // Move to the login page
        window.location.href = "login.html";
    }
    else {
        alert("An account already exists by that username. Try again.")
        return;
    }
}

// A function which stores the account list variable into the session storage.
function storeAccounts(){
    localStorage.setItem('VaultAccounts', JSON.stringify(accounts));
}

// A function which gets all the variables from the session storage.
function releaseStorage() {
    // Get the contents from the session storage labeled VaultAccounts which are all the accounts registered with the bank.
    const storedAccounts = JSON.parse(localStorage.getItem('VaultAccounts')) || {};
    // A loop which iterates through all the account usernames and puts all there account details in their corresponding variables.
    for (let username in storedAccounts) {
        const storedAccount = storedAccounts[username];
        const account = new Account(username, storedAccount.password);
        account.checkingBalance = storedAccount.checkingBalance || 0;
        account.savingsBalance = storedAccount.savingsBalance || 0;
        accounts[username] = account;
    }
    // Obtain the current user's account and also add it to the account list variable.
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (loggedInUsername && accounts[loggedInUsername]) {
        loggedAccount = accounts[loggedInUsername];
    }
}
//
//
//
//The Account class
//
//
//
class Account {
    // By default, a account starts with zero dollars in both checking and savings account.
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.checkingBalance = 0;
        this.savingsBalance = 0;
    }
    // A function which prints out the current checking balance of the user.
    checkCheckingBalance() {
        const balance = this.checkingBalance ?? 0;
        alert("Your current checking balance is $" + balance.toFixed(2));
    }
    // A function which prints out the current savings balance of the user.
    checkSavingsBalance() {
        const balance = this.savingsBalance ?? 0;
        alert("Your current savings balance is $" + balance.toFixed(2));
    }
    // A function which handles putting money into the checking account.
    depositChecking(amount) {
        // parse the string value from the text box into a float number.
        amount = parseFloat(amount);
        // Making sure that the value given is in the realm of reason. Then add that value to the users checking account.
        if (amount >= 0.00 && !isNaN(amount)) {
            this.checkingBalance += amount;
            alert("Operation successful.");
            return;
        }
        // If the user did put a unreasonable number like for instance a negative number, return a error message.
        alert("Invalid operation: type error or invalid amount entered.");
    }
    // A function which handles taking money from the checking account.
    withdrawalChecking(amount) {
        // parse the string value from the text box into a float number.
        amount = parseFloat(amount);
        // Checking to see if the given amount is within reason and also within the range of the users checking balance.
        if (amount >= 0.00 && !isNaN(amount) && amount <= this.checkingBalance) {
            this.checkingBalance -= amount;
            alert("Operation successful.");
            return;
        }
        // If the user did put a unreasonable number or a value thats more than there balance, return a error message.
        alert("Invalid operation: insufficient funds, type error, or invalid amount entered.");
    }
    // A function which handles putting money into the savings account.
    depositSavings(amount) {
        // parse the string value from the text box into a float number.
        amount = parseFloat(amount);
        // Making sure that the value given is in the realm of reason. Then add that value to the users savings account.
        if (amount >= 0.00 && !isNaN(amount)) {
            this.savingsBalance += amount;
            alert("Operation successful");
            return;
        }
        // If the user did put a unreasonable number like for instance a negative number, return a error message.
        alert("Invalid operation: type error or invalid amount entered.");
    }
    // A function which handles taking money from the savings account.
    withdrawalSavings(amount) {
        // parse the string value from the text box into a float number.
        amount = parseFloat(amount);
        // Checking to see if the given amount is within reason and also within the range of the users savings balance.
        if (amount >= 0.00 && !isNaN(amount) && amount <= this.savingsBalance) {
            this.savingsBalance -= amount;
            alert("Operation successful.");
            return;
        }
        // If the user did put a unreasonable number or a value thats more than there balance, return a error message.
        alert("Invalid operation: insufficient funds, type error, or invalid amount entered.");
    }
    // A function which handles the transfer of funds from one account to another, which in this case is checking to the savings account.
    checkingToSavings(amount) {
        // parse the string value from the text box into a float number.
        amount = parseFloat(amount);
        // Checking to see if the given amount is within reason and also within the range of the users checking balance.
        if(amount >= 0.00 && !isNaN(amount) && amount <= this.checkingBalance) {
            this.checkingBalance -= amount;
            this.savingsBalance += amount;
            alert("Operation successful.");
            return;
        }
        // If the user did put a unreasonable number or a value thats more than there balance, return a error message.
        alert("Invalid operation: insufficient funds, type error, or invalid amount entered.");
    }
    savingsToChecking(amount) {
        // parse the string value from the text box into a float number.
        amount = parseFloat(amount);
        // Checking to see if the given amount is within reason and also within the range of the users savings balance.
        if(amount >= 0.00 && !isNaN(amount) && amount <= this.savingsBalance) {
            this.savingsBalance -= amount;
            this.checkingBalance += amount;
            alert("Operation successful.");
            return;
        }
        // If the user did put a unreasonable number or a value thats more than there balance, return a error message.
        alert("Invalid operation: insufficient funds, type error, or invalid amount entered.");
    }
}
//
//
// 
//Functions to handle account operation submissions
//
//
//
function checkingToSavings() {
    event.preventDefault();
    const amountInput = document.getElementById("checkingToSavings");
    const amount = amountInput.value;
    if(loggedAccount) {
        loggedAccount.checkingToSavings(amount);
        saveAccount();
    }
}
function savingsToChecking() {
    event.preventDefault();
    const amountInput = document.getElementById("savingsToChecking");
    const amount = amountInput.value;
    if(loggedAccount) {
        loggedAccount.savingsToChecking(amount);
        saveAccount();
    }
}
// A function which checks to see if there is a user logged in.
function checkCheckingBalance() {
    if (loggedAccount) {
        loggedAccount.checkCheckingBalance();
    } else {
        alert("No account is currently logged in.");
    }
}
// A function which checks to see if there is a user logged in.
function checkSavingsBalance() {
    if (loggedAccount) {
        loggedAccount.checkSavingsBalance();
    } else {
        alert("No account is currently logged in.");
    }
}
// A function which gets a users input and transfers the money to the users checking balance.
function depositChecking(event) {
    event.preventDefault();
    // A variable which has the location of the text field of the deposit checking in the account page.
    const amountInput = document.getElementById("depositchecking");
    // The amount in question that is going to be transfered.
    const amount = amountInput.value;
    // EASTER EGG
    if(amount == 0) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    // If the there is a account active, transfer the funds and save the account in the session storage.
    if (loggedAccount) {
        loggedAccount.depositChecking(amount);
        saveAccount();
    }
    amountInput.value = "";
}
// A function which gets a users input and transfers the money to the users savings balance.
function depositSavings(event) {
    event.preventDefault();
    // A variable which has the location of the text field of the deposit savings in the account page.
    const amountInput = document.getElementById("depositsavings");
    // The amount in question that is going to be transfered.
    const amount = amountInput.value;
    // EASTER EGG
    if(amount == 0) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    // If the there is a account active, transfer the funds and save the account in the session storage.
    if (loggedAccount) {
        loggedAccount.depositSavings(amount);
        saveAccount();
    }
    amountInput.value = ""; 
}
// A function which gets a users input and takes the money from the users checking balance.
function withdrawalChecking(event) {
    event.preventDefault();
    // A variable which has the location of the text field of the withdraw checking in the account page.
    const amountInput = document.getElementById("withdrawalchecking");
    // The amount in question that is going to be transfered.
    const amount = amountInput.value;
    // EASTER EGG
    if(amount == 0) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
    // If the there is a account active, transfer the funds and save the account in the session storage.
    if (loggedAccount) {
        loggedAccount.withdrawalChecking(amount);
        saveAccount();
    }
    // EASTER EGG
    amountInput.value = ""; 
}
// A function which gets a users input and takes the money from the users savings balance.
function withdrawalSavings(event) {
    event.preventDefault();
    // A variable which has the location of the text field of the withdraw savings in the account page.
    const amountInput = document.getElementById("withdrawalsavings");
    // The amount in question that is going to be transfered.
    const amount = amountInput.value;
    // EASTER EGG
    if(amount == 0) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
     // If the there is a account active, transfer the funds and save the account in the session storage.
    if (loggedAccount) {
        loggedAccount.withdrawalSavings(amount);
        saveAccount();
    }
    // EASTER EGG
    amountInput.value = "";
}
// A function which handles logging out of the active users account back to the login page.
function logout() {
    // Making sure there is a active account.
    if (loggedAccount) {
        saveAccount();
    }
    // Remove the current user from the session storage.
    localStorage.removeItem('loggedInUser');
    loggedAccount = null;
    // Move to the login page.
    window.location.href = "login.html";
}
// A function which stores the current user into the session storage.
function saveAccount() {
    if (loggedAccount) {
        accounts[loggedAccount.username] = loggedAccount;
        storeAccounts();
    }
}
//
//
//
// API calls
//
//
//
async function getStockInfo(stock_name){
     try{
        // A variable is created which tries to obtain stock information based on the ticker from the parameter.
        const response = await fetch("https://api.polygon.io/v2/aggs/ticker/" + stock_name + "/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=ynz12GyWGUsmiJni91lapm5j5guVpf5i");
        // A alert just in case the call fails.
        if(!response.ok){
             alert("call did not go through")
        }
        // Since the api call returns a json string, we put the repsonse into another variable configured for the json string.
        const stocks = await response.json();
        return stocks;
     } catch(error){
        // A alert just in case the call fails.
        alert("call did not go through 2", error);
     }
       
}
async function getStockTickers(){
    try{
        // A variable which obtains a list of different ticker names from the api call.
        const response = await fetch("https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=ynz12GyWGUsmiJni91lapm5j5guVpf5i");
        // A alert just in case the call fails.
        if(!response.ok){
            alert("call did not go through")
        }
        // Since the api call returns a json string, we put the repsonse into another variable configured for the json string.
        const tickers = await response.json();
        return tickers;
    }catch(error){
        // A alert just in case the call fails.
        alert("call did not go through 2", error);
     }
}
async function getStockNews(){
    try{
        // A variable which obtains a array of different news articles.
        const response = await fetch("https://api.polygon.io/v2/reference/news?limit=10&apiKey=ynz12GyWGUsmiJni91lapm5j5guVpf5i");
        // A alert just in case the call fails.
        if(!response.ok){
            alert("call did not go through")
        }
        // Since the api call returns a json string, we put the repsonse into another variable configured for the json string.
        const tickers = await response.json();
        return tickers;
    }catch(error){
        // A alert just in case the call fails.
        alert("call did not go through 2", error);
     }
}
//
//
//
// Stock Graph
//
//
//
let chart;
document.addEventListener("DOMContentLoaded", function() {
    // A variable which gets the location of the chart element in the financial page and declaring that it will be a 2 dimentional graph.
    const ctx = document.getElementById('myChart').getContext('2d');
    // A eventlistener is created, which points to the button that says create graph on the financial page. This listener will activate once the button is clicked allowing the graph to be created.
    document.getElementById('create_graph').addEventListener('click', function() {
        // The stock ticker is gathered from a text box in the financial page and then proccessed in the printstock function which creates the graph with ticker data.
        const stockTicker = document.getElementById('stock_ticker').value;
        printStocks(stockTicker, ctx);
    })
    // The Ticker names are put into there two seperate boxes for display at the financial page.
    implementTickers();
    // The financial news articles are put at very bottom of the financial page.
    implementNews();
});
async function printStocks(stock_ticker, ctx){
    // A variable which waits for the api call of stocks to finish before gathering its data.
    const stocks = await getStockInfo(stock_ticker);
    // A variable which verifys that the api call did in fact return something, if it didnt a empty array is assigned to the variable.
    const results = stocks ? stocks.results : [];      
    // A variable which contains the different stock dates.
    const dates = results.map(item => new Date(item.t).toLocaleDateString());
    // A variable which contains the different stock prices.
    const prices = results.map(item => item.c);
    
    // If there is a chart already created, then delete it so that a new chart can be put in its place.
    if(chart){
        chart.destroy();
    }
    
    // A chart is created with all the stock information given from the api call.
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: stock_ticker + " Stock Price",
                data: prices,
                backgroundColor: "rgba(0, 255, 0, 1)",
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels:{
                        color: 'rgba(255, 255, 255, 1)'
                    }
                }
            },
            scales: {
                x: {
                    ticks:{
                        color: 'rgba(255, 255, 255, 1)'
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks:{
                        color: 'rgba(255, 255, 255, 1)'
                    }
                }
            }
        }
    });
}
//
//
//
// Stock Ticker Addition
//
//
//
async function implementTickers(){
    // A tracker varaiable is created to keep track of every iteration we go through within the ticker list. This is going to be used to split the data in half so that half go in one box, and the other half go in another.
    let tracker = 0;
    // A variable which waits for the stock ticker api call to finish where it will store the resulting contents
    const tickerlist = await getStockTickers();
    // A variable which checks to see if the previous variable recieved any call, if it did not then the variable is initialized to a empty array.
    const tickers = tickerlist ? tickerlist.results : []; 
    // A variable which holds the location in the financial page with a left side box for storing stock tickers.
    const ticker_nest = document.getElementById('ticker_nest');
    // A variable which holds the location in the financial page with a right side box for storing stock tickers.
    const ticker_nest2 = document.getElementById('ticker_nest2');

    // Iterate through the stock ticker array and append the ticker name into the corresponding financial page box
    tickers.forEach(singularticker => {
        // A variable to keep track of each iteration of the list so that half of the calls go in one box while the other half go in the other box.
        tracker += 1;
        // A variable which creates a list element which will store the ticker name information from the array.
        const list = document.createElement('li');
        // Adding the ticker name to the list variable.
        list.textContent = singularticker.ticker + ": " + singularticker.name;
        // Appending the list element to the respective box element in the financial page.
        if(tracker <= 50){
            ticker_nest.appendChild(list);
        }
        else{
            ticker_nest2.appendChild(list);
        }
    })
}
//
//
//
// Stock News Addition
//
//
//
async function implementNews(){
    // wait for the call of news to come from the api, then implement the news array into the newslist variable.
    const newslist = await getStockNews();
    // If the api fetch returns a error, return a empty list.
    const news = newslist ? newslist.results : []; 
    // A variable which stores the area in the html to put the news stories in.
    const news_nest = document.getElementById('news_nest');
    // A loop for every news story in the array, which will create a paragraph tag and put in all the contents of the news story into the paragraph tag. Then that paragraph will be appended into a already created list in the html on the financial page called news_nest. 
    news.forEach(singulararticle => {
        // A variable which creates a paragraph element
        const list = document.createElement('p');
        // The internal contents of the paragraph tag which includes all the contents of the news story
        list.innerHTML = '<p class="box">' + singulararticle.title + '<br>' + "Publisher:" +  singulararticle.publisher.name + '<br>' + "Author:" + singulararticle.author + '</br>' + "Link to Webpage:" + '<a href="' + singulararticle.article_url + '">' + "LINK" + '</a>' + '<br>' + '<img src="' + '<br>' + '</br>' + '</p>';
        // Then the paragraph tag is appended into the list element in the financial page
        news_nest.appendChild(list);
    })
}

