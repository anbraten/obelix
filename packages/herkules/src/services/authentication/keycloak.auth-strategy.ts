import { OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';
import { Params } from '@feathersjs/feathers';

type EntityData = {
  [x: string]: unknown;
  email: string;
  name: string;
};

type KeycloakProfile = OAuthProfile & {
  email: string;
  name: string;
};

export class KeycloakStrategy extends OAuthStrategy {
  async getEntityData(profile: KeycloakProfile, existing: unknown, params: Params): Promise<EntityData> {
    const baseData = await super.getEntityData(profile, existing, params);

    return {
      ...baseData,
      email: profile.email,
      name: profile.name,
    };
  }
}
