import { FETCH_REPO_REQUEST, FETCH_REPO_SUCCES, FETCH_REPO_FAILURE } from '../types';


export const initialState = {
    loading: false,
    repositories: [],
    error: '',
    token: null,
    user: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REPO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_REPO_SUCCES:
            return {
                ...state,
                loading: false,
                repositories: action.payload,
                error: ''
            };
        case FETCH_REPO_FAILURE:
            return {
                ...state,
                loading: false,
                repositories: [],
                error: action.payload
            };

        case 'GET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'USER_LOGIN_SUCCES':
            return {
                ...state,
                user: action.user,
                authError: null
            }
        case 'SIGNOUT_SUCCES':
            console.log('SignOut Succes')
            return state


        default:
            return state;
    }
};

export default rootReducer;
