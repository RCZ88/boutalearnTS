
// Literal union — exactly these values
export type Role = "user" | "assistant" | "system";

// Message shape
export type ChatMessage = {
    role: Role;
    content: string; // lowercase s — primitive string, NOT String
};

// Model groups — autocomplete for known values
export type ModelGroup = "coding" | "fast" | "reasoning" | "auto" | "vision";

// The union trick: keep autocomplete + accept any string
export type ChatRequest = {
    model: ModelGroup | (string & {});
    messages: ChatMessage[];
    stream?: boolean; // ? = optional
};

// Metadata from response headers
export type RouterMetadata = {
    provider: string;
    model: string;
    attempts: number;
};

// Discriminated union return pattern
export type RouterResult<T> =
    | { success: true; data: T; metadata: RouterMetadata }
    | { success: false; error: string; statusCode?: number };
