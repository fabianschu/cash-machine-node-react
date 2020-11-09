import React from "react";
import { View, Text, Font, StyleSheet } from "@react-pdf/renderer";
import {
  invoiceTotal,
  invoiceHours,
  formatPrice,
} from "../../helpers/invoiceHelpers";
import lightMuseo from "../../assets/light100.ttf";
import regularMuseo from "../../assets/normal500.ttf";

const BORDER_COLOR = "#000";
const BORDER_STYLE = "solid";
const BORDER_WIDTH = 0.5;
const COL1_WIDTH = 25;
const COL2_WIDTH = 53;
const COL3_WIDTH = 10;
const COL4_WIDTH = 12;
const BOTTOM_MARGIN_BETWEEN_SECTIONS = 30;

Font.register({ family: "Museo", src: lightMuseo, fontWeight: "light" });
Font.register({ family: "Museo", src: regularMuseo, fontWeight: "regular" });

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    fontFamily: "Museo",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: BORDER_WIDTH,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: BOTTOM_MARGIN_BETWEEN_SECTIONS,
    fontSize: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: BORDER_WIDTH,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginTop: -0.2,
    marginBottom: -0.2,
  },
  col1: {
    width: COL1_WIDTH + "%",
    display: "flex",
    justifyContent: "center",
  },
  col2: {
    width: COL2_WIDTH + "%",
    borderRightWidth: BORDER_WIDTH * 2,
    borderLeftWidth: BORDER_WIDTH * 2,
  },
  col3: {
    width: COL3_WIDTH + "%",
    borderRightWidth: BORDER_WIDTH,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  col4: {
    width: COL4_WIDTH + "%",
    textAlign: "right",
    display: "flex",
    justifyContent: "center",
  },
  tableColHeader: {
    fontWeight: "bold",
  },
  tableCellHeader: {
    margin: 5,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    fontWeight: "light",
  },
  boldTableCell: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  flexEnd: {
    justifySelf: "flex-end",
  },
  bold: {
    fontWeight: "bold",
  },
  subtotal: {
    fontWeight: "bold",
    textAlign: "right",
  },
  smallFont: {
    fontSize: 9,
  },
  alignRight: {
    textAlign: "right",
  },
});

const Table = (props) => {
  const { positions, tax, hourlyRate } = props;
  const { netTotal, taxes, grossTotal } = invoiceTotal(positions, hourlyRate);
  const totalHours = invoiceHours(positions);

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={{ ...styles.tableColHeader, ...styles.col1 }}>
          <Text style={styles.tableCellHeader}>Projekt</Text>
        </View>
        <View style={{ ...styles.tableColHeader, ...styles.col2 }}>
          <Text style={styles.tableCellHeader}>Beschreibung</Text>
        </View>
        <View style={{ ...styles.tableColHeader, ...styles.col3 }}>
          <Text style={styles.tableCellHeader}>Stunden</Text>
        </View>
        <View style={{ ...styles.tableColHeader, ...styles.col4 }}>
          <Text style={styles.tableCellHeader}>Preis</Text>
        </View>
      </View>
      {positions.map((position) => {
        return (
          <View style={styles.tableRow} key={position.id}>
            <View style={{ ...styles.tableCol, ...styles.col1 }}>
              <Text style={styles.tableCell}>{position.name}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col2 }}>
              <Text style={{ ...styles.tableCell, ...styles.smallFont }}>
                {position.description}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col3 }}>
              <Text style={styles.tableCell}>{position.hours}</Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col4 }}>
              <Text style={styles.tableCell}>
                {formatPrice(position.hours * hourlyRate)}
              </Text>
            </View>
          </View>
        );
      })}
      {tax && (
        <>
          <View style={{ ...styles.tableRow, ...styles.bold }}>
            <View style={{ ...styles.tableCol, ...styles.col1 }}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col2 }}>
              <Text
                style={{
                  ...styles.boldTableCell,
                  ...styles.alignRight,
                }}
              >
                Zwischensumme
              </Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col3 }}>
              <Text style={{ ...styles.tableCell, ...styles.bold }}>
                {totalHours}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col4 }}>
              <Text style={styles.boldTableCell}>{formatPrice(netTotal)}</Text>
            </View>
          </View>
          <View style={{ ...styles.tableRow, ...styles.bold }}>
            <View style={{ ...styles.tableCol, ...styles.col1 }}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col2 }}>
              <Text
                style={{
                  ...styles.tableCell,
                  ...styles.smallFont,
                  ...styles.alignRight,
                }}
              >
                + 16% USt
              </Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col3 }}>
              <Text style={{ ...styles.tableCell }}></Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.col4 }}>
              <Text style={styles.tableCell}>{formatPrice(taxes)}</Text>
            </View>
          </View>
        </>
      )}
      <View style={{ ...styles.tableRow, ...styles.bold }}>
        <View style={{ ...styles.tableCol, ...styles.col1 }}>
          <Text style={styles.boldTableCell}>Gesamt</Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.col2 }}>
          <Text style={{ ...styles.boldTableCell, ...styles.alignRight }}>
            {tax && "inkl. USt"}
          </Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.col3 }}>
          <Text></Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.col4 }}>
          <Text style={styles.boldTableCell}>
            {tax ? formatPrice(grossTotal) : formatPrice(netTotal)}
            {!tax && "*"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Table;
