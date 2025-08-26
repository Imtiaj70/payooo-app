 // Store the current balance
  let currentBalance = 45000;
  const correctPin = "1234"; // Default PIN for demo purposes
  
  // Get all section elements
  const sections = {
    addMoney: document.getElementById('add-money-parent'),
    cashOut: document.getElementById('Cashout-parent'),
    transferMoney: document.getElementById('Transfer-money'),
    bonus: document.getElementById('bonus-money'),
    billPay: document.getElementById('bill-pay'),
    history: document.getElementById('history-bill')
  };
  
  // Get all button elements
  const buttons = {
    addMoney: document.getElementById('add-button'),
    cashOut: document.getElementById('cash-out-button'),
    transferMoney: document.getElementById('money-transfer-btn'),
    bonus: document.getElementById('bonus-btn'),
    billPay: document.getElementById('bill-pay-btn'),
    history: document.getElementById('history-btn')
  };
  
  // Function to hide all sections
  function hideAllSections() {
    for (const key in sections) {
      sections[key].classList.remove('active-section');
    }
  }
  
  // Function to show a specific section
  function showSection(section) {
    hideAllSections();
    sections[section].classList.add('active-section');
  }
  
  // Add event listeners to all buttons
  buttons.addMoney.addEventListener('click', () => showSection('addMoney'));
  buttons.cashOut.addEventListener('click', () => showSection('cashOut'));
  buttons.transferMoney.addEventListener('click', () => showSection('transferMoney'));
  buttons.bonus.addEventListener('click', () => showSection('bonus'));
  buttons.billPay.addEventListener('click', () => showSection('billPay'));
  buttons.history.addEventListener('click', () => showSection('history'));
  
  // Add Money functionality
  document.getElementById('add-money-btn').addEventListener('click', function() {
    const amountInput = document.getElementById('add-amount-input');
    const pinInput = document.getElementById('add-pin');
    const amount = parseFloat(amountInput.value);
    
    // Validate inputs
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (pinInput.value !== correctPin) {
      alert('Incorrect PIN. Please try again.');
      return;
    }
    
    // Update balance
    currentBalance += amount;
    document.getElementById('available-balance').textContent = currentBalance;
    
    // Add to transaction history
    addTransaction('Money Added', amount);
    
    // Reset form
    amountInput.value = '';
    pinInput.value = '';
    
    alert(`Successfully added $${amount} to your account!`);
  });
  
  // Function to add transaction to history
  function addTransaction(type, amount) {
    const noTransactions = document.getElementById('no-transactions');
    const transactionList = document.getElementById('transaction-list');
    
    // Hide "no transactions" message if it's the first transaction
    if (noTransactions.style.display !== 'none') {
      noTransactions.style.display = 'none';
      transactionList.classList.remove('hidden');
    }
    
    // Create transaction element
    const transaction = document.createElement('div');
    transaction.className = 'transaction-item border-b py-2';
    transaction.innerHTML = `
      <div class="flex justify-between">
        <span class="font-semibold">${type}</span>
        <span class="${type === 'Money Added' ? 'text-green-600' : 'text-red-600'}">${type === 'Money Added' ? '+' : '-'}$${amount}</span>
      </div>
      <div class="text-sm text-gray-500">${new Date().toLocaleString()}</div>
    `;
    
    // Add to the top of the list
    transactionList.insertBefore(transaction, transactionList.firstChild);
  }
  
  // Initially hide all sections
  hideAllSections();