
console.log('Happy developing ✨')

function testMethod(state: string | number){
    console.log(state);
}

interface Point {
    x: number;
    y: number;
}


let names: Array<String> = [""]
let namesToo: string[] = [];

let hashmap: Map<string, number> = new Map();
let hashmapToo: Record<string, number>;



type Result<T> =
    | {success: true ; data: T}
    | {success: false ; error:string};



type Message = {
    role:Role,
    content:String,
}

type ChatRequest = {
    model: Model | string;
    messages: Message[];
    stream?: boolean;
}
type Model = "gpt-4" | "claude-3" | "ollama";
type Role = "user" | "assistant" | "system";

interface User{
    role: Role,
    content: string
}

async function sendChat(req:ChatRequest):Promise<Result<{reply: String}>>{
    let reply:String = "";
    switch(req.model){
        case "gpt-4":
            reply = "fuck you bitch";
            break;
        case "claude-3":
            reply = "hello";
            break;
        case "ollama":
            reply = "hello";
            break;

    }
    for(const message of req.messages){
        for(const key in message){
            let value:String = message[key as keyof typeof message];
            reply += value + "\n";
        }
    }
    if(reply.length > 10){
        return {
            success: true,
            data: {reply}
        }
    }
    return {
        success: false,
        error: "too Short"
    }

}




testMethod("test");