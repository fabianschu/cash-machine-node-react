import {
  GET_PROJECTS_STARTED,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SAVE_PROJECT_STARTED,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_FAILURE,
  UPDATE_PROJECT_STARTED,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  SELECT_PROJECT,
  TOGGLE_PROJECT_CREATION,
  TOGGLE_PROJECT_EDIT,
} from "../types";

import axios from "../apiClient";

export function fetchProjects() {
  return function (dispatch) {
    dispatch(getProjectsStarted());
    return axios
      .get(`/projects`)
      .then(({ data }) => {
        dispatch(getProjectsSuccess(data));
      })
      .catch((err) => {
        dispatch(getProjectsFailure(err.message));
      });
  };
}

const getProjectsStarted = () => ({
  type: GET_PROJECTS_STARTED,
});

const getProjectsSuccess = (projects) => ({
  type: GET_PROJECTS_SUCCESS,
  payload: [...projects],
});

const getProjectsFailure = (error) => ({
  type: GET_PROJECTS_FAILURE,
  payload: {
    error,
  },
});

export function saveProject(project) {
  return async (dispatch) => {
    dispatch(saveProjectStarted());
    try {
      const { data } = await axios.post(`/projects`, project);
      dispatch(saveProjectSuccess(data));
      dispatch(fetchProjects());
    } catch (err) {
      dispatch(saveProjectFailure(err.message));
    }
  };
}

const saveProjectStarted = () => ({
  type: SAVE_PROJECT_STARTED,
});

const saveProjectSuccess = (project) => ({
  type: SAVE_PROJECT_SUCCESS,
  payload: {
    project,
  },
});

const saveProjectFailure = (error) => ({
  type: SAVE_PROJECT_FAILURE,
  payload: {
    error,
  },
});

export function updateProject(project) {
  return function (dispatch) {
    dispatch(updateProjectStarted());
    return axios
      .post(`/projects/${project.id}`, project)
      .then(({ data }) => {
        dispatch(updateProjectSuccess(data));
      })
      .catch((err) => {
        dispatch(updateProjectFailure(err.message));
      });
  };
}

const updateProjectStarted = () => ({
  type: UPDATE_PROJECT_STARTED,
});

const updateProjectSuccess = (project) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: {
    project,
  },
});

const updateProjectFailure = (error) => ({
  type: UPDATE_PROJECT_FAILURE,
  payload: {
    error,
  },
});

export const selectProject = (customerId) => ({
  type: SELECT_PROJECT,
  payload: {
    customerId,
  },
});

export const toggleProjectCreation = () => ({
  type: TOGGLE_PROJECT_CREATION,
});

export const toggleProjectEdit = () => ({
  type: TOGGLE_PROJECT_EDIT,
});
