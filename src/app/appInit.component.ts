import { AppConfigService } from './onesait/onesait-core/services/app-config-service/app-config.service';
import { config } from './config/config';
import { CacheConfig } from './config/cache-config';
import { PageConfig } from './config/config-pages';
import { ServerConfig } from './config/config-server';

export function AppInit(
    appConfigService: AppConfigService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise((resolve, _reject) => {
            appConfigService.setConfig(config);
            appConfigService.setCacheConfig(CacheConfig);
            appConfigService.setPagesConfig(PageConfig);
            appConfigService.setServerConfig(ServerConfig);
            resolve();
        });
    };
}