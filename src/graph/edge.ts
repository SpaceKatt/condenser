export class Edge {
    constructor(private score: number) {};

    getScore(): number {
        return this.score;
    }

    setScore(score: number): void {
        this.score = score;
    }

    clone(): Edge {
        return new Edge(this.score);
    }
}
