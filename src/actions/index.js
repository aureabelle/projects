import axios from "axios";

const token = 'token 7a6a5bcb6b613cb99711aec9f9845fa358a3d068';

export const FETCH_PROJECTS = "FETCH_PROJECTS";
export const FETCH_CONTRIBUTORS = "FETCH_CONTRIBUTORS";

export function fetchProjects() {
  const url = 'https://api.github.com/orgs/facebook/repos?per_page=500';
  const request = axios.get(url, {
      headers: {
        "Accept": "application/vnd.github.inertia-preview+json",
        "Authorization": token
      }
    });

  return {
    type: FETCH_PROJECTS,
    payload: request
  };
}

export function fetchContributors(url) {
  const request = axios.get(url, {
      headers: {
        "Accept": "application/vnd.github.inertia-preview+json",
        "Authorization": token
      }
    });

  return {
    type: FETCH_CONTRIBUTORS,
    payload: request
  };
}