import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, userIsLoggedIn, signOut } from './redux/actions/authActions'
import { fetchRepos } from './redux/actions/GitHubAction'

export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            typingTimeout: 0,
            user: ''
        }
    }

    componentDidMount() {
        this.props.userIsLoggedIn()
    }

    sendFetch = () => this.props.fetchRepos(this.state.name)

    handleSearch = (e) => {
        const that = this;

        if (that.state.typingTimeout) {
            clearTimeout(that.state.typingTimeout);
        }
        that.setState({
            name: e.target.value,
            typingTimeout: setTimeout(function () {
                that.sendFetch(that.state.name);
            }, 600)
        });
    }


    handleLogIn = () => {
        this.props.signIn()
    }

    handleLogOut = () => {
        this.props.signOut()
        this.setState({
            name: ''
        });
        this.props.fetchRepos(null)
    }


    render() {
        const { user } = this.props
        const navLinks = user ?
            <div>
                <li className='left'>
                    <input className='input-field'
                        onChange={this.handleSearch}
                        value={this.state.name}
                        type="text"
                        placeholder="Search repositories..." />
                </li>

                <ul className='right'>
                    <li onClick={this.handleLogOut}>
                        <a href='#!'>SignOut</a>
                    </li>
                    <li className='hide-on-small-only left'>{user.displayName}</li>
                    <li ><img src={user.photoURL} alt='userImage' /></li>
                </ul>
            </div>

            :
            <div>
                <ul>
                    <li className='right' onClick={this.handleLogIn}><a href='#!'>SignIn</a></li>
                </ul>
                <li className='brand-logo left'><a href='#!'>Repo Search</a></li>
            </div>

        return (
            <div>
                <nav className='nav-wrapper'>
                    <div className='container'>
                        {navLinks}
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        token: state.token,
        repositories: state.repositories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signIn()),
        userIsLoggedIn: () => dispatch(userIsLoggedIn()),
        signOut: () => dispatch(signOut()),
        fetchRepos: (repoName) => dispatch(fetchRepos(repoName)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
