import React, { useContext } from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../logo.png";
import moment from "moment";
import lightMuseo from "../assets/light100.ttf";
import regularMuseo from "../assets/normal500.ttf";

const BORDER_COLOR = "#bfbfbf";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 40;
const COLN_WIDTH = (100 - COL1_WIDTH) / 3;
const BOTTOM_MARGIN_BETWEEN_SECTIONS = 30;
const BOTTOM_MARGIN_WITHIN_SECTIONS = 20;

Font.register({ family: "Museo", src: lightMuseo, fontWeight: "light" });
Font.register({ family: "Museo", src: regularMuseo, fontWeight: "regular" });

const styles = StyleSheet.create({
  body: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    fontFamily: "Museo",
    fontWeight: "regular",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginBottom: BOTTOM_MARGIN_BETWEEN_SECTIONS,
  },
  image: {
    width: "60px",
  },
  customerAddress: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  metaInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: BOTTOM_MARGIN_BETWEEN_SECTIONS,
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
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  centeredContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  thanks: {
    marginTop: 15,
    fontFamily: "Museo",
    fontWeight: "light",
  },
});

const Invoice = ({ template }) => {
  const { customer, positions, total } = template;
  const {
    firm,
    firstName,
    lastName,
    zip,
    street,
    city,
    country,
    taxId,
    hourlyRate,
  } = customer;
  const { totalHours, totalPrice } = total;
  const date = moment().format("DD|MM|YYYY");

  return (
    <Document>
      <Page style={styles.body}>
        <View></View>
        <View style={styles.header}>
          <Image src={logo} style={styles.image} />
          <View style={styles.centeredContent}>
            <Text>Brijitte Musterfrau</Text>
            <Text>Franz-Joseph-Str. 102</Text>
            <Text>48372 Cottbus</Text>
          </View>
          <View style={styles.customerAddress}>
            <Text>{firm}</Text>
            <Text>{street}</Text>
            <Text>
              {zip} {city}
            </Text>
            <Text>{country}</Text>
          </View>
          <View style={styles.metaInfo}>
            <Text>Rechnungsnummer 12624</Text>
            <Text>{date}</Text>
          </View>
        </View>
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
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>Gesamt</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{totalHours}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{totalPrice}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.centeredContent}>
            <Text>
              *Steuerschuldnerschaft des Leistungsempfängers (Reverse Charge)
            </Text>
            <Text>Zahlbar innerhalb von 15 Tagen ab Rechnungsdatum.</Text>
            <Text style={styles.thanks}>Vielen Dank für das Projekt!</Text>
          </View>
          <View style={styles.centeredContent}>
            <Text>Faky McFake • Fakyfake Straße 64 • 12345 Fakehausen</Text>
            <Text>
              IBAN: DE20 1111 0000 1111 1111 11 BIC: FAKYFAKYE2 Steuernummer:
              111 / 111 / 111111 UID: DE 111 111 111
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
