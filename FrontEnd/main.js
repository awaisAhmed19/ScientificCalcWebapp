let exp_review = document.getElementById('calculatorDisplay');
let expression=document.getElementById('calculatorResult');


function insert(variable){ expression.textContent+=variable; }

function clearDisplay(){ expression.textContent=''; }

function clearAll(){
    expression.textContent='';
    exp_review.textContent='';
}

function backspace(){ expression.textContent=expression.textContent.substring(0,expression.textContent.length-1);}

function calculate() {
    exp=expression.textContent.trim();
    if (exp !== "") {
        let result = eval(exp);
        exp_review.textContent='';
        exp_review.innerHTML+=exp;
        expression.textContent='';
        expression.innerHTML += result;
    }
}



