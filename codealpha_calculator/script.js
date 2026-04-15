const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const modeEl = document.getElementById('mode');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

let expression = '';
let result = '';
let ans = 0;
let degMode = true;

const HISTORY_KEY = 'calculator_history';

function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}

function saveHistoryItem(exp, res) {
  const history = getHistory();
  history.unshift({ exp, res, time: new Date().toLocaleString() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
  renderHistory();
}

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = history.length
    ? history.map(item => `
      <div class="history-item">
        <div class="history-exp">${item.exp}</div>
        <div class="history-res">${item.res}</div>
      </div>
    `).join('')
    : '<div class="history-item"><div class="history-exp">No history yet</div></div>';
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function show() {
  expressionEl.textContent = expression || '0';
  resultEl.textContent = result;
  modeEl.textContent = degMode ? 'Degree Mode' : 'Radian Mode';
}

function append(val) {
  expression += val;
  livePreview();
  show();
}

function clearAll() {
  expression = '';
  result = '';
  show();
}

function backspace() {
  expression = expression.slice(0, -1);
  livePreview();
  show();
}

function factorial(n) {
  n = Math.floor(Number(n));
  if (!Number.isFinite(n) || n < 0 || n > 170) return NaN;
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

function preprocess(expr) {
  return expr
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('^', '**')
    .replaceAll('π', 'Math.PI')
    .replaceAll('Ans', `(${ans})`)
    .replace(/(\d+(\.\d+)?)!/g, 'factorial($1)')
    .replace(/(\))!/g, 'factorial($1)')
    .replace(/(\d+(\.\d+)?)%/g, '($1/100)');
}

function evaluateExpression(expr) {
  if (!expr) return '';
  let e = preprocess(expr);
  e = e
    .replace(/sin\(/g, `Math.sin(`)
    .replace(/cos\(/g, `Math.cos(`)
    .replace(/tan\(/g, `Math.tan(`)
    .replace(/log\(/g, `Math.log10(`)
    .replace(/ln\(/g, `Math.log(`)
    .replace(/sqrt\(/g, `Math.sqrt(`)
    .replace(/cbrt\(/g, `Math.cbrt(`)
    .replace(/inv\(([^)]+)\)/g, `(1/($1))`);
  e = e.replace(/Math\.sin\(([^)]+)\)/g, `Math.sin(${degMode ? '($1*Math.PI/180)' : '$1'})`);
  e = e.replace(/Math\.cos\(([^)]+)\)/g, `Math.cos(${degMode ? '($1*Math.PI/180)' : '$1'})`);
  e = e.replace(/Math\.tan\(([^)]+)\)/g, `Math.tan(${degMode ? '($1*Math.PI/180)' : '$1'})`);
  return Function('factorial', `return (${e})`)(factorial);
}

function livePreview() {
  try {
    if (!expression) { result = ''; return; }
    const val = evaluateExpression(expression);
    if (val === undefined || Number.isNaN(val)) {
      result = 'Error';
    } else {
      result = String(Number.isInteger(val) ? val : parseFloat(val.toFixed(10)));
    }
  } catch {
    result = 'Error';
  }
}

function equals() {
  try {
    const currentExp = expression;
    const val = evaluateExpression(expression);
    if (val === undefined || Number.isNaN(val) || !Number.isFinite(val)) {
      result = 'Error';
      show();
      return;
    }
    ans = val;
    const finalResult = String(Number.isInteger(val) ? val : parseFloat(val.toFixed(10)));
    saveHistoryItem(currentExp, finalResult);
    expression = finalResult;
    result = '';
  } catch {
    result = 'Error';
  }
  show();
}

function percent() { append('%'); }
function toggleDeg() { degMode = !degMode; livePreview(); show(); }
function copyResult() {
  const text = result || expression || '0';
  navigator.clipboard.writeText(text);
}

document.querySelector('.keys').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const value = btn.dataset.value;
  const action = btn.dataset.action;
  const fn = btn.dataset.fn;

  if (value) append(value);
  else if (action === 'clear') clearAll();
  else if (action === 'delete') backspace();
  else if (action === 'equals') equals();
  else if (action === 'percent') percent();
  else if (action === 'toggleDeg') toggleDeg();
  else if (action === 'copy') copyResult();
  else if (fn === 'sqrt') append('sqrt(');
  else if (fn === 'cbrt') append('cbrt(');
  else if (fn === 'square') append('^2');
  else if (fn === 'cube') append('^3');
  else if (fn === 'sin') append('sin(');
  else if (fn === 'cos') append('cos(');
  else if (fn === 'tan') append('tan(');
  else if (fn === 'log') append('log(');
  else if (fn === 'ln') append('ln(');
  else if (fn === 'pi') append('π');
  else if (fn === 'e') append(String(Math.E));
  else if (fn === 'fact') append('!');
  else if (fn === 'inv') append('inv(');
  else if (fn === 'ans') append('Ans');
});

clearHistoryBtn.addEventListener('click', clearHistory);

document.addEventListener('keydown', (e) => {
  const k = e.key;
  if (/[\d.()+\-*/^%]/.test(k)) append(k);
  else if (k === 'Enter') {
    e.preventDefault();
    equals();
  } else if (k === 'Backspace') {
    backspace();
  } else if (k === 'Escape') {
    clearAll();
  }
});

show();
renderHistory();
