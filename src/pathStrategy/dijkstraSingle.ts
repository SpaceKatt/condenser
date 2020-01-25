import {
    GraphIsomorph,
    Path,
    PathStrategy,
} from '../';

export class DijkstraSinglePath implements PathStrategy {
    findPaths(isomorph: GraphIsomorph): IterableIterator<Path> {
        const paths: Path[] = [];

        return paths.values();
    }

}
