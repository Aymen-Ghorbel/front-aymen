
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: 'http://20.67.134.169:8080/auth',
                realm: 'credit-workflow',
                clientId: 'client',
            },
            initOptions: {
                checkLoginIframe: true,
                checkLoginIframeInterval: 25
            },
            enableBearerInterceptor: true,
            bearerPrefix: 'Bearer',
            loadUserProfileAtStartUp: true
        });
}
