const input = document.getElementById("matrix-size") as HTMLInputElement;
const submit = document.getElementById("matrix-submit") as HTMLButtonElement;

let n:number;

submit.addEventListener("click", (e) => {
    e.preventDefault();

    if(!input) return;
    if(input.value === "") {
        console.log("Please enter an invalid value");
        return;
    }

    const value = input.value;
    n = parseInt(value, 10);

    if(isNaN(n)){
        console.log("Please enter a valid number");
        return;
    }
});


let matrix: number[][] = [[]];