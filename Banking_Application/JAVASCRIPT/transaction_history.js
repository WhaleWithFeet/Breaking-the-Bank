window.onload = function() {
    
    // Load the accounts from localStorage
    let accounts = JSON.parse(localStorage.getItem('VaultAccounts')) || {};

    // Get the username of the logged-in user (for demonstration purposes, assuming 'boby' is logged in)
    // Retrieve the logged-in user's username from localStorage
    const username = localStorage.getItem('loggedInUser');
    
    // Check if the user is logged in

    const transactionTable = document.getElementById("transactionTable").getElementsByTagName('tbody')[0];

    if (accounts[username] && accounts[username].transactions && accounts[username].transactions.length > 0) {
        // Clear any existing rows in the table
        transactionTable.innerHTML = '';

        // Iterate over the transactions and display them
        accounts[username].transactions.forEach(transaction => {
            let row = transactionTable.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);

            cell1.textContent = transaction.transactionId;
            cell2.textContent = transaction.date;
            cell3.textContent = `$${transaction.amount.toFixed(2)}`;
            cell4.textContent = transaction.type;
            cell5.textContent = transaction.status;
            cell6.textContent = transaction.description;
        });
    } else {
        console.log("No transactions found.");
    }
};