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
            if (y==0){
                return 1;
            }
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
        if(x==0){
            return 1;
        }else{
        return x*this._fact_(x-1);
        }
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
    _round_(number ,rounding=5){
        number = number.toString();
        let deciplace=number.indexOf('.');

        if(deciplace!=-1 && deciplace+rounding+1<number){
            let digit=parseInt(number[deciplace+rounding+1],10);
            if(digit>=5){
                digit=parseInt(number[rounding])+=1;
                if(digit>=10){
                    parseInt(number[rounding-1])+=1;
                }
            }
            number=number.slice(number[rounding+1]);
        }
        return parseInt(number)
    }
}

let m=new math();
console.log(m._round_(30.913892049839483787482093828488));