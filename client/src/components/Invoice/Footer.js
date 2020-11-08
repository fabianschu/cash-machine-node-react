import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  footer: {
    fontFamily: "gretaRegular",
    textAlign: "center",
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
