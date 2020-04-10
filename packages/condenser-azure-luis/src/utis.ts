import { LuisConfig, LuisSecretConfig } from './types';

export const loadSecretFromEnv = (
    secretName: string,
    defaultValue?: string,
): string => {
    const secret = process.env[secretName];

    if (!secret) {
        if (!defaultValue) {
            throw Error(`Secret '${secretName}' not found in env!!!`);
        }

        console.warn(
            `Secret '${secretName}' not found, using default value...`,
        );
    }

    return (secret || defaultValue) as string;
};

export const loadLuisConfigFromEnv = (
    secretConfig: LuisSecretConfig,
): LuisConfig => {
    const config = {
        appId: loadSecretFromEnv(secretConfig.appIdSecretName),
        endpointKey: loadSecretFromEnv(secretConfig.endpointKeySecretName),
        endpointUrl: loadSecretFromEnv(secretConfig.endpointUrlSecretName),
        versionId: loadSecretFromEnv(secretConfig.versionIdSecretName),
    };

    return config;
};
