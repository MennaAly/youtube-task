import { UrlMapper } from '../URLMapper';
import { AxiosConfig } from '../../../services/http/AxiosConfig';

export class BaseHttp {
    http;
    constructor() {
        this.http = new AxiosConfig();

    }
    setHttpConfiguration(urlType, options) {
        this.http.setBaseUrl(UrlMapper[urlType]);
        this.http.setQueryParams(options);
    }
}