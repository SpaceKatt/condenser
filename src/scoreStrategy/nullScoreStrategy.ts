import { GraphIsomorph, ScoreStrategy } from '../';

export class NullScoreStrategy implements ScoreStrategy {
    private constructor() {}

    scoreIsomorph(isomorph: GraphIsomorph): GraphIsomorph {
        return isomorph.clone();
    }

    static create(): NullScoreStrategy {
        return new NullScoreStrategy();
    }
}
