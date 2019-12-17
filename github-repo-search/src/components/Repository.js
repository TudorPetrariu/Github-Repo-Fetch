import React, { Component } from 'react'
import M from 'materialize-css'
const ms = require('pretty-ms')

const TOKEN_KEY = process.env.REACT_APP_GITHUB_API_KEY

class Repository extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readme: null,
            usedLanguage: {},
            userRepos: [],
            repoIssues: []

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
        const { repo } = this.props;
        const userReposUrl = repo.owner.repos_url
        const readmeUrl = repo.contents_url.replace(`{+path}`, `README.md`);
        const repoIssuesUrl = repo.issues_url.replace(`{/number}`, '');
        const usedLanguagesUrl = repo.languages_url
        const headers = { 'Authorization': `Token ${ TOKEN_KEY } ` }
        const options = {
            'method': 'GET',
            'headers': headers
        }

        try {
            // this.props.startTimer()

            let promisses = await Promise.all([
                this.fetchRepoAssets(readmeUrl, options),
                this.fetchRepoAssets(userReposUrl, options),
                this.fetchRepoAssets(repoIssuesUrl, options),
                this.fetchRepoAssets(usedLanguagesUrl, options),
            ])

            this.setState({
                readme: promisses[0],
                userRepos: promisses[1],
                repoIssues: promisses[2],
                usedLanguage: promisses[3],

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
                                <li className="collection-header">
                                    <h5>{repo.full_name}</h5>
                                    <span className='flow-text'> {repo.description}</span>
                                    <div className='card-image'>
                                        <img src={repo.owner.avatar_url} alt="avatar" />
                                    </div>

                                </li>
                                <h3>timer: {ms(this.props.time)}</h3>


                                <li>
                                    <div className="collapsible-header"><i className="material-icons">folder_open</i>Repository Info</div>
                                    <div className="collapsible-body">   <a href="#!" className="collection-item"><span className="badge"> {repo.owner.type}</span>{repo.owner.login}</a>
                                        <a href="#!" className="collection-item"> <span className="badge"> {repo.language}</span> Main Language</a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.forks}</span>Forks count</a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.watchers}</span> Watchers</a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.stargazers_count}</span>Stargazers  </a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.open_issues}</span> Issues </a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.created_at}</span> Created </a>
                                        <a href="#!" className="collection-item"><span className="badge">{repo.updated_at}</span> Updated </a>


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
                                        <div className="collection with-header">
                                            {Object.keys(repoIssues).map((issue, i) =>

                                                <div key={i} className="collection-header">
                                                    <a href="!#" className="collection-item">{repoIssues[issue].title}</a>
                                                    <a className="badge white-text orange">Created at :{repoIssues[issue].created_at}</a>
                                                    <a className="badge white-text green">Updated at :{repoIssues[issue].updated_at}</a>
                                                    <a className="badge white-text red">Comments : {repoIssues[issue].comments}</a>
                                                    <a className='collection-item'>Message : {repoIssues[issue].body}</a>
                                                </div>)}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">content_copye</i>User Repositories</div>
                                    <div className="collapsible-body">
                                        <div className='collection with-header'>
                                            {Object.keys(userRepos).map((value, i) =>
                                                <div key={i} className='collection with-header'>
                                                    <a href="!#" className='collection-item'> {userRepos[value].name}
                                                        <span className="badge white-text red">Watchers : {userRepos[value].watchers} </span>
                                                        <span className="badge white-text blue">Forks : {userRepos[value].forks}</span>
                                                        <span className="badge white-text yellow">Issues : {userRepos[value].open_issues}</span>
                                                    </a>
                                                </div>)}
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="collapsible-header"><i className="material-icons">content_paste</i>Readme Description</div>
                                    <div className="collapsible-body"><span>{readme ? atob(decodeURIComponent(readme.content)) : ''}</span></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>


        )
    }

}

export default Repository
