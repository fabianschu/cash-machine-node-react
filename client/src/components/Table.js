import React, { useContext } from "react";
import { forwardRef } from "react";
import axios from "axios";
import { CustomersContext } from "../context/CustomersContext";
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
import { UiContext } from "../context/UiContext";
import Paper from "@material-ui/core/Paper";

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
  const { useState } = React;
  const customerId = 2;
  const { setProjects } = useContext(CustomersContext);
  const { mode, selectedProjects, setSelectedProjects } = useContext(UiContext);

  let { rows } = props;

  rows = rows.map((row) => {
    if (
      selectedProjects
        .map((selectedProject) => selectedProject.id)
        .includes(row.id)
    ) {
      return {
        ...row,
        tableData: {
          ...row.tableData,
          checked: true,
        },
      };
    }
    return {
      ...row,
      tableData: {
        ...row.tableData,
        checked: false,
      },
    };
  });

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
        onSelectionChange={(rows) => setSelectedProjects(rows)}
        title="Projekte"
        components={{
          Container: (props) => <Paper {...props} elevation={2} />,
        }}
        columns={columns}
        data={rows}
        editable={{
          onRowAdd: async (newData) => {
            try {
              await axios.post(
                `http://localhost:5000/customers/${customerId}/projects`,
                newData
              );
              const response = await axios.get(
                `http://localhost:5000/customers/${customerId}/projects`
              );
              setProjects(response.data);
            } catch (error) {
              console.log(error);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            try {
              await axios.put(
                `http://localhost:5000/customers/${customerId}/projects/${oldData.id}`,
                newData
              );
              const response = await axios.get(
                `http://localhost:5000/customers/${customerId}/projects`
              );
              setProjects(response.data);
            } catch (error) {
              console.log(error);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              await axios.delete(
                `http://localhost:5000/customers/${customerId}/projects/${oldData.id}`
              );
              const response = await axios.get(
                `http://localhost:5000/customers/${customerId}/projects`
              );
              setProjects(response.data);
            } catch (error) {
              console.log(error);
            }
          },
        }}
      />
    </div>
  );
};

export default Table;
