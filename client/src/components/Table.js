import React from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  saveProject,
  updateProject,
  deleteProject,
  toggleProjectSelection,
} from "../redux/actions/projectsAction";

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddCircleIcon {...props} ref={ref} color="secondary" />
  )),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} ref={ref} color="secondary" />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} ref={ref} color="secondary" />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Table = (props) => {
  const dispatch = useDispatch();
  const { useState } = React;
  const projects = useSelector(
    ({ projectsReducer }) => projectsReducer.projects
  );
  const customerId = useSelector(
    ({ customersReducer }) => customersReducer.selectedCustomer.id
  );

  const currentProjects = () =>
    projects.filter(
      (project) => !project.invoiceId && project.customerId === customerId
    );

  const [columns] = useState([
    { title: "Projekt", field: "name", width: 200 },
    {
      title: "Beschreibung",
      field: "description",
      editComponent: (props) => (
        <TextField
          type="text"
          multiline
          fullWidth
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      title: "Stunden",
      field: "hours",
      type: "numeric",
      width: 100,
    },
    {
      title: "Zuletzt bearbeitet",
      field: "updatedAt",
      type: "date",
      defaultSort: "desc",
      width: 100,
      editable: "never",
    },
  ]);

  return (
    <div style={{ width: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            width: "1000px",
          },
          selection: true,
        }}
        onSelectionChange={(projects) =>
          dispatch(toggleProjectSelection(projects))
        }
        title="Projekte"
        components={{
          Container: (props) => <Paper {...props} elevation={2} />,
        }}
        columns={columns}
        data={currentProjects()}
        editable={{
          onRowAdd: async (projectData) => {
            await dispatch(saveProject({ ...projectData, customerId }));
          },
          onRowDelete: async (projectData) => {
            await dispatch(deleteProject(projectData.id));
          },
          onRowUpdate: async (projectData) => {
            await dispatch(updateProject({ ...projectData, customerId }));
          },
        }}
      />
    </div>
  );
};

export default Table;
