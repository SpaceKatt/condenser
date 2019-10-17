export interface Token {
    type: symbol;
    id: string;
    clone(): Token;
}

export interface Edge {
    score: number;
}

export interface MatrixPath {
    path: number[];
}
