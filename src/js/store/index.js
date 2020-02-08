import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        key: 'exhibition-production'
    })],

    state: {
        exhibition: null,
        auth: {
            access_token: null,
            member: null
        }
    },

    mutations: {
        setCredentials(state, credentials) {
            state.auth.access_token = credentials.access_token;
            state.auth.member = credentials.member;
        },

        setExhibition(state, exhibition) {
            state.exhibition = exhibition;
        },

        flush: state => {
            state.auth.access_token = null;
            state.auth.member = null;
        }
    },

    getters: {
        // accessToken: state => {
        //     console.log("localStorage:::"+localStorage.getItem('access_token'))
        //     return (state.auth.access_token = localStorage.getItem(
        //         "access_token"
        //     ));
        // },

        member: state => {
            // const member = localStorage.getItem("member");
            // if (member) {
            //     state.auth.member = JSON.parse(member);
            // }

            return state.auth.member;
        },

        isSignedIn: (state, getters) => {
            return getters.member !== null;
        },

        exhibition: state => {
            // const exhibition = localStorage.getItem("exhibition");
            // if (exhibition) {
            //     state.exhibition = JSON.parse(exhibition);
            // }

            return state.exhibition;
        },

        exhibitionId: (state, getters) => {
            return getters.exhibition ? getters.exhibition.id : null;
        }
    },

    actions: {
        flush(context) {

                context.commit("flush");

        }
    }
});
