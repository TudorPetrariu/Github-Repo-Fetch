
import React, { Component } from 'react'
import Repository from './Repository'


import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY
const AUTHDOMAIN = process.env.REACT_APP_FIREBASE_AUTHDOMAIN
console.log(FIREBASE_KEY)
console.log(AUTHDOMAIN)

firebase.initializeApp({
    'apiKey': `${ FIREBASE_KEY }`,
    'authDomain': `${ AUTHDOMAIN }`
})

export class SignIn extends Component {

    state = { isSignedIn: false }

    uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSucces: () => false
        }

    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                isSignedIn: !!user
            })
        })
    }




    render() {
        return (
            <div>
                {this.state.isSignedIn ?
                    <div>
                        Signed In
                        <button onClick={() => firebase.auth().signOut()}>Get out</button>
                        <h2>Welcome  {firebase.auth().currentUser.displayName}</h2>                    </div>


                    :
                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}


                    />
                }
            </div>
        )
    }
}

export default SignIn
