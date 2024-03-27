import ExpressionChecker from "./ExpressionChecker.js";
const Ec=new ExpressionChecker();
export class math{
    operations(x,y,token){

        switch(token){
            case '+':return this._add_(x,y);
                break;
            case '-':return this._sub_(x,y);
                break;
            case '*':return this._mul_(x,y);
                break;
            case '/':return this._div_(x,y);
                break;
            case '^':return this._exp_(x,y);
                break;
            default:
                return "Invalid function";
        } 

    }
    funcEval(func,x){
        switch(func){
            case 'sin':return  this._sin_(x);
                break;
            case 'cos': return this._cos_(x);
                break;
            case 'tan':return  this._tan_(x);
                break;
            case 'log2': return this._log2_(x);
                break;
            case 'log': return this._ln_(x);
                break;
            case 'log10': return this._log10_(x);
                break;
            case 'sqrt':return  this._sqrt_(x);
                break;
            case 'cbrt':return  this._cbrt_(x);
                break;
            default:
                return "Invalid function";
        }
    } 

    _add_(x,y){ return x+y; }
    _sub_(x,y){ return x-y; }
    _mul_(x,y){ return x*y; }
    _sqrt_(x){ return this._exp_(x,0.5); }
    _deg_(x){ return x*(180/Math.PI); }
    _rad_(x){ return x*(Math.PI/180); }
    _negation_(x){return x*(-1)}
    _abs_(x){
        if(x<0){
            return x*-1;
        }
        return x;
    }
    _cbrt_(x){
        return this._exp_(x,0.3333);
    }

    _div_(x,y){
        if(y==0){
            return ("cannot divide by zero");
        }
        else{
            return x/y;
        }
    }

    _log2_(x,precision=0.00000000000001){
        if(x<=0){
            return undefined;
        }
        if(x==1){
            return 0;
        }

        let low=0, high=x,res=-1,mid=0;

        while(low<=high){
            mid=low+(high-low)/2;

            if(this._abs_(this._exp_(2,mid)-x)<precision){
                res=mid;
                break;
            }
            else if(this._exp_(2,mid)<x){
                low=mid+precision;
                res=mid;
            }else{
                high=mid-precision;
            }
        }
        return res; 
    }
    _log10_(x,precision=0.00000000000001){
        if(x<=0){
            return undefined;
        }
        if(x==1){
            return 0;
        }

        let low=0, high=x,res=-1,mid=0;

        while(low<=high){
            mid=low+(high-low)/2;

            if(this._abs_(this._exp_(10,mid)-x)<precision){
                res=mid;
                break;
            }
            else if(this._exp_(10,mid)<x){
                low=mid+precision;
                res=mid;
            }else{
                high=mid-precision;
            }
        }
        return res; 
    }

    _ln_(x){
        return this._log2_(x)/1.44269504089;
    }

    _exp_(x, y) {
        if (y === 0) {
            return 1;
        }else if (y === 1) {
            return x;
        }else if(y<1){
            let term=1,res=0,terms=10;
            for (let i=0;i<terms-1;i++){
                res+=term;
                term=term*(y*Math.log(x)/(i+1));
            }
            return this._round_(res,4);
        }else if (y % 2 === 0) {
            let temp = this._exp_(x, y / 2);
            return temp * temp;
        } else {
            let temp = this._exp_(x, (y - 1) / 2);
            return temp * temp * x;
        }
    }
    

    _fact_(x){
        if(x===0||x===1){ return 1; }
        else{ return x*this._fact_(x-1);}
    }

    
    _sin_(x){
        return Math.sin(this._rad_(x));
    }
    
    _cos_(x){
        return Math.cos(this._rad_(x));
    }
    _tan_(x){
        return Math.tan(this._rad_(x));
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

export default math;
let m=new math();
//console.log(m._sin_(45));