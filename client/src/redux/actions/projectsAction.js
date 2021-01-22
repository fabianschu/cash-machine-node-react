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
  TOGGLE_PROJECT_SELECTION,
  TOGGLE_PROJECT_CREATION,
  TOGGLE_PROJECT_EDIT,
  DELETE_PROJECT_STARTED,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  BULK_UPDATE_PROJECTS_STARTED,
  BULK_UPDATE_PROJECTS_SUCCESS,
  BULK_UPDATE_PROJECTS_FAILURE,
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
  payload: projects,
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

export const updateProject = (project) => {
  return async (dispatch) => {
    dispatch(updateProjectStarted());
    try {
      const { data } = await axios.put(`/projects/${project.id}`, project);
      dispatch(updateProjectSuccess(data));
      dispatch(fetchProjects());
    } catch (err) {
      dispatch(updateProjectFailure(err.message));
    }
  };
};

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

export const bulkUpdateProjects = (payload, projectIds) => {
  return async (dispatch) => {
    dispatch(bulkUpdateProjectsStarted());
    try {
      await axios.put(`/projects`, { ids: projectIds, payload });
      dispatch(bulkUpdateProjectsSuccess());
      dispatch(fetchProjects());
    } catch (err) {
      dispatch(bulkUpdateProjectsFailure(err.message));
    }
  };
};

const bulkUpdateProjectsStarted = () => ({
  type: BULK_UPDATE_PROJECTS_STARTED,
});

const bulkUpdateProjectsSuccess = (project) => ({
  type: BULK_UPDATE_PROJECTS_SUCCESS,
});

const bulkUpdateProjectsFailure = (error) => ({
  type: BULK_UPDATE_PROJECTS_FAILURE,
  payload: {
    error,
  },
});

export const toggleProjectSelection = (projects) => {
  return {
    type: TOGGLE_PROJECT_SELECTION,
    payload: projects,
  };
};

export const toggleProjectCreation = () => ({
  type: TOGGLE_PROJECT_CREATION,
});

export const toggleProjectEdit = () => ({
  type: TOGGLE_PROJECT_EDIT,
});

export const deleteProject = (projectId) => {
  return async (dispatch) => {
    dispatch(deleteProjectStarted());
    try {
      const { data } = await axios.delete(`/projects/${projectId}`);
      dispatch(deleteProjectSuccess(data));
      dispatch(fetchProjects());
    } catch (err) {
      dispatch(deleteProjectFailure(err.message));
    }
  };
};

const deleteProjectStarted = () => ({
  type: DELETE_PROJECT_STARTED,
});

const deleteProjectSuccess = (project) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: {
    project,
  },
});

const deleteProjectFailure = (error) => ({
  type: DELETE_PROJECT_FAILURE,
  payload: {
    error,
  },
});
