import {
    GraphIsomorph,
    Path,
    PathStrategy,
} from '../';

export class DijkstraSinglePath implements PathStrategy {
    findPaths(isomorph: GraphIsomorph): IterableIterator<Path> {
        const paths: Path[] = [];

        paths.push([]);

        return paths.values();
    }

    static create(): DijkstraSinglePath {
        return new DijkstraSinglePath();
    }
}
