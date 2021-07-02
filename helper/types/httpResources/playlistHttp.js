import { BaseHttp } from './baseHttp';

export class PlaylistHttp extends BaseHttp {

    getPlaylistItems(options, handleResponse) {
        this.setHttpConfiguration('playlistItems', options);
        this.http.get(handleResponse);
    }
}