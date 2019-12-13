import GitHubReducer from './GitHubReducer'
import { combineReducers } from 'redux'
const initState = {
    repositories: []
}

const rootReducer = combineReducers({
    GitHubReducer,

});
export default rootReducer