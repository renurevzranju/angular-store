// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as config from '../../auth_config.json';

const { domain, clientId, apiUri, appUri, errorPath, audience } = config as {
  domain: string;
  clientId: string;
  apiUri: string;
  errorPath: string;
  appUri: string;
  audience: string;
};

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: audience,
    },
    errorPath,
  },
  endpointURI: `${apiUri}/`,
  appURI: `${appUri}`,
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};