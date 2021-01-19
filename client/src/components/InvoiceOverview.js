import React, { useState, useEffect } from "react";
import moment from "moment";
import { saveAs } from "file-saver";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import Invoice from "./Invoice/Invoice";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { saveInvoice } from "../redux/actions/invoicesAction";
import StyledDialogActions from "../styled/DialogActions";
import StyledSoftButton from "../styled/SoftButton";
import StyledSubHeading from "../styled/SubHeading";
import { taxRate } from "../helpers/invoiceHelpers";

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
    fontSize: "1.8rem",
  },
});

const InvoiceOverview = () => {
  const [invoiceTitle, setInvoiceTitle] = useState("");
  const [pdfCreated, setPdfCreated] = useState(false);

  const [pdfAssemblingTimeout, setPdfAssemblingTimeout] = useState(0);

  const selectedProjects = useSelector(
    ({ projectsReducer }) => projectsReducer.selectedProjects
  );
  const selectedCustomer = useSelector(
    ({ customersReducer }) => customersReducer.selectedCustomer
  );
  const userProfile = useSelector(({ userReducer }) => userReducer.user);
  const maxInvoiceId = Math.max(
    ...useSelector(({ invoicesReducer }) =>
      invoicesReducer.invoices.map((invoice) => invoice.id)
    )
  );
  const dispatch = useDispatch();

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

  const handleTextInput = (value) => {
    if (pdfAssemblingTimeout) clearTimeout(pdfAssemblingTimeout);
    setInvoiceTitle(value);
  };

  const formattedCustomerTitle = () => {
    if (selectedCustomer.firm) {
      return selectedCustomer.firm.split(" ").join("_");
    }
    return selectedCustomer.lastName + "_" + selectedCustomer.firstName;
  };

  const formalInvoiceId = maxInvoiceId * 6 + 6000;

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

  const generatePdfDocument = async () => {
    const blob = await pdf(<Invoice template={invoiceTemplate} />).toBlob();
    saveAs(blob, fileName);
    dispatch(
      saveInvoice(
        {
          title: invoiceTitle,
          customerId: selectedCustomer.id,
          totalHours: totalHours,
          totalSum: Math.round(totalPrice * 100),
          taxRate:
            (selectedCustomer.country === "Deutschland" && taxRate) || null,
        },
        selectedProjects.map((project) => project.id)
      )
    );
  };

  return (
    <>
      <DialogTitle>
        <StyledSubHeading>Rechnung erstellen</StyledSubHeading>
      </DialogTitle>
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
      <StyledDialogActions>
        <StyledSoftButton
          onClick={() => dispatch({ type: "TOGGLE_INVOICE_CREATION" })}
        >
          Abbrechen
        </StyledSoftButton>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          onClick={generatePdfDocument}
        >
          PDF
        </Button>
      </StyledDialogActions>
    </>
  );
};

export default InvoiceOverview;
