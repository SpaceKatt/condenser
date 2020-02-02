import {
    AdjacencyMatrix,
    AdjacencyMatrixBuilder,
    GraphIsomorph,
    Path,
    PathStrategy,
} from '../';

export class DijkstraSinglePath implements PathStrategy {
    // Finds max cost to each path from source (node zero)
    private generateMaxCostArray(isomorph: GraphIsomorph): number[] {
        const lenNodes = isomorph.getNumberNodes();

        const visitQueue: number[] = [0];
        const visited: boolean[] = new Array(lenNodes).fill(false);
        const cost: number[] = new Array(lenNodes).fill(-1);

        cost[0] = 0;
        let found = false;

        // Bredth-first helper
        const searchNeighbors = (index: number): void => {
            const costToIndex = cost[index];

            for (let i = 0; i < lenNodes; i++) {
                // If node at i causes a cycle, skip
                if (visited[i] === true || i === index) {
                    continue;
                }

                const previousCost = cost[i];
                const costToNode = isomorph.getEdge(index, i).getScore();

                // TODO: WHat if they are equal? Ambiguous case
                if (costToNode > 0 && costToIndex + costToNode > costToIndex) {
                    cost[i] = costToIndex + costToNode;
                    visitQueue.push(i);
                }
            }
        };

        // Search while we still have more candidates to inspect
        while (!found && visitQueue.length > 0) {
            const index: number = visitQueue.pop()!;

            if (visited[index]) {
                continue;
            }

            visited[index] = true;
            searchNeighbors(index);

            found = cost[lenNodes - 1] > 0;
        }

        if (!found) {
            throw new Error('ERROR: DijkstraSinglePath: Path not found');
        }

        return cost;
    }

    // From max cost to each node from source, find max cost from source to sink
    // The source is always node zero and the sink is always the last node
    private findMaxCostPath(costArray: number[]): Path {
        const len = costArray.length;
        const visited: boolean[] = new Array(len).fill(false);
        const visitQueue: number[] = [len - 1];

        const path: Path = [len - 1];

        // Until we visit the source and have more nodes to visit
        while (path[path.length - 1] !== 0 && visitQueue.length > 0) {
            const currentNode = visitQueue.pop()!;

            visited[currentNode] = true;

            let nextIndex = -1;
            let maxScore = -1;

            for (let i = 0; i < len; i++) {
                if (visited[i]) {
                    continue;
                }

                if (costArray[i] > maxScore) {
                    nextIndex = i;
                    maxScore = costArray[i];
                }
            }

            if (nextIndex < 0) {
                throw new Error('DijkstraSinglePath::findMaxCost : Disconnected graph');
            }

            visitQueue.push(nextIndex);
            path.push(nextIndex);
        }

        return path.reverse();
    }

    findPaths(isomorph: GraphIsomorph): IterableIterator<Path> {
        const costArray = this.generateMaxCostArray(isomorph);
        const path = this.findMaxCostPath(costArray);

        return [path].values();
    }

    static create(): DijkstraSinglePath {
        return new DijkstraSinglePath();
    }
}
