import { LuisConfig } from './types';

import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { LUISRuntimeClient } from '@azure/cognitiveservices-luis-runtime';
import { GraphIsomorph, ScoreStrategy } from 'condenser';

export const getLuisRuntimeClient = (config: LuisConfig): LUISRuntimeClient => {
    const credentials = new CognitiveServicesCredentials(config.endpointKey);
    const client = new LUISRuntimeClient(credentials, config.endpointUrl);

    return client;
};

export class LuisRuntime {
    readonly runtimeClient: LUISRuntimeClient;

    private constructor(readonly config: LuisConfig) {
        this.runtimeClient = getLuisRuntimeClient(config);
    }

    static newRuntime(config: LuisConfig): LuisRuntime {
        return new LuisRuntime(config);
    }
}

export class LuisSingleMaxScoreStrategy implements ScoreStrategy {
    private constructor(readonly luisRuntime: LuisRuntime) {}

    async scoreIsomorph(isomorph: GraphIsomorph): Promise<GraphIsomorph> {
        return isomorph;
    }

    static newStategy(luisRuntime: LuisRuntime): LuisSingleMaxScoreStrategy {
        return new LuisSingleMaxScoreStrategy(luisRuntime);
    }
}
