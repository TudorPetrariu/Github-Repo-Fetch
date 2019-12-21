import firebase from 'firebase/app'
import 'firebase/auth'
const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY
const AUTHDOMAIN = process.env.REACT_APP_FIREBASE_AUTHDOMAIN

firebase.initializeApp({
    'apiKey': `${ FIREBASE_KEY }`,
    'authDomain': `${ AUTHDOMAIN }`
})



export const LogInUserRequest = () => {
    return {
        type: ' USER_LOGIN_REQUEST'
    };
};

export const LogInUserSucces = (user) => {
    return {
        type: 'USER_LOGIN_SUCCES',
        user
    };
};

export const LogInUserFailure = (error) => {
    return {
        type: 'USER_LOGIN_FAILURE',
        payload: error
    };
};

export const getToken = (token) => {
    return {
        type: 'GET_TOKEN',
        payload: token
    }
}

export const userIsLoggedIn = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let token = localStorage.getItem('token')
                dispatch(getToken(token))
                dispatch(LogInUserSucces(user));
            } else {
                localStorage.removeItem('token')
                dispatch(LogInUserSucces(null));
                dispatch(getToken(null))
            }
        })
    }
}

export const signIn = () => {
    return (dispatch) => {
        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo')
        firebase.auth().signInWithPopup(provider).then(function (result) {
            let token = result.credential.accessToken;
            localStorage.setItem('token', token)
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        })

    }
}


export const signOut = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCES' })
        });
    }

}