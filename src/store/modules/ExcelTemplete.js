const state = {
    dataInfo:{},
    nextStep:false,
    file:{},
}

const mutations = {
    getDataInfo: (state,param) => {
        state.dataInfo = param;
    },
    getnextStep: (state,param) => {
        state.nextStep = param;
    },
    getFile:(state , param) => {
        state.file = param ;
    }
}

const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}