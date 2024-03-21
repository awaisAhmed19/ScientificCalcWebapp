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

    _add_(x,y){
        return x+y;
    }
    _sub_(x,y){
        return x-y;
    }

    _mul_(x,y){
        return x*y;
    }

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
        
        if(y<35){
            if (y==0){
                return 1;
            }
            else{
                if (y%2==0){
                    let temp=this._exp_(x,y/2);
                    return temp*temp;
                }else{
                    temp=this._exp_(x,(y-1)/2);
                    return temp*temp*x;
                }
            }
        }

    }

    fact



}