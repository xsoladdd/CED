import { Document, Page, Text, View } from "@react-pdf/renderer";
import { IdataID } from "./types";

const content: Array<Array<IdataID>> = [
  [
    { label: "Name :", value: "dummyName" },
    { label: "Gender :", value: "dummyGender" },
  ],
  [
    { label: "Birthday :", value: "" },
    { label: "LRN :", value: "" },
  ],
  [{ label: "Address :", value: "" }],
  [{ label: "Name of Parent/Guardian :", value: "" }],
  [
    { label: "Contact No. :", value: "" },
    { label: "Email :", value: "" },
  ],
  [
    { label: "Level :", value: "" },
    { label: "Section :", value: "" },
  ],
  [
    { label: "Checked By :", value: "" },
    { label: "Date :", value: "" },
  ],
  [{ label: "Remarks :", value: "" }],
  [
    { label: "Admission :", value: "" },
    { label: "Enlisted and for enrollment :", value: "" },
    { label: "Signature & Date:", value: "" },
  ],
  [
    { label: "Cashier :", value: "" },
    { label: "Paid :", value: "" },
    { label: "Signature & Date:", value: "" },
  ],
  [
    { label: "Registrar :", value: "" },
    { label: "Temporary/Provisionary :", value: "" },
    { label: "Signature & Date:", value: "" },
  ],
  [
    { label: "Registrar :", value: "" },
    { label: "Officially Enrolled :", value: "" },
    { label: "Signature & Date:", value: "" },
  ],
  [
    { label: "Registrar :", value: "" },
    { label: "OLD STUDENT :", value: "" },
    { label: "Signature & Date:", value: "" },
  ],
  [
    { label: "Registrar :", value: "" },
    { label: "RETURNEE :", value: "" },
    { label: "Signature & Date:", value: "" },
  ],
  [
    { label: "Registrar :", value: "" },
    { label: "TRANSFERED IN :", value: "" },
    { label: "Signature & Date:", value: "" },
  ],
];

interface returnGenerateBorder {
  borderTopWidth: string;
  borderBottomWidth: string;
  borderLeftWidth: string;
  borderRightWidth: string;
  borderColor: any;
  borderStyle: any;
}

const generateBorder = (
  top: number,
  right: number,
  bottom: number,
  left: number
): returnGenerateBorder => {
  return {
    borderColor: "black",
    borderStyle: "solid",
    borderBottomWidth: `${bottom !== 0 ? `${bottom}px` : 0}`,
    borderLeftWidth: `${left !== 0 ? `${bottom}px` : 0}`,
    borderRightWidth: `${right !== 0 ? `${bottom}px` : 0}`,
    borderTopWidth: `${top !== 0 ? `${bottom}px` : 0}`,
  };
};

const headerArea = (
  <>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          height: "60px",
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          ...generateBorder(0, 1, 1, 0),
        }}
      >
        <View
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "red",
          }}
        ></View>
        <View
          style={{
            width: "300px",
            height: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              height: "40%",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Text style={{ fontSize: "14px" }}>
              St. Jerome Emiliani Institute
            </Text>
          </View>
          <View
            style={{
              height: "60%",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Text style={{ fontSize: "10px" }}>
              Bahayang Pag-asa Subd. Molino, Bacoor City, Cavite
            </Text>

            <Text style={{ fontSize: "8px" }}>
              Tel.No 477-00-86 / 09062006798 / 0333383543
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          height: "60px",
          width: "30%",
        }}
      >
        <View
          style={{
            height: "55%",
            width: "100%",
            ...generateBorder(0, 0, 1, 0),
          }}
        ></View>
        <View
          style={{
            height: "45%",
            width: "100%",
            textAlign: "center",
            ...generateBorder(0, 0, 1, 0),
          }}
        >
          <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
            Student Number
          </Text>
        </View>
      </View>
    </View>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: "20px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        ...generateBorder(0, 0, 1, 0),
      }}
    >
      <Text style={{ fontSize: "16px" }}>OFFICE OF REGISTRAR</Text>
    </View>
    {/* Row 3 */}
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height: "30px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        ...generateBorder(0, 0, 1, 0),
      }}
    >
      <Text style={{ fontSize: "10px" }}>REGISTRATION FORM</Text>
      <Text style={{ fontSize: "8px" }}>School Year - 2022-2023</Text>
    </View>
  </>
);

const contentArea = (
  <>
    {content.map((arr, idx) => (
      <View
        key={idx}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "15px",
          ...generateBorder(0, 0, 1, 0),
        }}
      >
        {arr.length === 3 && (
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "25%" }}>
              <Text
                style={{ fontSize: "8px" }}
              >{`${arr[0].label} ${arr[0].value}`}</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text
                style={{ fontSize: "8px" }}
              >{`${arr[1].label} ${arr[1].value}`}</Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text
                style={{ fontSize: "8px" }}
              >{`${arr[2].label} ${arr[2].value}`}</Text>
            </View>
          </View>
        )}
        {arr.length === 2 && (
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "60%",
              }}
            >
              <Text
                style={{ fontSize: "8px" }}
              >{`${arr[0].label} ${arr[0].value}`}</Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text
                style={{ fontSize: "8px" }}
              >{`${arr[1].label} ${arr[1].value}`}</Text>
            </View>
          </View>
        )}
        {arr.length === 1 && (
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "100%" }}>
              <Text
                style={{ fontSize: "8px" }}
              >{`${arr[0].label} ${arr[0].value}`}</Text>
            </View>
          </View>
        )}
      </View>
    ))}
  </>
);

const signatureArea = (
  <>
    <View style={{ width: "100%", height: "30px" }}>
      <View style={{ width: "100%", display: "flex", alignItems: "flex-end" }}>
        <View
          style={{
            width: "150px",
            height: "100%",
          }}
        ></View>
      </View>
      <View style={{ width: "100%", display: "flex", alignItems: "flex-end" }}>
        <View
          style={{
            width: "150px",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <View style={{ width: "140px", ...generateBorder(0, 0, 1, 0) }}>
            {" "}
          </View>
          <Text style={{ fontSize: "6px" }}>SIGNATURE OVER PRINTED </Text>
        </View>
      </View>
    </View>
  </>
);
export const docs = (
  <Document>
    <Page
      size="LETTER"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <View style={{ width: "94%", ...generateBorder(2, 2, 2, 2) }}>
        {headerArea}
        {contentArea}
        {signatureArea}
      </View>
    </Page>
  </Document>
);
