
type ret = {success:true, value:number} | {success: false, error:string};
// type direction = "none" | "parent" | "children";

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

    public insert(value:number){
        this.arr.push(value);
        let curI = this.size()-1;
        console.log(curI);
        let indexInsertedTo = this.siftUp(curI);
        console.log(`inserted ${value} to ${indexInsertedTo}`);
        console.log(`Current Heap: [${this.arr.join(", ")}]`)
    }
    public insertList(vals:Array<number>):void{
        vals.forEach(val =>  this.insert(val));
    }


    public removeMin():ret {
        if(this.reverse){
            let smallest = this.arr[0]
            for(let num  of this.arr){
                if(num < smallest){
                    smallest = num;
                }
            }
            return {success:true, value:smallest}
        }
        return this.removeAt(0);
    }

    public removeAt(index:number):ret{
        // let resultPeek =  this.peek();
        // if(!resultPeek.success){
        //     return resultPeek;
        // }
        if(index < 0 || index > this.size()-1 || isNaN(index) || Number.isInteger(index)){
            return {success:false, error:"INVALID INDEX!"};
        }
        let lastValue = this.arr[this.size()-1];
        let curI = index;


        let numAtIndex = this.arr[curI];
        let retValue = numAtIndex;
        this.arr[curI] = lastValue;
        this.arr.pop();

        let parentIndex = this.gParent(curI);

        if(this.reverse){
            if(numAtIndex > this.arr[parentIndex]){
                this.siftUp(curI);
            }else if(numAtIndex < this.gLeft(curI) || numAtIndex > this.gRight(curI)){
                this.siftDown(curI);
            }
        }else{
            if(numAtIndex < this.arr[parentIndex]){
                this.siftUp(curI);
            }else if(numAtIndex < this.gLeft(curI) || numAtIndex > this.gRight(curI)){
                this.siftDown(curI);
            }
        }
        return {success: true, value: retValue};
    }

    private siftDown(index:number){
        let i = index;
        const numAtIndex = this.arr[i];



        while(true){
            let left = this.gLeft(i);
            let right = this.gRight(i);
            let min = numAtIndex;
            let iToReplace = -1;
            let found = false;
            if(this.arr[left] !== undefined){
                let lCon:boolean = this.reverse ?
                    this.arr[left] > numAtIndex && this.arr[left] > min :
                    this.arr[left] < numAtIndex && this.arr[left] < min;
                if(lCon){
                    // found = true;
                    min = this.arr[left];
                    iToReplace = left;
                }
            }
            if(this.arr[right] !== undefined){
                let rCon:boolean = this.reverse ?
                    this.arr[right] > numAtIndex && this.arr[right] > min :
                    this.arr[right] < numAtIndex && this.arr[right] < min;
                if(rCon){
                    iToReplace = right;
                }
            }

            // if(left <= this.size()-1){
            //     found = true;
            //
            // }
            // if(right <= this.size()-1){
            //     found = true;
            //
            // }

            if(iToReplace == -1){
                return;
            }
            this.swap(i, iToReplace);
            i = iToReplace;

        }

    }

    private siftUp(index:number):number{
        let curVal:number = this.arr[index];
        let i:number = index;
        if(index == 0){
            return 0;
        }
        let parent = this.gParent(i);
        if(this.reverse){
            while(curVal > this.arr[parent]){
                console.log(`Swapped ${this.arr[parent]} with ${curVal}`)
                this.swap(i, parent);
                i = parent;
                parent = this.gParent(i);
                console.log(`new Parent: ${this.arr[parent]}`);
            }
        }else{
            while(curVal < this.arr[parent]){
                this.swap(i,parent);
                i = parent;
                parent = this.gParent(i);
            }
        }
        return i;
    }

    public printHeap():void{
        let arrRow:Array<Array<number>> = new Array<Array<number>>();
        let curIndex = 0
        let row = 0;
        while(curIndex < this.size()-1){
            let amount = 2 << row;
            let latestStart = curIndex;
            for(curIndex; curIndex < curIndex + amount ; curIndex++){
                arrRow[row][curIndex - latestStart] = this.arr[curIndex];
            }
            row++;
        }
        let lastAmount = (2<<row+1) - 1;

    }

    private swap(i:number, j:number){
       /* if(this.arr[i] === undefined){
            this.arr[i] = j;
            return;
        }
        if(this.arr[j] === undefined){
            this.arr[j] = i;
            return;
        }*/
        let temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = temp;
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

