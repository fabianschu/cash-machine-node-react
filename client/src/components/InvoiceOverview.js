import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { UiContext } from "../context/UiContext";
import { DataContext } from "../context/DataContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice/Invoice";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  column: {
    fontWeight: "bold",
  },
  button: {
    textDecoration: "none",
    color: "white",
  },
});

const InvoiceOverview = () => {
  const [invoiceTitle, setInvoiceTitle] = useState("");
  const [deactivatedPdfAssembling, setDeactivatedPdfAssembling] = useState(
    true
  );
  const [pdfAssemblingTimeout, setPdfAssemblingTimeout] = useState(0);

  const { closeModal, selectedCustomer, selectedProjects } = useContext(
    UiContext
  );

  const { userProfile, addInvoice, editProjects, invoices } = useContext(
    DataContext
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

  useEffect(() => {
    setPdfAssemblingTimeout(
      setTimeout(function () {
        setDeactivatedPdfAssembling(false);
      }, 500)
    );
  }, []);

  const classes = useStyles();

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

  const handleSubmit = async () => {
    closeModal();
    const { id } = await addInvoice({
      title: invoiceTitle,
      customerId: selectedCustomer.id,
    });
    await editProjects(selectedProjects, { invoiceId: id });
  };

  const handleTextInput = (value) => {
    if (pdfAssemblingTimeout) clearTimeout(pdfAssemblingTimeout);
    setInvoiceTitle(value);
    setDeactivatedPdfAssembling(true);
    setPdfAssemblingTimeout(
      setTimeout(function () {
        setDeactivatedPdfAssembling(false);
      }, 500)
    );
  };

  const formattedCustomerTitle = () => {
    if (selectedCustomer.firm) {
      return selectedCustomer.firm.split(" ").join("_");
    }
    return selectedCustomer.lastName + "_" + selectedCustomer.firstName;
  };

  const formalInvoiceId =
    Math.max(...invoices.map((invoice) => invoice.id)) * 6 + 6000;
  const fileName =
    moment().format("MM-YY") +
    "_" +
    formalInvoiceId +
    "_" +
    formattedCustomerTitle() +
    "_LenaRiegerDesign.pdf";

  const invoiceTemplate = {
    customer: { ...selectedCustomer },
    positions: [...selectedProjects],
    total: getTotal(),
    formalInvoiceId,
    invoiceTitle,
    userProfile,
  };

  return (
    <>
      <DialogTitle id="responsive-dialog-title">Rechnung erstellen</DialogTitle>
      <DialogContent>
        <Box
          mb={3}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box fontWeight="fontWeightBold" mb={1}>
            Kundendetails:
          </Box>
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
        <Box
          mb={3}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            fullWidth
            value={invoiceTitle}
            onChange={(e) => handleTextInput(e.target.value)}
            variant="outlined"
            type="text"
            label="Rechnungstitel"
            size="small"
            margin="normal"
          />
        </Box>
        <Box mb={3}>
          <Box variant="h2" fontWeight="fontWeightBold" mb={1}>
            Positionen:
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
          color="secondary"
          autoFocus
          variant="contained"
          onClick={handleSubmit}
          disabled={deactivatedPdfAssembling}
        >
          {deactivatedPdfAssembling ? (
            "PDF wird erstellt"
          ) : (
            <PDFDownloadLink
              document={<Invoice template={invoiceTemplate} />}
              fileName={fileName}
              className={classes.button}
            >
              {({ blob, url, loading, error }) =>
                loading ? "PDF wird erstellt" : "PDF herunterladen"
              }
            </PDFDownloadLink>
          )}
        </Button>
      </DialogActions>
    </>
  );
};

export default InvoiceOverview;
