import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import Table from "./Table";

const BOTTOM_MARGIN_WITHIN_SECTIONS = 15;

const styles = StyleSheet.create({
  body: {
    fontFamily: "brandonMedium",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  additions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    fontFamily: "brandonLight",
  },
  invoiceTitle: {
    marginBottom: BOTTOM_MARGIN_WITHIN_SECTIONS,
  },
});

const Body = (props) => {
  const { invoiceTitle, positions, customer } = props;
  const { hourlyRate, country } = customer;
  return (
    <View style={styles.body}>
      <Text style={styles.invoiceTitle}>{invoiceTitle}</Text>
      <Table
        positions={positions}
        hourlyRate={hourlyRate}
        tax={country === "Deutschland"}
      />
      <View style={styles.additions}>
        {!(country === "Deutschland") && (
          <Text>
            *Steuerschuldnerschaft des Leistungsempfängers (Reverse Charge)
          </Text>
        )}
        <Text>Zahlbar innerhalb von 15 Tagen ab Rechnungsdatum.</Text>
        <Text>Vielen Dank für das Projekt!</Text>
      </View>
    </View>
  );
};

export default Body;
