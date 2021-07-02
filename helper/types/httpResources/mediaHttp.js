import { BaseHttp } from './baseHttp';

export class MediaHttp extends BaseHttp {

    getAllMedia(options, handleResponse) {
        this.setHttpConfiguration('search', options);
        return this.http.get(handleResponse);
    }
}