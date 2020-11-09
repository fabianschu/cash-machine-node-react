import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const BLACK_NINETY = "#1A1A1A";

const styles = StyleSheet.create({
  footer: {
    fontFamily: "brandonMedium",
    textAlign: "center",
    color: BLACK_NINETY,
  },
});

const Footer = (props) => {
  const { userProfile } = props;
  return (
    <View style={styles.footer}>
      <Text>
        {userProfile.name} • {userProfile.street} • {userProfile.zip}{" "}
        {userProfile.city}
      </Text>
      <Text>
        IBAN: {userProfile.iban} BIC: {userProfile.bic} Steuernummer:{" "}
        {userProfile.taxId} UID: {userProfile.uId}
      </Text>
    </View>
  );
};

export default Footer;
