import { FETCH_REPO_REQUEST, FETCH_REPO_SUCCES, FETCH_REPO_FAILURE } from '../types';

export const fetchRepoRequest = () => {
    return {
        type: FETCH_REPO_REQUEST
    };
};

export const fetchRepoSucces = (repositories) => {
    return {
        type: FETCH_REPO_SUCCES,
        payload: repositories
    };
};
export const fetchRepoFailure = (error) => {
    return {
        type: FETCH_REPO_FAILURE,
        payload: error
    };
};

export const fetchRepos = (repoName) => {

    let token = localStorage.getItem('token')
    const repoCount = 5
    const headers = { 'Authorization': `Token ${ token }` }
    return (dispatch) => {
        if (!repoName) {
            dispatch(fetchRepoSucces([]))
        } else {
            dispatch(fetchRepoRequest());
            fetch((`https://api.github.com/search/repositories?q=${ repoName }&per_page=${ repoCount }`), {
                method: 'GET',
                "headers": headers
            }).then((res) => {
                console.log(res);
                return res.json();
            }).then((json) => {
                console.log(json);
                dispatch(fetchRepoSucces(json.items));
            }).catch((error) => {
                console.log(error);
                dispatch(fetchRepoFailure(error.message));
            });
        }
    };
};

export const fetchRepoAssets = async (url, options) => {
    return await fetch(url, options)
        .then(response => {
            if (response.status === 200)
                return response.json()
        }).then(json => json)
}

