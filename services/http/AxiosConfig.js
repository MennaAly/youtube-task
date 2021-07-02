let axios = require('axios');

export class AxiosConfig {
    baseUrl;
    queryParams;

    setBaseUrl(url) {
        this.baseUrl = url;
    }

    setQueryParams(options) {
        this.queryParams = {
            part: options.part || 'snippet',
            key: 'AIzaSyAuaVAhtey5Nkw3K5bhPDw0eDeuTeIU60U',
            ...options
        }
    }

    get(callback) {
        let params = this.queryParams;
        return axios.get(this.baseUrl, { params }).then((response) => {
            callback(response.data)
        }).catch(error => console.log(error));
    }
}