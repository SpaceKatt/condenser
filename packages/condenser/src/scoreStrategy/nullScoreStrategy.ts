import { GraphIsomorph, ScoreStrategy } from '../';

export class NullScoreStrategy implements ScoreStrategy {
    private constructor() {}

    async scoreIsomorph(isomorph: GraphIsomorph): Promise<GraphIsomorph> {
        return isomorph.clone();
    }

    static create(): NullScoreStrategy {
        return new NullScoreStrategy();
    }
}
