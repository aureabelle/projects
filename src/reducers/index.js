import { combineReducers } from "redux";
import ProjectsReducer from "./reducer_projects";
import ContributorsReducer from "./reducer_contributors";

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  contributors: ContributorsReducer
});

export default rootReducer;
