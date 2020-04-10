export interface LuisConfig {
    appId: string;
    endpointKey: string;
    endpointUrl: string;
    versionId: string;
}

export interface LuisSecretConfig {
    appIdSecretName: string;
    endpointKeySecretName: string;
    endpointUrlSecretName: string;
    versionIdSecretName: string;
}
