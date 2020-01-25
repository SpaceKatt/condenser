import {
    GraphIsomorph,
    ScoreStrategy,
} from '../';

export class NullScoreStrategy implements ScoreStrategy {
    scoreIsomorph(isomorph: GraphIsomorph): GraphIsomorph {
        return isomorph;
    }
}
