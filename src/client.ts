export type Role = "user" | "assistant" | "system";

export type ChatMessage = {
    role: Role;
    content: string;
};

export type ModelGroup = "coding" | "fast" | "reasoning" | "auto" | "vision";

export type ChatRequest = {
    model: ModelGroup | string;
    messages: ChatMessage[];
    stream?: boolean;
};

export type RouterMetadata = {
    provider: string;
    model: string;
    attempts: number;
};

// Discriminated Union for API response handling
export type RouterResult<T> =
    | { success: true; data: T; metadata: RouterMetadata }
    | { success: false; error: string; statusCode?: number };

