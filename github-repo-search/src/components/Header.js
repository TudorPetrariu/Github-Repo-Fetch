import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRepos } from './redux/actions/GitHubAction'


export class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "",

        }
    }

    render() {

        return (
            <div>

                <nav className="nav-wrapper">
                    <div className="input-field">
                        <input onChange={(e) => this.setState({ 'name': e.target.value }, () => this.props.fetchRepos(this.state.name))} value={this.state.name} id="search" type="search" required></input>
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <i className="material-icons">close</i>
                    </div>
                </nav>
                {/* <button onChange={() => this.props.fetchRepos(this.state.name)}>Search</button> */}

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        repositories: state.repositories
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchRepos: (repoName) => dispatch(fetchRepos(repoName)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
