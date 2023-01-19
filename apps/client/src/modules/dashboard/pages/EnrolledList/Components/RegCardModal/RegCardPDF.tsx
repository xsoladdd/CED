import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import React from "react";
import { EnrolledRecord } from "../../../../../../graphQL/generated/graphql";
import { IyearLevel } from "../../../../../../store/useStore/slices/global/types";
import { generateBorder, generateContentArray } from "./helper";
import { IadditionalData } from "./types";

const RegCardPDF: React.FC<{
  data: EnrolledRecord;
  year_level: Array<IyearLevel>;
}> = ({ data, year_level }) => {
  const generateParentName = (): string => {
    if (
      !data.student?.parent_guardians &&
      data.student?.parent_guardians?.length !== 0
    ) {
      return "No Record";
    } else {
      const motherData = data.student.parent_guardians.filter(
        (props) => props?.type.toLowerCase() === "m"
      );
      if (motherData.length !== 0) {
        return `${motherData[0]?.first_name} ${motherData[0]?.middle_name} ${motherData[0]?.last_name}`;
      }

      const fatherData = data.student.parent_guardians.filter(
        (props) => props?.type.toLowerCase() === "f"
      );
      if (fatherData.length !== 0) {
        return `${fatherData[0]?.first_name} ${fatherData[0]?.middle_name} ${fatherData[0]?.last_name}`;
      }

      const guardianData = data.student.parent_guardians.filter(
        (props) => props?.type.toLowerCase() === "g"
      );
      if (guardianData.length !== 0) {
        return `${guardianData[0]?.first_name} ${guardianData[0]?.middle_name} ${guardianData[0]?.last_name}`;
      }
      return "No Record";
    }
  };
  const additionalData: IadditionalData = {
    addressString:
      data.student?.address?.province &&
      data.student?.address?.zip &&
      data.student?.address?.city &&
      data.student?.address?.barangay &&
      data.student?.address?.region
        ? `${data.student?.address?.no} ${data.student?.address?.street} ${data.student?.address?.subdiv} ${data.student?.address?.barangay}, ${data.student?.address?.city}, ${data.student?.address?.province}, ${data.student?.address?.region}, ${data.student?.address?.zip} `
        : "No Record",
    parentName: generateParentName(),
  };

  const content = generateContentArray(data, year_level, additionalData);

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
              // backgroundColor: "red",
            }}
          >
            <Image src={"/pinkcardlogo.png"} />
          </View>
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
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              ...generateBorder(0, 0, 1, 0),
            }}
          >
            <Text style={{ fontSize: "14px" }}>{data.SID}</Text>
          </View>
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
          alignItems: "center",
          justifyContent: "center",
          height: "20px",
          width: "100%",
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
        <View
          style={{ width: "100%", display: "flex", alignItems: "flex-end" }}
        >
          <View
            style={{
              width: "150px",
              height: "100%",
            }}
          ></View>
        </View>
        <View
          style={{ width: "100%", display: "flex", alignItems: "flex-end" }}
        >
          <View
            style={{
              width: "150px",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <View
              style={{ width: "140px", ...generateBorder(0, 0, 1, 0) }}
            ></View>
            <Text style={{ fontSize: "6px" }}>SIGNATURE OVER PRINTED </Text>
          </View>
        </View>
      </View>
    </>
  );
  return (
    <>
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
    </>
  );
};
export default RegCardPDF;
