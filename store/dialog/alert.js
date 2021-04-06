import ActionType from '~/constants/action-type.js';

/**
 * STATE
 */
export const state = () => ({
    show: false,
    icon: true,
    message: '메세지가 없습니다.',
    btnText: '확인',
    btnFunc: undefined
})

/**
 * MUTATIONS(동기 처리)
 */
export const mutations = {
    [ActionType.CHANGE_DIALOG_ALERT]: function (state, payload) {
        if(typeof payload.show === "boolean") state.show = payload.show;
        if(typeof payload.icon === "boolean") state.icon = payload.icon;
        if(typeof payload.message === "string") state.message = payload.message;
        if(typeof payload.btnText === "string") state.btnText = payload.btnText;
        if(typeof payload.btnFunc === "function") state.btnFunc = payload.btnFunc;
    },

    [ActionType.INIT_DIALOG_ALERT]: function (state, payload) {
        state.show = false;
        state.icon = true;
        state.message = '메세지가 없습니다.';
        state.btnText = '확인';
        state.btnFunc = undefined;
    }
}

/**
 * ACTIONS(비동기 처리)
 */
export const actions = {
    [ActionType.CHANGE_DIALOG_ALERT]: function (store, payload) {
        store.commit(ActionType.CHANGE_DIALOG_ALERT, payload);
    },

    [ActionType.INIT_DIALOG_ALERT]: function (store, payload) {
        store.commit(ActionType.INIT_DIALOG_ALERT, payload);
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

    btnText: state => {
        return state.btnText;
    },

    btnFunc: state => {
        return state.btnFunc;
    }
}