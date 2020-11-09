import React from "react";
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";
import logo from "../../logo.png";

const BLACK_EIGHTY = "#333333";
const MINTY_GREEN = "#559495";
const BOTTOM_MARGIN_BETWEEN_SECTIONS = 30;
const BOTTOM_MARGIN_WITHIN_SECTIONS = 15;

const styles = StyleSheet.create({
  header: {
    marginBottom: BOTTOM_MARGIN_BETWEEN_SECTIONS,
    fontFamily: "brandonLight",
    lineHeight: 1.3,
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "60px",
    textAlign: "center",
    marginBottom: BOTTOM_MARGIN_WITHIN_SECTIONS,
  },
  ownName: {
    textTransform: "capitalize",
    color: BLACK_EIGHTY,
    marginBottom: BOTTOM_MARGIN_WITHIN_SECTIONS,
    textAlign: "center",
  },
  ownAddress: {
    color: MINTY_GREEN,
    textAlign: "center",
    marginBottom: BOTTOM_MARGIN_BETWEEN_SECTIONS,
  },
  customerTitle: {
    fontFamily: "brandonMedium",
  },
  metaInfo: {
    textAlign: "right",
  },
});

const Header = (props) => {
  const { userProfile, customer, formalInvoiceId } = props;
  const {
    firm,
    zip,
    street,
    city,
    country,
    taxId,
    lastName,
    firstName,
  } = customer;
  const date = moment().format("DD|MM|YYYY");

  const formatName = (name) => {
    if (!name) return;
    return name.toUpperCase().split("").join(" ");
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image src={logo} style={styles.logo} />
      </View>
      <Text style={styles.ownName}>{formatName(userProfile.name)}</Text>
      <View style={styles.ownAddress}>
        <Text>
          {userProfile.street} • {userProfile.zip} {userProfile.city}
        </Text>
        <Text>{userProfile.email}</Text>
        <Text>{userProfile.phone}</Text>
      </View>
      <View>
        {firm && <Text style={styles.customerTitle}>{firm}</Text>}
        {lastName && (
          <Text style={styles.customerTitle}>
            {firstName} {lastName}
          </Text>
        )}
        <Text>{street}</Text>
        <Text>
          {zip} {city}
        </Text>
        <Text>{country}</Text>
      </View>
      <View style={styles.metaInfo}>
        <Text>UID: {taxId}</Text>
        <Text>Rechnungsnummer: {formalInvoiceId}</Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
};

export default Header;
