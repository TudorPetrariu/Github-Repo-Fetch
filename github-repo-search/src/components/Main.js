import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchRepos } from './redux/actions/GitHubAction'
import Repository from './Repository'


export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            time: 0,
            isOn: false,
            start: 0
        }
    }

    startTimer = () => {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
    }

    stopTimer = () => {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }
    resetTimer = () => {
        this.setState({ time: 0, isOn: false })
    }

    render() {

        const { repositories } = this.props
        const showRepo = repositories.length ? (
            repositories.map(repo => {
                const repoContent = repo.contents_url.replace(`{+path}`, `README.md`)
                console.log(repoContent)
                return < Repository repo={repo} key={repo.id} startTimer={this.startTimer} time={this.state.time} resetTimer={this.resetTimer} stopTimer={this.stopTimer} />
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

        repositories: state.repositories
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchRepos: (repoName) => dispatch(fetchRepos(repoName)),


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main)
