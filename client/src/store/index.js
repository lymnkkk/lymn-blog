import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export function createStore(){
    return new Vuex.Store({
        state:{
            lists:{
                articles:{}
            },
            postsPerPage:5,
            posts:{},
            currentPost:{},
        },
        actions,
        mutations,
        getters
    })
}