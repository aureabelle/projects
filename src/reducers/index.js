import { combineReducers } from "redux";
import ProjectsReducer from "./reducer_projects";
import ContributorsReducer from "./reducer_contributors";
import LanguagesReducer from "./reducer_languages";

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  contributors: ContributorsReducer,
  languages: LanguagesReducer
});

export default rootReducer;
