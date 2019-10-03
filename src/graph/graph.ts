export interface Token {
    type: symbol;
}

export interface Node {
    id: string;
    token: Token;
}

export interface Edge {

}

export interface AdjacencyMatrix {
    nodes: Node[];
    edges: Edge[][];
    getEdge(from: number, to: number): Edge;
    setEdge(edge: Edge, from: number, to: number): Edge;
    getNode(index: number): Node;
    setNode(node: Node): Node;
    swapNodes(first: number, second: number): void;
}

export interface Graph {
    id: string;
    adjMatrix: AdjacencyMatrix;
}
