// const textInputs = document.querySelectorAll('input[type="text"]');

// textInputs.forEach(input => {
//     input.addEventListener('input', function() {
//         const inputValue = this.value;
//         const errorIcon = this.parentElement.querySelector('.error-icon');

//         if (/[^0-9]/.test(inputValue)) {
//             errorIcon.style.display = 'inline';
//         } else {
//             errorIcon.style.display = 'none';
//         }
//     });
// });

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});



// Get the input elements
const incomeInput = document.getElementById("income");
const extraIncomeInput = document.getElementById("income1");
const deductionsInput = document.getElementById("income3");
const ageInput = document.getElementById("income2");
// const submitButton = document.querySelector('.btn');

// Add event listener for input event
incomeInput.addEventListener("input", validateInput);
extraIncomeInput.addEventListener("input", validateInput);
deductionsInput.addEventListener("input", validateInput);
ageInput.addEventListener("input", validateInput);

// Function to validate input
function validateInput() {
  const incomeValue = incomeInput.value;
  const extraIncomeValue = extraIncomeInput.value;
  const deductionsValue = deductionsInput.value;
  const ageValue = ageInput.value;

  // Check if input values are valid numbers
  const isValidIncome = isValidNumber(incomeValue);
  const isValidExtraIncome = isValidNumber(extraIncomeValue);
  const isValidDeductions = isValidNumber(deductionsValue);
  const isValidAge = isValidNumber(ageValue);

  // Show or hide error icon based on input validity
  showErrorIcon(incomeInput, !isValidIncome);
  showErrorIcon(extraIncomeInput, !isValidExtraIncome);
  showErrorIcon(deductionsInput, !isValidDeductions);
  showErrorIcon(ageInput, !isValidAge);

  // Calculate tax if all inputs are valid
  if (isValidIncome && isValidExtraIncome && isValidDeductions && isValidAge) {
    calculateTax();
  }
}

// Function to validate input value as a number
function isValidNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Function to show or hide error icon
function showErrorIcon(inputElement, showError) {
  const errorIcon = inputElement.parentElement.querySelector(".error-icon");
  errorIcon.style.display = showError ? "block" : "none";
}

// Function to calculate tax
function calculateTax() {
  const grossAnnualIncome = parseFloat(incomeInput.value) || 0;
  const extraIncome = parseFloat(extraIncomeInput.value) || 0;
  const deductions = parseFloat(deductionsInput.value) || 0;
  const age = parseInt(ageInput.value) || 0;

  // Calculate overall income after deductions
  const overallIncome = grossAnnualIncome + extraIncome - deductions;

  // Determine tax based on age and overall income
  let tax = 0;
  if (overallIncome > 800000) {
    if (age < 40) {
      tax = 0.3 * (overallIncome - 800000);
    } else if (age >= 40 && age < 60) {
      tax = 0.4 * (overallIncome - 800000);
    } else {
      tax = 0.1 * (overallIncome - 800000);
    }
  }
  console.log("Tax:", tax.toFixed(2)); // You can replace console.log with code to display the tax on the UI

  return { 0:tax, 1:overallIncome };
  // Display the calculated tax
}

// Get the submit button
const submitButton = document.querySelector(".btn");

// Add event listener for click event on the submit button
submitButton.addEventListener("click", function () {
  // First, validate input
  validateInput();

  // Then, calculate tax
  const tax1 = calculateTax();
  const tax= tax1[1] - tax1[0];
  console.log("Tax:", tax);
  // Display the calculated tax in the results box
  document.getElementById(
    "taxResult"
  ).innerHTML = `<h2>Your Overall Income Will Be</h2><br/><h3> &#x20b9; ${tax}</h3><br/><h4>after Tax Deductions</h4>`;
  console.log("Tax:", tax);
  document.getElementById("resultsBox").style.display = "block";
});

// Close button functionality
document.getElementById("closeButton").addEventListener("click", function () {
  document.getElementById("resultsBox").style.display = "none";
});

// Add event listener for submit button
// submitButton.addEventListener('click', validateInput);
