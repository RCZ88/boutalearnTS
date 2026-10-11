import {boolean} from "zod";
type ret = {success:true, value:number} | {success: false, error:string};
type direction = "none" | "parent" | "children";

export class HeapTree{
    arr:Array<number> = [];
    reverse:boolean;

    constructor(reverse?:boolean){
        this.arr = new Array<number>();
        this.reverse = reverse ? reverse : false;
        /*for(let num of arr){
            this.insert(num);
        }*/
    }

    //going up
    public insert(value:number){
        this.arr.push(value);
        let curI = this.arr.length - 1;
        let parent = this.gParent(curI);
        switch(this.reverse){
            case true:
                while(this.arr[parent]< value){
                    let temp = parent;
                    this.arr[parent] = value;
                    this.arr[curI] = temp;
                    curI = parent;
                    parent = this.gParent(curI);
                }
                break;
            case false:
                while(this.arr[parent] > value){
                    let temp = parent;
                    this.arr[parent] = value;
                    this.arr[curI] = temp;
                    curI = parent;
                    parent = this.gParent(curI);
                }
                break;
        }

    }


    public removeMin():ret {
        if(this.reverse){
            return this.removeAt(this.size()-1);
        }
        return this.removeAt(0);
    }

    public removeAt(index:number):ret{
        // let resultPeek =  this.peek();
        // if(!resultPeek.success){
        //     return resultPeek;
        // }
        if(index < 0 || index > this.size()-1){
            return {success:false, error:"INVALID INDEX!"};
        }
        let lastValue = this.arr[this.size()-1];
        let curI = index;


        let numAtIndex = this.arr[curI];
        let retValue = numAtIndex;
        this.arr[curI] = lastValue;
        this.arr.pop()
        let maxIndex = this.size() - 1;
        let dir:direction = "none";
        while(true){
            let iToReplace = -1;
            let min = numAtIndex;
            let left = this.gLeft(curI);
            let right = this.gRight(curI);
            let noChildren = false;
            if(left > maxIndex && right > maxIndex){
                noChildren = true;
            }
            let parent = this.gParent(curI);
            if(noChildren && curI == 0){
                break;
            }

            let found = false;
            let pCon:boolean = this.reverse ?
                this.arr[parent] < numAtIndex :
                this.arr[parent] > numAtIndex;
            if(pCon){
                if(dir == "children"){
                    break;
                }
                dir = "parent";
                iToReplace = parent;
            }else{
                if(dir == "parent"){
                    break;
                }
                dir = "children";
                if(left <= this.size()-1){
                    found = true;
                    let lCon:boolean = this.reverse ?
                        this.arr[left] > numAtIndex && this.arr[left] > min :
                        this.arr[left] < numAtIndex && this.arr[left] < min;
                    if(lCon){
                        min = this.arr[left];
                        iToReplace = left;

                    }
                }
                if(right <= this.size()-1){
                    found = true;
                    let rCon:boolean = this.reverse ?
                        this.arr[right] > numAtIndex && this.arr[right] > min :
                        this.arr[right] < numAtIndex && this.arr[right] < min;
                    if(rCon){
                        min = this.arr[right];
                        iToReplace = right;
                    }
                }
                if(!found){
                    this.arr[this.size()] = numAtIndex;
                    break;
                }
            }


            //swap
            let temp = this.arr[iToReplace];
            this.arr[iToReplace] = numAtIndex
            this.arr[curI] = temp;
            curI = iToReplace;

        }
        return {success: true, value: retValue};

    }

    public size(){
        return this.arr.length;
    }


    public peek():ret{
        if(this.size() == 0){
            return {success: false, error:"SIZE IS 0"};
        }
        return {success: true, value: this.arr[0]}
    }

    private gParent(i: number):number{
        return Math.floor((i - 1) / 2)
    }
    private  gLeft(i: number){
        return 2 * i + 1;
    }
    private gRight(i: number){
        return 2 * i + 2;
    }

}

