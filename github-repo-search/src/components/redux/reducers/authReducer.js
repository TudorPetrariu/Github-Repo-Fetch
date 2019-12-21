const initialState = {
    authError: null,
    user: {},
    token: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCCES':
            return {
                ...state,
                user: action.user,
                token: action.token,
                authError: null
            }
        default:
            return state
    }
}

export default authReducer