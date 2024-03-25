const PI= 3.14159265358979323846;
class math{
    operations(x,y,token){

        switch(token){
            case '+':this._add_(x,y);
                break;
            case '-':this._sub_(x,y);
                break;
            case '*':this._mul_(x,y);
                break;
            case '/':this._div_(x,y);
                break;
            case '^':this._exp_(x,y);
                break;
        } 

    } 

    _add_(x,y){ return x+y; }
    _sub_(x,y){ return x-y; }
    _mul_(x,y){ return x*y; }
    _sqrt_(x){ return this._exp_(x,0.5); }
    _deg_(x){ return (180/PI)*x; }
    _rad_(x){ return (PI/180)*x; }

    _div_(x,y){
        if(y==0){
            return ("cannot divide by zero");
        }
        else{
            return x/y;
        }
    }

    _exp_(x,y){
        y=parseInt(y);
        let temp=0
        if(y<35){
            if (y==0){ return 1; }
            else{
                if (y%2==0){
                    temp=this._exp_(x,y/2);
                    return temp*temp;
                }else{
                    temp=this._exp_(x,(y-1)/2);
                    return temp*temp*x;
                }
            }
        }

    }

    _fact_(x){
        if(x==0){ return 1; }
        else{ return x*this._fact_(x-1);}
    }

    
    _sin_(x){
        let angle=this._rad_(x);
        let res=0.0,sign=1;
        
        for(let i=0;i<10;i++){
            let term= this._exp_(angle,(2*i+1))/this._fact_(2*i+1);
            res+=sign*term;
            sign*=-1;
        }
        return res;
    }
    _cos_(x){
        let angle=this._rad_(x);
        let res=0.0,sign=1;
        
        for(let i=0;i<10;i++){
            let term= this._exp_(angle,(2*i))/this._fact_(2*i);
            res+=sign*term;
            sign*=-1;
        }
        return res;
    }
    _tan_(x){
        let angle=this._rad_(x);
        let a,b=0;
        a=(angle-90)/(angle+90);
        b=this._sqrt_((1-a)*(1+a))/2;
        return this._round_(b,10);
    }

     _round_(x, n = 0) {
        let integer = this._floor_(x);
        let decimalPart = x - integer;
        let roundedNumber = 0;
    
        if (n > 0) {
            let shiftedDecimal = decimalPart * this._exp_(10, n);
            let roundedDecimal = this._floor_(shiftedDecimal)%10;
            let newDecimal=this._floor_(shiftedDecimal)/this._exp_(10,n);
            if (roundedDecimal >= 5) {
                newDecimal+=1/this._exp_(10,n); 
            }
                roundedNumber = integer + newDecimal; 
        } else {
            if (decimalPart < 0.5) {
                roundedNumber = integer;
            } else {
                roundedNumber = integer + 1;
            }
        }
        return roundedNumber;
    }
    
    _floor_(x){
        if (parseInt(x)===x){ return x; }
        if(x>=0){ return this._truncate_(x); }
        else{ return this._truncate_(x)-1; }
    }

    _truncate_(x){ return parseInt(x); }
}

let m=new math();
console.log("Inbuilt:", Math.round(3.45678));
console.log("_round_:", m._round_(3.45678));

console.log("Inbuilt:", Math.round(3.45678 * 100) / 100);
console.log("_round_:", m._round_(3.45678, 2));

console.log("Inbuilt:", Math.round(3.45678 * 1000) / 1000);
console.log("_round_:", m._round_(3.45678, 3));

console.log("Inbuilt:", Math.round(3.45678 * 100000) / 100000);
console.log("_round_:", m._round_(3.45678, 5));

console.log("Inbuilt:", Math.round(3.789));
console.log("_round_:", m._round_(3.789));

console.log("Inbuilt:", Math.round(-5.6789));
console.log("_round_:", m._round_(-5.6789));

console.log("Inbuilt:", Math.round(-5.6789 * 100) / 100);
console.log("_round_:", m._round_(-5.6789, 2));




