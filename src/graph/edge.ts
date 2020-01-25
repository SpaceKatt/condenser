export class Edge {
    constructor(private score: number) {};

    getScore(): number {
        return this.score;
    }

    setScore(score: number): void {
        this.score = score;
    }

    equal(other: Edge): boolean {
        return this.score === other.getScore();
    }

    clone(): Edge {
        return new Edge(this.score);
    }

    static getMatrixFromScoreMatrix(scoreMatrix: number[][]): Edge[][] {
        if (!scoreMatrix || scoreMatrix.length !== scoreMatrix[0].length) {
            throw new Error('Edge :: Invalid scoreMatrix');
        }

        const edgeMatrix: Edge[][] = [];

        for (let i = 0; i < scoreMatrix.length; i++) {
            edgeMatrix.push([]);

            for (let j = 0; j < scoreMatrix.length; j++) {
                edgeMatrix[i].push(new Edge(scoreMatrix[i][j]));
            }
        }

        return edgeMatrix;
    }
}
