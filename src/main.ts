// import * as RouterClient from './client';
import * as readline from "node:readline";
import {string} from "zod";


// async function checkStatus(): Promise<RouterClient.RouterResult<unknown>> {
//     try{
//         const res = await fetch(``, {})
//     }
// }

/*async function completeChat(prompt: string, group:RouterClient.ModelGroup): Promise<RouterClient.RouterResult<string>> {
    const res = await fetch("http://localhost:4000/router/status", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model:group,
            messages: [{role: "user", content: prompt}]
        })
    });

    if(!res.ok){
        return {success: false, error: `HTTP ERROR ${res.status}`};
    }

    const data = await res.json();
    return {success : true, data: data, metadata: data};
}*/

type TrafficLight = "red" | "yellow" | "green";
function nextLight(current: TrafficLight):TrafficLight{
    switch(current) {
        case "red":
            return "yellow";
        case "yellow":
            return "green";
        case "green":
            return "red";
    }
}

type ParseResult =
| { ok: true; value: number }
    | { ok: false; reason: string };

function parseIntSafe(input: string): ParseResult{
    if(input.length == 0){
        return {ok:false, reason:"EMPTY STRING"};
    }
    let number: number;
    try{
        number = parseInt(input, 10);
        if(isNaN(number)){
            return {ok: false , reason: "Invalid number"};
        }
    }catch(err:unknown){
        if(err instanceof Error){
            return {ok: false, reason: err.toString()};
        }
        return {ok: false, reason: "FUCK YOU BITCH"};

    }
    return {ok: true, value: number};
}


function pluck<T extends object, K extends keyof T>(obj: T, key: K): T[K] | null{
    /*let found:boolean = false;
    let value:T[K] | null = null;
    for(const key in obj){
        console.log(typeof key);
        console.log(key);
        let v:T[K] = obj[key as keyof typeof obj];
        if(v === key){
            found = true;
            value = v;
            break;
        }
    }
    if(!found){
        console.log(`Key ${key.toString()} Not Found`)
        return null;
    }
    return value;*/

    if(key in obj){
        return obj[key];
    }
    return null;
}

type example = {
    name: string
    age: number
    active: boolean
}

const nigger:example = {
    name:"boti",
    age:67,
    active:true,
}

let name =pluck(nigger, "name")
if(name){
    console.log(name)
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
* rl.question("Enter your name: ", (answer) => {
    console.log("You entered:", answer);
    rl.close();
});
* */

/*
function input(message: string):Promise<string>{
    return new Promise<string>((resolve, reject) =>{
        rl.question(message, (ans) =>{
            console.log(message);
            resolve(ans);
        })
    });
}
*/

type primitives = string | number | boolean;

function input(message: string, type_: StringConstructor): Promise<string>;
function input(message: string, type_: NumberConstructor): Promise<number>;
// function input(message: string, type_: BooleanConstructor): Promise<boolean>;

function input(message: string, type_:NumberConstructor | StringConstructor):Promise<primitives>{
    console.log(message);
    return new Promise<primitives>((resolve, reject) =>{
        rl.question(message, (ans) =>{
            switch(type_){
                case String:
                    resolve(String(ans));
                    break;
                case Number:
                    let parseResult: ParseResult = parseIntSafe(ans);
                    if(parseResult.ok){
                        resolve(parseResult.value);
                        break;
                    }
                    reject(parseResult.reason);
                    break;

            }
        })
    });
}

//with double pointers O(N)
function isPalindrome(s:string):boolean{
    let left:number = 0
    let right:number = s.length-1
    while(left < right){
        let leftChar = s.charAt(left);
        let rightChar = s.charAt(right);
        let code = leftChar.charCodeAt(0);
        while(!((code >= 65 && code <= 90) ||
        (code >= 97 && code <= 122) ||
        (code >= 48 && code <= 57))){
            left++;
            leftChar = s.charAt(left);
            code = leftChar.charCodeAt(0);
        }
        code = rightChar.charCodeAt(0);
        while(!((code >= 65 && code <= 90) ||
        (code >= 97 && code <= 122) ||
        (code >= 48 && code <= 57))){
            right--;
            rightChar = s.charAt(right);
            code = rightChar.charCodeAt(0)
        }

        if(rightChar.toLowerCase() !== leftChar.toLowerCase()){
            return false;
        }
        left++;
        right--;
    }
    return true;
}

//with hash O(N)
type tsCord = {index1: number, index2: number};
const errorTsCord:tsCord = {
    index1: -1,
    index2: -1,
}
function twoSum(sum:number, values:number[]):tsCord{
    let hm:Map<number, number> = new Map<number, number>();
    for(let i = 0; i<values.length; i++){
        let n: number = values[i] ?? 0
        let remaining = sum-n;
        if(remaining <= 0){
            continue;
        }
        if(hm.has(remaining)){
            console.log(`{${i}, ${hm.get(remaining)}}`);
            // @ts-ignore
            return {index1: i, index2: hm.get(remaining)};
            break;
        }
        hm.set(n, i);
    }
    return errorTsCord;
}


//O(N), technically n/2. requires a sorted arr:
function twoSumWPointers(sum:number, values:number[]):tsCord{
    let left = 0;
    let right = values.length - 1;
    // @ts-ignore
    let sumUs = values[right] + values[left];
    while(left < right){
        if(sumUs > sum){
            right--;
            continue;
        }
        if (sumUs < sum){
            left++;
            continue;
        }
        return {index1: left, index2:right};
    }
    return errorTsCord;
}

function frequency(nums:number[]):Map<number, number>{
    const frequency:Map<number, number> = new Map<number, number>();

    // @ts-ignore
    nums.forEach(nums => frequency.has(nums) ? frequency.set(nums, frequency.get(nums)+1) : frequency.set(nums, 1));

    frequency.forEach((a, b) =>{
        console.log(`FREQUENCY: ${b} -> ${a}`);
    })
    return frequency;
}

function removeDuplicates(nums: number[]): number {
    let slow = 0;

    for (let fast = 1; fast < nums.length; fast++) {
        // no need the while loop.
        /*while(nums[fast] == nums[slow] && fast < nums.length){
            fast++;
        }*/
        if(nums[fast] != nums[slow]){
            slow++;
            // @ts-ignore
            nums[slow] = nums[fast];
            const str = nums.join(" ");
            console.log(str);
            continue;
        }
        break;

    }

    return slow + 1;
}

function moveZeros(nums:number[]):void{
    let slow: number = 0;
    for(let fast = 0; fast < nums.length; fast++){
        if(nums[slow] == 0 && nums[fast] != 0){
            // @ts-ignore
            nums[slow] = nums[fast];
            nums[fast] = 0;
            slow++;
        }
    }
}

//get the size of nums after filtering out the element toRemove
function removeElement(nums:number[], toRemove:number):number{
    let slow = 0;

    for (let fast = 0; fast < nums.length; fast++) {
        // ...
        if(nums[fast] != toRemove && nums[slow] == toRemove){
            nums[slow] = nums[fast];
            slow++;
        }
    }

    return slow;
}

//from O(N x K) to O(N)
function getBiggestConsecutiveSum(nums:number[], consec?:number){
    if(!consec){
        consec = 3;
    }


    let left:number = 0;
    let right = left+consec-1;
    let maxSum:number = getSum(nums.splice(left, right));
    let prevSum = maxSum;
    let prevLeft = nums[left];

    for(let i = 1; i < nums.length - (consec-1); i++){
        left = left+i;
        right = right+i;
        prevSum += nums[right] - prevLeft;
        if(prevSum > maxSum){
            maxSum = prevSum;
        }
        prevLeft = nums[left];
    }

    return maxSum;
}


function lastStoneWeight(stones: number[]): number {
    let ht:HeapTree = new HeapTree(true);
    for(const stone of stones){
        ht.insert(stone);
    }
    while(ht.size() > 1){
        let aPeek = ht.peek();
        let a:number = aPeek.success ? aPeek.value : -1;
        let bPeek = ht.peek();
        let b:number = bPeek.success ? bPeek.value : -1;

        let dis = a-b;
        if(dis == 0){
            continue;
        }
        ht.insert(dis);
    }
    let retValue = ht.peek();
    if (retValue.success){
        return retValue.value;
    }
    return -1;
}

function getSum(nums:number[]){
    let sum = 0;
    nums.forEach(num => sum+= num);
    return sum;
}

function longestSubarray(nums: number[], target: number): number {
    let left = 0;
    let sum = nums[0] * nums[0];
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while(sum > target){
            sum -= nums[left];
            left++;
        }
        let length = right-left + 1;
        if(length > maxLength) maxLength = length;
    }

    return maxLength;
}



import {HeapTree} from "./heapTree"
function getKthElement(arr:number[], k: number){
    let ht = new HeapTree();
    for(let num of arr){
        let peekRes = ht.peek();
        if(!peekRes.success || ht.size() < k){
            ht.insert(num);
            continue;
        }
        if(num <= peekRes.value){
            continue;
        }
        ht.removeMin()
        ht.insert(num);
    }
    return ht.peek();
}


async function main(){
    let userInput:string = await input("enter an input", String);
    let inray: string[] = userInput.split(" ").map(x => x.toLowerCase())
    let nums: number[] = [];
    let failToParse = 0;
    inray.forEach((ns, index) => {
        let parseRes = parseIntSafe(ns);
        if(parseRes.ok){
            nums.push(parseRes.value);
            return;
        }
        failToParse++;
    });

    //Frequency - HashMap Count
    /*
    console.log("FREQUENCY")
    const frequency:Map<number, number> = new Map<number, number>();

    // @ts-ignore
    nums.forEach(nums => frequency.has(nums) ? frequency.set(nums, frequency.get(nums)+1) : frequency.set(nums, 1));

    frequency.forEach((a, b) =>{
        console.log(`FREQUENCY: ${b} -> ${a}`);
    })*/

    //Two Sum
    // console.log("TWO SUM")
    // let sum = await input("", Number);

    //Remove Dupicate:
/*    console.log("Remove Dups");
    let uniqueCount = removeDuplicates(nums)
    console.log(uniqueCount)*/

    //Move Zeros
    console.log("Move Zeros")
    moveZeros(nums);
    console.log(nums.join(" "))

}

main();