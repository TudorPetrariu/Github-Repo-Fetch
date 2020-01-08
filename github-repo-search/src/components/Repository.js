import React, { Component } from 'react'
import moment from 'moment';
import { connect } from 'react-redux'
import M from 'materialize-css'
const ms = require('pretty-ms')

class Repository extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readme: null,
            usedLanguage: {},
            userRepos: [],
            repoIssues: [],
            timer: 0

        }
    }

    componentDidMount() {
        this.getReadmeInfo()
        let collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
    }

    async fetchRepoAssets(url, options) {
        return await fetch(url, options)
            .then(response => {
                if (response.status === 200)
                    return response.json()
            })
            .then(json => json)
    }

    async  getReadmeInfo() {
        let { token } = this.props
        const { repo } = this.props;
        const userReposUrl = repo.owner.repos_url
        const readmeUrl = repo.contents_url.replace(`{+path}`, `README.md`);
        const repoIssuesUrl = repo.issues_url.replace(`{/number}`, '');
        const usedLanguagesUrl = repo.languages_url
        console.log(repo)
        const headers = { 'Authorization': `Token ${ token } ` }
        const options = {
            'method': 'GET',
            'headers': headers
        }

        try {
            let startTime = new Date().getTime();
            let promisses = await Promise.all([
                this.fetchRepoAssets(readmeUrl, options),
                this.fetchRepoAssets(userReposUrl, options),
                this.fetchRepoAssets(repoIssuesUrl, options),
                this.fetchRepoAssets(usedLanguagesUrl, options)
            ])

            let stopTime = new Date().getTime()
            this.setState({
                readme: promisses[0],
                userRepos: promisses[1],
                repoIssues: promisses[2],
                usedLanguage: promisses[3],
                timer: stopTime - startTime

            })

        } catch (error) {
            console.log(error);
        }
    }


    render() {
        const { repo } = this.props
        const { usedLanguage, userRepos, readme, repoIssues } = this.state
        return (
            <div className="container" key={repo.owner.id}>
                <div className="card">
                    <div className="card-content">
                        <div className="collection with-header">
                            <ul className="collapsible popout">
                                <div className="header">
                                    <div className='avatar'>
                                        <div>{repo.full_name}</div>
                                        <div>
                                            <img src={repo.owner.avatar_url} alt="avatar" />
                                        </div>
                                    </div>
                                    <span className='flow-text'> {repo.description}</span>
                                </div>

                                <li >
                                    <div className="collapsible-header"><i className="material-icons">folder_open</i>Repository Info</div>
                                    <div className="collapsible-body">   <a href="#!" className="collection-item"><span className="badge"> {repo.owner.type}</span>{repo.owner.login}</a>
                                        <a href="#!" className="collection-item"> <span className="badge"> {repo.language}</span> Main Language</a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.forks}</span>Forks count</a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.watchers}</span> Watchers</a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.stargazers_count}</span> Stargazers  </a>
                                        <a href='#!' className="collection-item"><span className="badge">{repo.open_issues}</span> Issues </a>
                                        <a href="#!" className="collection-item"><span className="badge">{moment(repo.created_at).calendar()}</span> Created </a>
                                        <a href="#!" className="collection-item"><span className="badge">{moment(repo.updated_at).calendar()}</span> Updated </a>
                                    </div>
                                </li>

                                <li>
                                    <div className="collapsible-header"><i className="material-icons">language</i>Languages Used</div>
                                    <div className="collapsible-body">
                                        <div className="collection with-header">
                                            {Object.keys(usedLanguage).map((value, i) => <a href='!#' key={i} className="collection-item">{value}  <span className="badge">{usedLanguage[value]} </span></a>)}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">error_outline</i>Issues Details</div>
                                    <div className="collapsible-body">

                                        {Object.keys(repoIssues).map((issue, i) =>
                                            <div key={i} className="collection-header">
                                                <div id='issue-title' className="collection-item">{repoIssues[issue].title}
                                                    <span className="badge white-text orange">Created: {moment(repoIssues[issue].created_at).calendar()}</span>
                                                    <span className="badge white-text green">Updated : {moment(repoIssues[issue].updated_at).calendar()}</span>
                                                    <span className="badge white-text red"> Comments :{repoIssues[issue].comments}</span>
                                                    <p id='issue-message' className='collection-item'> {repoIssues[issue].body}</p> </div>
                                            </div>)}
                                    </div>
                                </li>


                                <li id='repo-info'>
                                    <div className="collapsible-header"><i className="material-icons">content_copye</i>User Repositories</div>
                                    <div className="collapsible-body">
                                        {Object.keys(userRepos).map((value, i) =>
                                            <div key={i} className='collection with-header'>
                                                <div id='user-repository-title' className='collection-item'> {userRepos[value].name}</div>
                                                <span className="badge white-text red">Watchers : {userRepos[value].watchers} </span>
                                                <span className="badge white-text blue">Forks : {userRepos[value].forks}</span>
                                                <span className="badge white-text orange">Issues : {userRepos[value].open_issues}</span>
                                            </div>)}
                                    </div>
                                </li>

                                <li>
                                    <div className="collapsible-header"><i className="material-icons">content_paste</i>Readme Description</div>
                                    <div className="collapsible-body"><span>{readme ? atob(decodeURIComponent(readme.content)) : ''}</span></div>
                                </li>
                            </ul>
                        </div>
                        <div className="time">Time Elapsed : {ms(this.state.timer)}</div>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}


export default connect(mapStateToProps)(Repository)
