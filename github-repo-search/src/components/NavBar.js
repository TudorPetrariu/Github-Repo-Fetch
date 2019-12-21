import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, userIsLoggedIn, signOut } from './redux/actions/authActions'
import { fetchRepos } from './redux/actions/GitHubAction'
import Main from './Main'

export class NavBar extends Component {
    constructor(props) {


        super(props);

        this.state = {
            name: '',
            typing: false,
            typingTimeout: 0,
            user: ''

        }

    }

    sendFetch = () => {
        this.props.fetchRepos(this.state.name)

    }
    inputSearch = (e) => {
        const that = this;
        if (that.state.typingTimeout) {
            clearTimeout(that.state.typingTimeout);
        }
        that.setState({
            name: e.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                that.sendFetch(that.state.name);
            }, 500)
        });
    }


    handleLogIn = () => {

        this.props.signIn()

    }

    componentDidMount() {
        this.props.userIsLoggedIn()


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
                        onChange={this.inputSearch}
                        value={this.state.name}
                        type="text"
                        placeholder="Search repositories..." />
                </li>

                <ul className='right'>
                    <li onClick={this.handleLogOut}>
                        <a>SignOut</a>
                    </li>

                    <li>
                        <a href='#' className='left'>{user.displayName}</a>
                    </li>

                    <li><img src={user.photoURL} /></li>

                </ul>
            </div>

            :
            <div>
                <ul>
                    <li className='right' onClick={this.handleLogIn}><a>SignIn</a></li>
                </ul>
                <li className='brand-logo left'><a>Repo Search</a></li>
            </div>

        return (
            <div>
                <nav className='nav-wrapper'>
                    <div className='container'>
                        {/* <a href='#' className='brand-logo left'>GitHub Repo</a> */}


                        {navLinks}

                    </div>
                </nav>
                {/* <Main /> */}
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
