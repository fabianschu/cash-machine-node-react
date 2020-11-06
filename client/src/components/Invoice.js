import React from "react";
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
import brandonLight from "../assets/brandonLight.ttf";
import brandonMedium from "../assets/brandonMedium.ttf";
import gretaRegular from "../assets/gretaRegular.ttf";

const BORDER_COLOR = "#000";
const BORDER_STYLE = "solid";
const BORDER_WIDTH = 0.5;
const COL1_WIDTH = 25;
const COL2_WIDTH = 53;
const COL3_WIDTH = 10;
const COL4_WIDTH = 12;
const MAIN_MARGIN = 40;
const BOTTOM_MARGIN_BETWEEN_SECTIONS = 30;
const BOTTOM_MARGIN_WITHIN_SECTIONS = 20;
const DEFAULT_FONT_SIZE = 11;

Font.register({ family: "Museo", src: lightMuseo, fontWeight: "light" });
Font.register({ family: "Museo", src: regularMuseo, fontWeight: "regular" });
Font.register({
  family: "brandonLight",
  src: brandonLight,
  fontWeight: "light",
});
Font.register({
  family: "gretaRegular",
  src: gretaRegular,
  fontWeight: "regular",
});

const styles = StyleSheet.create({
  body: {
    padding: MAIN_MARGIN,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    fontFamily: "Museo",
    fontWeight: "light",
    fontSize: DEFAULT_FONT_SIZE,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginBottom: BOTTOM_MARGIN_BETWEEN_SECTIONS,
  },
  image: {
    width: "40px",
    marginBottom: BOTTOM_MARGIN_BETWEEN_SECTIONS,
  },
  ownName: {
    textTransform: "capitalize",
    color: "grey",
    marginBottom: BOTTOM_MARGIN_WITHIN_SECTIONS,
    fontFamily: "Museo",
    fontWeight: "light",
  },
  greenText: {
    color: "#559495",
    fontSize: 9,
    fontWeight: "thin",
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
  invoiceTitle: {
    fontFamily: "brandonMedium",
    marginBottom: BOTTOM_MARGIN_WITHIN_SECTIONS,
  },
  table: {
    display: "table",
    width: "auto",
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
  serif: {
    fontFamily: "gretaRegular",
  },
  spacer: {
    marginBottom: BOTTOM_MARGIN_WITHIN_SECTIONS,
  },
  bigSpacer: {
    marginBottom: BOTTOM_MARGIN_WITHIN_SECTIONS * 2,
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

const Invoice = ({ template }) => {
  const {
    customer,
    positions,
    total,
    invoiceTitle,
    userProfile,
    formalInvoiceId,
  } = template;
  const { firm, zip, street, city, country, taxId } = customer;
  const { totalHours, totalPrice } = total;
  const date = moment().format("DD|MM|YYYY");
  const taxRate = 0.16;

  const formatName = (name) => {
    if (!name) return;
    return name.toUpperCase().split("").join(" ");
  };

  const withTax = () => {
    if (country === "Deutschland") return true;
    return false;
  };

  const totalTax = (price) => {
    return price * taxRate;
  };

  const grossPrice = totalPrice * (1 + taxRate);

  const formatPrice = (total) => {
    return total.toFixed(2).toString().replace(".", ",") + " €";
  };

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          <Image src={logo} style={styles.image} />
          <View
            style={{
              ...styles.centeredContent,
              ...styles.serif,
              ...styles.bigSpacer,
            }}
          >
            <Text style={styles.ownName}>{formatName(userProfile.name)}</Text>
            <Text style={styles.greenText}>
              {userProfile.street} • {userProfile.zip} {userProfile.city}
            </Text>
            <Text style={styles.greenText}>{userProfile.email}</Text>
            <Text style={styles.greenText}>{userProfile.phone}</Text>
          </View>
          <View style={{ ...styles.customerAddress, ...styles.spacer }}>
            <Text>{firm}</Text>
            <Text>{street}</Text>
            <Text>
              {zip} {city}
            </Text>
            <Text>{country}</Text>
          </View>
          <View style={styles.metaInfo}>
            <Text>UID {taxId}</Text>
            <Text>Rechnungsnummer {formalInvoiceId}</Text>
            <Text>{date}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>{invoiceTitle}</Text>
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
                <View style={styles.tableRow}>
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
                      {formatPrice(position.hours * customer.hourlyRate)}
                    </Text>
                  </View>
                </View>
              );
            })}
            {withTax() && (
              <>
                <View style={{ ...styles.tableRow, ...styles.bold }}>
                  <View style={{ ...styles.tableCol, ...styles.col1 }}>
                    <Text style={styles.tableCell}></Text>
                  </View>
                  <View style={{ ...styles.tableCol, ...styles.col2 }}>
                    <Text
                      style={{
                        ...styles.tableCell,
                        ...styles.bold,
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
                    <Text style={styles.tableCell}>
                      {formatPrice(totalPrice)}
                      {!withTax() && "*"}
                    </Text>
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
                    <Text style={styles.tableCell}>
                      {formatPrice(totalTax(totalPrice))}
                    </Text>
                  </View>
                </View>
              </>
            )}
            <View style={{ ...styles.tableRow, ...styles.bold }}>
              <View style={{ ...styles.tableCol, ...styles.col1 }}>
                <Text style={styles.tableCell}>Gesamt</Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.col2 }}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.col3 }}>
                <Text style={{ ...styles.tableCell, ...styles.alignRight }}>
                  {withTax() && "inkl. USt"}
                </Text>
              </View>
              <View style={{ ...styles.tableCol, ...styles.col4 }}>
                <Text style={styles.tableCell}>
                  {withTax()
                    ? formatPrice(grossPrice)
                    : formatPrice(totalPrice)}
                  {!withTax() && "*"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.centeredContent}>
            {!withTax() && (
              <>
                <Text>
                  *Steuerschuldnerschaft des Leistungsempfängers (Reverse
                  Charge)
                </Text>
                <Text>Zahlbar innerhalb von 15 Tagen ab Rechnungsdatum.</Text>
                <Text style={styles.thanks}>Vielen Dank für das Projekt!</Text>
              </>
            )}
          </View>
          <View
            style={{
              ...styles.centeredContent,
              ...styles.serif,
              ...styles.flexEnd,
            }}
          >
            <Text>
              {userProfile.name} • {userProfile.street} • {userProfile.zip}{" "}
              {userProfile.city}
            </Text>
            <Text>
              IBAN: {userProfile.iban} BIC: {userProfile.bic} Steuernummer:
              {userProfile.taxId} UID: {userProfile.uId}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
