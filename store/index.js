import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            mediaType: '',
            searchText: '',
        },
        mutations: {
            setMediaType(state, type) {
                state.mediaType = type
            },
            setSearchText(state,text){
                state.searchText = text;
            },
        },
        actions: {
            setMediaType({
                commit
            }, type) {
                commit('setMediaType', type);
            },
            setSearchText({
                commit
            }, text) {
                commit('setSearchText', text);
            },
        },
        getters: {
            getMediaType(state) {
                return state.mediaType;
            },
            getSearchText(state){
                return state.searchText;
            },
        }

    });
}

export default createStore;