import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRepos } from './redux/actions/GitHubAction'
import Repository from './Repository'



export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
        }
    }


    render() {

        const { repositories } = this.props

        const showRepo = repositories.length ? (
            repositories.map(repo => {
                const repoContent = repo.contents_url.replace(`{+path}`, `README.md`)
                console.log(repoContent)
                return < Repository repo={repo} key={repo.id} />
            })
        ) : (
                <div>No repos yet</div>
            )

        return (
            <div>
                {showRepo}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

        repositories: state.repositories,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchRepos: (repoName) => dispatch(fetchRepos(repoName)),


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main)
