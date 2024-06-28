export default {
    state() {
        return {
            isOpen: false,
            counter: 0,
            loading: false,
            isOpenInsights: false,
            insightsInPage: ''
        };
    },
    mutations: {
        setMenu(state, payload) {
            state.isOpen = payload.val
        },
        setInsightMenu(state, payload) {
            state.isOpenInsights = payload.val
            state.insightsInPage = payload.page
        },
    },
    actions: {
        openMenu(context) {
            context.commit('setMenu', {val: true});
        },
        closeMenu(context) {
            context.commit('setMenu', {val: false});
        },
        toggleMenu(context) {
            context.commit('setMenu', {val: !this.getters.isOpen})
        },
        openInsightsMenu(context, payload) {
            context.commit('setInsightMenu', {val: true, page: payload.page});
        },
        closeInsightsMenu(context) {
            context.commit('setInsightMenu', {val: false, page: ''});
        },
    },
    getters: {
        isOpen(state) {
            return state.isOpen;
        },
        isOpenInsights(state) {
            return state.isOpenInsights;
        },
        insightsInPage(state) {
            return state.insightsInPage;
        },
    }
}