import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { fetchRepos } from './redux/actions/GitHubAction'

const Repository = React.lazy(() => import('./Repository'))

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }

    }





    render() {

        const { user } = this.props
        const { repositories } = this.props
        const showRepo = repositories.length ? (

            repositories.map(repo => {
                const repoContent = repo.contents_url.replace(`{+path}`, `README.md`)
                console.log(repoContent)
                return <Suspense
                    fallback={<div id='lazy-fetch'>Looking for Repository...</div>}>
                    <Repository repo={repo} key={repo.id} />
                </Suspense>

            }
            )
        ) : (!user ? (<div className='welcome'>Sign in with Github and start searching !</div>) : '')

        return (
            <div>
                {showRepo}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        repositories: state.repositories,
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchRepos: (repoName) => dispatch(fetchRepos(repoName)),


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main)
