import React, { useContext } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { UiContext } from "../context/UiContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  column: {
    fontWeight: "bold",
  },
});

const InvoiceOverview = () => {
  const { closeModal, selectedCustomer, selectedProjects } = useContext(
    UiContext
  );
  const {
    firm,
    street,
    zip,
    city,
    country,
    taxId,
    hourlyRate,
  } = selectedCustomer;
  const classes = useStyles();
  console.log(selectedProjects);

  const getTotal = () => {
    const result = selectedProjects.reduce(
      (acc, currentVal) => {
        return (currentVal = {
          totalHours: acc.totalHours + currentVal.hours,
          totalPrice: acc.totalPrice + currentVal.hours * hourlyRate,
        });
      },
      {
        totalHours: 0,
        totalPrice: 0,
      }
    );
    return result;
  };

  const { totalHours, totalPrice } = getTotal();

  const invoiceTemplate = {
    customer: { ...selectedCustomer },
    positions: [...selectedProjects],
    total: getTotal(),
  };

  return (
    <>
      <DialogTitle id="responsive-dialog-title">Rechnung erstellen</DialogTitle>
      <DialogContent>
        <Box fontWeight="fontWeightBold" mb={1}>
          Kundendetails
        </Box>
        <Box
          mb={3}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box>
            <Box>{firm}</Box>
            <Box>{street}</Box>
            <Box>
              {zip} {city}
            </Box>
            <Box>{country}</Box>
          </Box>
          <Box>
            <Box>
              Steuernummer: <span>{taxId}</span>
            </Box>
            <Box>
              Stundensatz: <span>€{hourlyRate}</span>
            </Box>
          </Box>
        </Box>
        <Box mb={3}>
          <Box variant="h2" fontWeight="fontWeightBold" mb={1}>
            Positionen
          </Box>
          <TableContainer component={Paper} variant="outlined">
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Projekt</TableCell>
                  <TableCell>Beschreibung</TableCell>
                  <TableCell align="right">Stunden</TableCell>
                  <TableCell align="right">Preis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell align="right">{project.hours}</TableCell>
                    <TableCell align="right">
                      €{(project.hours * hourlyRate).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className={classes.column}>total</TableCell>
                  <TableCell className={classes.column}>netto</TableCell>
                  <TableCell className={classes.column} align="right">
                    {totalHours}
                  </TableCell>
                  <TableCell className={classes.column} align="right">
                    €{totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeModal} color="primary">
          Abbrechen
        </Button>
        <Button
          color="primary"
          autoFocus
          variant="contained"
          type="submit"
          // onClick={handleSubmit(props.values)}
        >
          <PDFDownloadLink
            document={<Invoice template={invoiceTemplate} />}
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        </Button>
      </DialogActions>
    </>
  );
};

export default InvoiceOverview;
