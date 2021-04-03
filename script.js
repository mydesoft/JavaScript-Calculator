
class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandTextElement = previousOperandText;
        this.currentOperandTextElement = currentOperandText;
        this.clearOutputs();
    }



    clearOutputs(){
        this.currentOperand = '';
        this.previousOperand = '';  
        this.operation = undefined;
    }



    deleteNumber(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }


    chooseOperationToPerform(operation){
        if (this.currentOperand === '') {
            return;
        }

        if (this.previousOperand !== '' ) {

          this.performArithmetic();  
        }

        this.operation  = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }



    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')){
            return; 
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }



    rootOperation(rootOperation){

        let computation;

       if(isNaN(this.currentOperand) || this.currentOperand === ''){
            return;
       }

        if (this.previousOperand !== '' ) {

            this.performArithmetic();  
          }

        this.number = parseFloat(this.currentOperand);
        computation = Math.sqrt(this.number);
        this.currentOperand = computation;

    }


     
    trigonometryOperation(trigOperation){
        this.trigOperation = trigOperation;
        this.number = parseFloat(this.currentOperand);
        this.number = this.number * Math.PI/180;
        let computation;
        if(this.currentOperand === ""  ){
            return;
        }

        switch(this.trigOperation){
            case 'sin':
                computation = Math.sin(this.number);
                break;
                
            case 'cos':
                computation = Math.cos(this.number);
                break;

            case 'tan':
                computation = Math.tan(this.number);
                break;

            default:
                return    
        }

        this.currentOperand = computation;

    } 



    performArithmetic(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) {
            return;
        }

        switch(this.operation){

            case '+':
                computation = prev + current;
                break;

            case '-':
                computation = prev - current;
                break;
                
             case '*':
                computation = prev * current;
                break;

            case '÷':
                computation = prev / current;
                break;

            default:
                return;    
        }

        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation =undefined;
    }



    updateOutput(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation != null ){

            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else{

            this.previousOperandTextElement.innerText = '';
        }

    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const symbolButtons = document.querySelectorAll('[data-symbol]');
const operationButtons = document.querySelectorAll('[data-operation]');
const trigonometryButtons = document.querySelectorAll('[data-trigonometry]');
const equalsButton = document.querySelector('[data-equals]');
const rootButton = document.querySelector('[data-root]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//Create Instance of the Calculator Class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


//clear all inputs button
allClearButton.addEventListener('click', () => {
    calculator.clearOutputs();
    calculator.updateOutput();
});

//delete number
deleteButton.addEventListener('click', () => {
    calculator.deleteNumber();
    calculator.updateOutput();
});


// Get the number button clicked
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateOutput();
    });
});

//Root Button
rootButton.addEventListener('click', () => {
    calculator.rootOperation(rootButton.innerText);
    calculator.updateOutput();

});

// Get the tigonometry button clicked
trigonometryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.trigonometryOperation(button.innerText);
        calculator.updateOutput();
    });
});

//Get the operator button clicked
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperationToPerform(button.innerText);
        calculator.updateOutput();
    });
});


//Get the symbol button clicked
symbolButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.choosenSymbol(button.innerText);
        calculator.updateOutput();
    });
});

 //perform computation
 equalsButton.addEventListener('click', () => {

    calculator.performArithmetic();
    calculator.updateOutput();
 });

