import { BaseHttp } from './baseHttp';

export class VideoHttp extends BaseHttp {

    getVideoDetails(options, handleResponse) {
        this.setHttpConfiguration('videoDetails', options);
        return this.http.get(handleResponse)
    }

    getRelatedVideos(options, handleResponse) {
        this.setHttpConfiguration('search', options);
        return this.http.get(handleResponse)
    }
}