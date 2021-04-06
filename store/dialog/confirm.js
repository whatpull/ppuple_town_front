import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    show: false,
    icon: true,
    message: '메세지가 없습니다.',
    btnYesText: '확인',
    btnYesFunc: undefined,
    btnNoText: '취소',
    btnNoFunc: undefined
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.CHANGE_DIALOG_CONFIRM]: function (state, payload) {
        if(typeof payload.show === "boolean") state.show = payload.show;
        if(typeof payload.icon === "boolean") state.icon = payload.icon;
        if(typeof payload.message === "string") state.message = payload.message;
        if(typeof payload.btnYesText === "string") state.btnYesText = payload.btnYesText;
        if(typeof payload.btnYesFunc === "function") state.btnYesFunc = payload.btnYesFunc;
        if(typeof payload.btnNoText === "string") state.btnNoText = payload.btnNoText;
        if(typeof payload.btnNoFunc === "function") state.btnNoFunc = payload.btnNoFunc;
    },

    [ActionType.INIT_DIALOG_CONFIRM]: function (state, payload) {
        state.show = false;
        state.icon = true;
        state.message = '메세지가 없습니다.';
        state.btnYesText = '확인';
        state.btnYesFunc = undefined;
        state.btnNoText = '취소';
        state.btnNoFunc = undefined;
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.CHANGE_DIALOG_CONFIRM]: function (store, payload) {
        store.commit(ActionType.CHANGE_DIALOG_CONFIRM, payload);
    },

    [ActionType.INIT_DIALOG_CONFIRM]: function (store, payload) {
        store.commit(ActionType.INIT_DIALOG_CONFIRM, payload);
    }
}

/**
 * GETTERS(복사객체 생성)
 */
export const getters = {
    show: state => {
        return state.show;
    },

    icon: state => {
        return state.icon;
    },

    message: state => {
        return state.message;
    },

    btnYesText: state => {
        return state.btnYesText;
    },

    btnYesFunc: state => {
        return state.btnYesFunc;
    },

    btnNoText: state => {
        return state.btnNoText;
    },

    btnNoFunc: state => {
        return state.btnNoFunc;
    }
}