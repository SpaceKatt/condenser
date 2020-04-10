import { GraphIsomorph, Path, PathStrategy } from '../';

import { Heap } from 'heap-js';

interface PastMemo {
    lastNode: number;
    cost: number;
}

export class DijkstraLongestPath implements PathStrategy {
    private readonly source = 0;

    // Finds max cost to each path from source
    private generateMaxCostMemos(isomorph: GraphIsomorph): PastMemo[] {
        const lenNodes = isomorph.getNumberNodes();
        const destination = lenNodes - 1;

        const cost: PastMemo[] = new Array(lenNodes).fill({
            lastNode: -1,
            cost: -1,
        });
        const neighborHeap = new Heap<number>();

        cost[this.source] = { lastNode: -1, cost: 0 };
        neighborHeap.push(this.source);

        // Bredth-first, greedy helper
        const searchNeighbors = (index: number): void => {
            const costToIndex = cost[index].cost;

            for (let i = 0; i < lenNodes; i++) {
                // If node at i causes a cycle, skip
                if (i === index) {
                    continue;
                }

                const previousCost = cost[i].cost;
                const costToNode = isomorph.getEdge(index, i).getScore();

                // If an edge exists and new max cost found
                // TODO: WHat if they are equal? Ambiguous case
                if (costToNode > 0 && costToIndex + costToNode > previousCost) {
                    const memo: PastMemo = {
                        cost: costToIndex + costToNode,
                        lastNode: index,
                    };

                    cost[i] = memo;

                    if (!neighborHeap.contains(i)) {
                        neighborHeap.push(i);
                    }
                }
            }
        };

        // Search while we still have more candidates to inspect
        while (!neighborHeap.isEmpty()) {
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            const nextIndex = neighborHeap.pop()!;

            searchNeighbors(nextIndex);
        }

        // Cost from source to destination must exist
        const found = cost[destination].cost > 0;

        if (!found) {
            throw new Error('ERROR: DijkstraSinglePath: Path not found');
        }

        return cost;
    }

    // From max cost to each node from source, find max cost from source to sink
    // The source is always node zero and the sink is always the last node
    private findMaxCostPath(costMemos: PastMemo[]): Path {
        const len = costMemos.length;
        const destination = len - 1;

        const reversePath: Path = [destination];

        // Until we visit the source and have more nodes to visit
        while (reversePath[reversePath.length - 1] !== this.source) {
            const currentIndex = reversePath[reversePath.length - 1];
            const nextIndex = costMemos[currentIndex].lastNode;

            if (reversePath.length > len) {
                throw new Error(
                    'DijkstraSinglePath::findMaxCost : Disconnected graph',
                );
            }

            reversePath.push(nextIndex);
        }

        return reversePath.reverse();
    }

    async findPaths(isomorph: GraphIsomorph): Promise<IterableIterator<Path>> {
        // TODO: isomorph.isDirectedAcyclic() check
        const costMemos = this.generateMaxCostMemos(isomorph);
        const path = this.findMaxCostPath(costMemos);

        return [path].values();
    }

    static create(): DijkstraLongestPath {
        return new DijkstraLongestPath();
    }
}
