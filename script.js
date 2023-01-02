const numberButtons = document.querySelectorAll('[data-number]'),
      operationButtons = document.querySelectorAll('[data-operation]'),
      deleteButton = document.querySelector('[data-delete]'),
      equalsButton = document.querySelector('[data-equal]'),
      allClearButton = document.querySelector('[data-ac]'),
      previousOperandTextElem = document.querySelector('[data-previous-operand]'),
      currentOperandTextElem = document.querySelector('[data-current-operand]');


class Calculator{
    constructor(previousOperandTextElem, currentOperandTextElem){
        this.previousOperandTextElem = previousOperandTextElem;
        this.currentOperandTextElem = currentOperandTextElem;
        this.clear();
    }


    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }


    //Remove single number
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }


    //Choosing numbers
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')){    //Checking if number already has '.'
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();   //Concentration number to string
    }


    //Choose operation
    chooseOperation(operation){
        if(this.currentOperand === ''){
            return;
        }
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;  // Choosing an operation, currentOperand become previousOperand
        this.currentOperand = '';
    }


    //Calculate two numbers
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)){   //Checking if current or prev operands are empty breaks
            return;
        }
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }


    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 });
        }
        if(decimalDigits != null){
           return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }


    //Update values inside of the 
    updateDisplay(){
        this.currentOperandTextElem.innerText = 
        this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElem.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandTextElem.innerText = '';
        }
    }
}


const calculator = new Calculator(previousOperandTextElem, currentOperandTextElem);

    numberButtons.forEach(button =>{
        button.addEventListener('click',() =>{
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        });
    });


    operationButtons.forEach(operation =>{
        operation.addEventListener('click',() =>{
            calculator.chooseOperation(operation.innerText);
            calculator.updateDisplay();
        });
    });

    equalsButton.addEventListener('click', ()=>{
        calculator.compute();
        calculator.updateDisplay();
    });

    allClearButton.addEventListener('click', () =>{
        calculator.clear();
        calculator.updateDisplay();
    });

    deleteButton.addEventListener('click', ()=>{
        calculator.delete();
        calculator.updateDisplay();
    });