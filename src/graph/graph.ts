export interface Token {
    type: symbol;
}

export interface Node {
    id: string;
    token: Token;
}

export interface Edge {
    score: number;
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

export interface MatrixPath {
    path: number[];
}

export interface PathStrategy {
    findPath(matrix: AdjacencyMatrix): IterableIterator<MatrixPath>;
}

export interface ScoreStrategy {
    scoreMatrix(matrix: AdjacencyMatrix): AdjacencyMatrix;
}

export interface Graph {
    id: string;
    adjMatrix: AdjacencyMatrix;
    scoreStrategy: ScoreStrategy;
    pathStrategy: PathStrategy;
    score(): void;
    getPaths(): IterableIterator<MatrixPath>;
}
