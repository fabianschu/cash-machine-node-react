import React from "react";
import { Document, Page, Font, StyleSheet } from "@react-pdf/renderer";
import lightMuseo from "../../assets/light100.ttf";
import regularMuseo from "../../assets/normal500.ttf";
import brandonLight from "../../assets/brandonLight.ttf";
import brandonMedium from "../../assets/brandonMedium.ttf";
import gretaRegular from "../../assets/gretaRegular.ttf";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const BOTTOM_MARGIN_BETWEEN_SECTIONS = 30;
const BOTTOM_MARGIN_WITHIN_SECTIONS = 15;
const DEFAULT_FONT_SIZE = 11;

Font.register({ family: "Museo", src: lightMuseo, fontWeight: "light" });
Font.register({ family: "Museo", src: regularMuseo, fontWeight: "regular" });
Font.register({
  family: "brandonLight",
  src: brandonLight,
  fontWeight: "light",
});
Font.register({
  family: "brandonMedium",
  src: brandonMedium,
  fontWeight: "regular",
});
Font.register({
  family: "gretaRegular",
  src: gretaRegular,
  fontWeight: "regular",
});

const styles = StyleSheet.create({
  invoice: {
    padding: `${BOTTOM_MARGIN_BETWEEN_SECTIONS} 40 ${BOTTOM_MARGIN_WITHIN_SECTIONS} 40`,
    fontSize: DEFAULT_FONT_SIZE,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

const Invoice = ({ template }) => {
  const {
    customer,
    positions,
    invoiceTitle,
    userProfile,
    formalInvoiceId,
  } = template;

  return (
    <Document>
      <Page style={styles.invoice}>
        <Header
          userProfile={userProfile}
          customer={customer}
          formalInvoiceId={formalInvoiceId}
        />
        <Body
          invoiceTitle={invoiceTitle}
          positions={positions}
          customer={customer}
        />
        <Footer userProfile={userProfile} />
      </Page>
    </Document>
  );
};

export default Invoice;
