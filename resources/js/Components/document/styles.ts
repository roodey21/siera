import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      color: '#262626',
      fontFamily: "Times-Roman",
      fontSize: 12,
      padding: '30px 50px'
    },
    header: {
        fontFamily: "Times-Bold",
        width: "100%"
    },
    list: {
        padding: "0 0 3 0"
    },
    row: {
        flexDirection: "row",
        marginBottom: 4,
    },
    label: {
        width: 80, // Lebar tetap untuk label agar sejajar
    },
    separator: {
        width: 10, // Jarak titik dua
    },
    value: {
        flex: 1, // Agar nilai bisa panjang tanpa merusak layout
    }
  });
