import React, { useContext } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
} from "@react-pdf/renderer";

const BORDER_COLOR = "#bfbfbf";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 40;
const COLN_WIDTH = (100 - COL1_WIDTH) / 3;
const styles = {
  body: {
    padding: 10,
    backgroundColor: "red",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
};

const Invoice = ({ template }) => {
  console.log(template);
  const { customer, positions, total } = template;

  return (
    <Document>
      <Page>
        <View>
          <Text>{customer.firm}</Text>
          <Text>
            {customer.street} {customer.firm}
          </Text>
          <Text>
            {customer.zip} {customer.city}
          </Text>
          <Text>{customer.country}</Text>
        </View>
        <Page style={styles.body}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1Header}>
                <Text style={styles.tableCellHeader}>Projekt</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Beschreibung</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Stunden</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Preis</Text>
              </View>
            </View>
            {positions.map((position) => {
              return (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>{position.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{position.description}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{position.hours}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {position.hours * customer.hourlyRate}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Page>
      </Page>
    </Document>
  );
};

export default Invoice;
