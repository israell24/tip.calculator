const bill_amount = document.querySelector('.bill-amount')
const num_of_people = document.querySelector('.num-of-people')
const tip_per_person = document.querySelector(".tip-per-person");
const total_per_person = document.querySelector(".total-per-person");

// Tip buttons and custom input
const tipButtons = document.querySelectorAll(".select-btn button");
const customTipInput = document.querySelector(".custom-input");

let selectedTipPercentage = 0;
let timer = null;




// Function to handle validation
const validateForm =()=>{
    let isValid = true;
    const people_err = document.querySelector('.people-err')
    const bill_err = document.querySelector('.bill-err')
    const inputs = document.querySelectorAll('input')
    const errors = document.querySelectorAll('.error')

    // clear inputs and errors  if inputs are present
    inputs.forEach((input)=> input.classList.remove('invalid'))
    errors.forEach((error)=> error.textContent='');


      // Validate bill amount
      if (bill_amount.value === "") {
        bill_err.textContent = "This field is required";
        bill_amount.classList.add("invalid");
        isValid = false;
      } else if (isNaN(bill_amount.value) || bill_amount.value == 0) {
        bill_err.textContent = "Must be a valid number";
        bill_amount.classList.add("invalid");
        isValid = false;
      }
    
    
     // Validate number of people
  if (num_of_people.value === "") {
    people_err.textContent = "This field is required";
    num_of_people.classList.add("invalid");
    isValid = false;
  } else if (isNaN(num_of_people.value) || num_of_people.value == 0) {
    people_err.textContent = "Must be a valid number";
    num_of_people.classList.add("invalid");
    isValid = false;
  }

  return isValid; // Return the status of validation

}
const calculateTip = () => {
    const billValue = parseFloat(bill_amount.value);
    const noOfPeople = parseFloat(num_of_people.value);
    // Calculate tip based on the selected percentage or custom input
    const tipAmount = (billValue * (selectedTipPercentage / 100)) / noOfPeople;
    tip_per_person.textContent = tipAmount.toFixed(2); // Display tip per person
    // const cal = Math.floor(tipAmount * 100) / 100;
    // tip_per_person.textContent = cal; // Display tip per person

  
    //calcualte total person based on the selected percentage or custom input
    const totalPerson = billValue / noOfPeople + tipAmount;
  
    total_per_person.textContent = totalPerson.toFixed(2);


    // const cal1 = Math.floor(tipAmount * 100) / 100;
    // tip_per_person.textContent = cal1;


    


    console.log(tipAmount, totalPerson, selectedTipPercentage);
  };

  customTipInput.addEventListener("input", () => {
    tipButtons.forEach((btn) => btn.classList.remove("selected"));
  
    const customTipValue = parseFloat(customTipInput.value);
  
    if (!isNaN(customTipValue) && customTipValue <= 100 && customTipValue > 0) {
      selectedTipPercentage = customTipValue; // Use custom tip if valid
    }
    
    
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (validateForm()) {
        calculateTip(); // Calculate tip after custom tip is entered
      }
    }, 500);
  });


  
  // Add event listeners to all tip buttons
tipButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Remove custom input value if a button is clicked
      customTipInput.value = "";
  
      // Set the tip percentage based on the button clicked
      const tipText = event.target.textContent;
      selectedTipPercentage = parseFloat(tipText);
  
      // Update button styles to indicate selection
      tipButtons.forEach((btn) => btn.classList.remove("selected"));
      event.target.classList.add("selected");
    });
  });



  

document.querySelector("#myform").addEventListener("submit", (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      calculateTip();
    }
  });
  
  document.querySelector(".submit").addEventListener("click", () => {
    window.location.reload();
  });
  


