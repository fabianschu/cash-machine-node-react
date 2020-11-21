import React, { createContext } from "react";
import useAxios from "../hooks/useAxios";

const ProjectContext = createContext();

const ProjectContextProvider = ({ children }) => {
  const [projects, loading, postProject, putProject, deleteProject] = useAxios(
    "/projects",
    []
  );

  const defaultContext = {
    projects,
    loading,
    postProject,
    putProject,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={defaultContext}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectContextProvider };
