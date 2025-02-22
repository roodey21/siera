import { Document, Page, PDFViewer, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { LetterNumber } from "@/types/types";
import { format } from "date-fns";

export default function Memo({ letterNumber, sender, receiver, subject, date }: { letterNumber: LetterNumber, sender?: string, receiver?: string, subject?: string, date?: string }) {
    const text = `Dengan hormat,
        Sehubungan dengan Linen kamar LPP Garden Hotel yang sudah tidak layak pakai dan telah
        habis umur ekonomis (lebih dari dua tahun), maka dengan ini kami bermaksud untuk
        mengajukan permohonan peremajaan support facility berupa Pillow Case, Flat Sheet, Duvet
        Cover, Inner Duvet, Bath Mat, Bath Towel sebanyak 2 Par dengan pilihan skema sebagai
        berikut:
        1. Pengadaan langsung 2 Par maksimal di bulan November 2024.
        2. Pengadaan 1 Par dengan eksekusi maksimal pada bulan November 2024 dan 1 Par lagi
        dieksekusi maksimal awal Januari 2025
        Adapun hal ini bertujuan untuk mengurangi komplain mengenai kondisi linen dari tamu yang
        menginap di LPP Garden Hotel. Untuk estimasi biaya pengadaan linen ini adalah senilai Rp.
        303.957.960, -. Bersama memo ini kami lampirkan draft KAK, RAB, Form Evaluasi
        Pengadaan Barang, dan Dokumentasi Kondisi Linen serta Dokumentasi Komplain Tamu
        terkait Linen.

        Terkait hal tersebut, maka kami mohon arahan Bapak untuk pilihan skema pengadaan Linen di
        LPP Garden Hotel. Demikian surat pengajuan pengadaan barang ini kami sampaikan, atas
        arahan dan bantuan dari Bapak, kami ucapkan terima kasih.`
    const MemoComponent = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ width: "100%" }}>
                    {/* Header */}
                    <View style={[styles.header, { textAlign: "center", width: "100%", marginBottom: 5 }]}>
                        <Text style={{ textDecoration: "underline" }}>MEMO</Text>
                        <Text>{letterNumber.code}</Text>
                    </View>

                    {/* Informasi Memo */}
                    {/* <br/> */}
                    <View style={{ borderTop: "2 solid black", padding: "1 0", borderBottom: "2 solid black" }}>
                        <View style={{ borderTop: "1 solid black", padding: "10 2" }}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Dari</Text>
                                <Text style={styles.separator}>:</Text>
                                <Text style={[styles.value, { fontFamily: "Times-Bold" }]}>{sender}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Kepada</Text>
                                <Text style={styles.separator}>:</Text>
                                <Text style={[styles.value, { fontFamily: "Times-Bold" }]}>{receiver}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Perihal</Text>
                                <Text style={styles.separator}>:</Text>
                                <Text style={styles.value}>{subject ?? letterNumber.description}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Tanggal</Text>
                                <Text style={styles.separator}>:</Text>
                                <Text style={styles.value}>{format(letterNumber.date, 'dd MMMM y')}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Lampiran</Text>
                                <Text style={styles.separator}>:</Text>
                                <Text style={styles.value}>1 (satu) bendel</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: "30 2" }}>
                        <Text>
                            {text}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <PDFViewer width="100%" height="700px">
                <MemoComponent />
            </PDFViewer>
        </div>
    )
}
