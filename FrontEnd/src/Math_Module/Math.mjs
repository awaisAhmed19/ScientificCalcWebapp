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
        if(x==0){ return 1; }
        else{ return x*this._fact_(x-1);}
    }

    
    _sin_(x){
        let angle=this._rad_(x);
        let res=0.0;
        
        for(let i=0;i<10;i++){
            let coeff= this._exp_(-1,i)/this._fact_(2*i+1);
            let term=coeff*(this._exp_(x,2*i+1));
            res+=term
            
        }
        return res;
    }
    _cos_(x){
        let angle=this._rad_(x);
        let res=0.0;
        
        for(let i=0;i<10;i++){
            let coeff= this._exp_(-1,i)/this._fact_(2*i);
            let term=coeff*this._exp_(x,2*i);
            res+=term;
            
        }
        return res;
    }
    _tan_(x){
        //need to work on the logical error in tangent 
        let angle=this._rad_(x);
        let res=0;
        for (let i=0;i<10;i++){
            let coeff=2*i+1;
            let term=(this._exp_(-1,i))*(this._exp_(angle,coeff))/this._fact_(coeff);
            res+=term;
        }
        return res
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
console.log(Math.sin(Math.PI/6), Math.cos(Math.PI/6), Math.tan(Math.PI/6));
console.log(m._sin_(Math.PI/6), m._cos_(Math.PI/6),m._tan_(Math.PI/6));
//console.log(m._round_(0.5773502691896257,10))
