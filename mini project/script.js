const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
const themeButton = document.getElementById('toggle-theme');
const body = document.body;

// ✅ Append value to display
function append(value) {
    display.value += value;
}

// ✅ Clear the display
function clearDisplay() {
    display.value = '';
}

// ✅ Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// ✅ Calculate and add to history
function calculate() {
    try {
        const expression = display.value;
        const result = eval(expression);
        display.value = result;

        const timestamp = new Date().toLocaleTimeString();
        addToHistory(`${expression} = ${result} (${timestamp})`);

    } catch {
        alert('Invalid expression');
        display.value = '';
    }
}

// ✅ Percentage Calculation
function percentage() {
    try {
        display.value = eval(display.value) / 100;
        addToHistory(`${display.value * 100}% = ${display.value}`);
    } catch {
        alert('Invalid expression');
        display.value = '';
    }
}

// ✅ Add calculation to history
function addToHistory(entry) {
    const li = document.createElement('li');
    li.textContent = entry;

    // Copy to clipboard on click
    li.onclick = () => {
        navigator.clipboard.writeText(li.textContent);
        alert('Copied to clipboard: ' + li.textContent);
    };

    historyList.appendChild(li);
}

// ✅ Clear History
function clearHistory() {
    historyList.innerHTML = '';  // Removes all history items
}

// ✅ Dark Mode Toggle
themeButton.addEventListener('click', () => {
    body.classList.toggle('dark');
    themeButton.textContent = body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// ✅ Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || ['+', '-', '*', '/'].includes(e.key)) {
        append(e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});
