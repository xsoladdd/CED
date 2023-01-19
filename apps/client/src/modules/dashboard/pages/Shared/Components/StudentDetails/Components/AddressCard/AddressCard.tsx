import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import WarningModal from "../../../../../../../../components/WarningModal";
import useToggle from "../../../../../../../../hooks/useToggle";
import useStore from "../../../../../../../../store/useStore";
import { generateInput } from "../helper";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { IBarangay, ICity, Iprovince, IregionType } from "./types";
import { addressInfoSchema } from "./helper";
import { useMutation } from "@apollo/client";
import { UpdateStudentAddressInfoDocument } from "../../../../../../../../graphQL/generated/graphql";

const AddressCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle(false);
  const { status: modalStatus, toggle: toggleModal } = useToggle(false);

  const [regionData, setRegion] = useState<Array<IregionType>>([]);
  const [provinceData, setProvince] = useState<Array<Iprovince>>([]);
  const [cityData, setCity] = useState<Array<ICity>>([]);
  const [barangayData, setBarangay] = useState<Array<IBarangay>>([]);

  const {
    student: {
      selectedStudent: { address, id },
      checkStudentEditStatus,
    },
  } = useStore();
  useEffect(() => {
    regions().then((regionList: Array<IregionType>) => {
      setRegion(regionList);
      // get region code
      if (!address?.region) return;
      const regionCode = regionList.filter(
        ({ region_name }) => region_name === address.region
      );
      // Block if region name doesnt exist
      if (regionCode.length === 0) return;
      provinces(regionCode[0].region_code).then(
        (provinceList: Array<Iprovince>) => {
          setProvince(provinceList);
          const provinceCode = provinceList.filter(
            ({ province_name }) => province_name === address.province
          );
          // Block if province name doesnt exist
          if (provinceCode.length === 0) return;
          cities(provinceCode[0].province_code).then(
            (cityList: Array<ICity>) => {
              setCity(cityList);
              const cityCode = cityList.filter(
                ({ city_name }) => city_name === address.city
              );
              if (cityCode.length === 0) return;
              barangays(cityCode[0].city_code).then(
                (response: Array<IBarangay>) => {
                  setBarangay(response);
                }
              );
            }
          );
        }
      );
    });
  }, [address]);

  const [updateStudentAddressInfo] = useMutation(
    UpdateStudentAddressInfoDocument
  );

  const formik = useFormik({
    initialValues: { ...address },
    validationSchema: addressInfoSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // qwer Fix Submitting with API
      const { barangay, city, no, province, region, street, subdiv, zip } =
        values;
      updateStudentAddressInfo({
        variables: {
          id: id as string,
          input: {
            barangay: barangay ? barangay : "",
            city: city ? city : "",
            province: province ? province : "",
            region: region ? region : "",
            zip: zip ? zip : "",
            no,
            street,
            subdiv,
          },
        },
        onCompleted: () => toggle(),
      });
    },
  });
  const header = (
    <div className="w-full flex justify-between ">
      <CardHeader
        title={`Address Information`}
        subTitle={isEditOn ? "Edit" : ""}
      />
      {checkStudentEditStatus && (
        <>
          {isEditOn ? (
            <div className="flex gap-2">
              <button className="btn btn-xs btn-success" type="submit">
                <FiSave />
              </button>
              <button
                className="btn btn-xs btn-error"
                type="button"
                onClick={() => toggleModal()}
              >
                <FiX />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                className="btn btn-xs btn-info"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggle();
                }}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
  return (
    <>
      <WarningModal
        status={modalStatus}
        handleClose={() => toggleModal()}
        handleProceed={() => {
          formik.resetForm();
          toggle();
          toggleModal();
        }}
      >
        {`Changes won't be save. are you sure you want to cancel?`}
      </WarningModal>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <Card className="w-full" header={header}>
          <div className="flex gap-3">
            {generateInput({
              disabled: !isEditOn,
              id: "no",
              label: "House number :",
              onChange: formik.handleChange,
              value: formik.values.no ? formik.values.no : "",
              error: formik.errors.no,
              touched: formik.touched.no,
              placeholder: "",
              className: "w-1/4",
            })}

            {generateInput({
              disabled: !isEditOn,
              id: "street",
              label: "Street :",
              onChange: formik.handleChange,
              value: formik.values.street ? formik.values.street : "",
              error: formik.errors.street,
              touched: formik.touched.street,
              placeholder: "",
              className: "w-1/4",
            })}
            {generateInput({
              disabled: !isEditOn,
              required: true,
              id: "subdiv",
              label: "Subdivision :",
              onChange: formik.handleChange,
              value: formik.values.subdiv ? formik.values.subdiv : "",
              error: formik.errors.subdiv,
              touched: formik.touched.subdiv,
              placeholder: "",
              className: "w-1/4",
            })}
            {generateInput({
              disabled: !isEditOn,
              required: true,
              id: "zip",
              label: "Zip code :",
              onChange: formik.handleChange,
              value: formik.values.zip,
              error: formik.errors.zip,
              touched: formik.touched.zip,
              placeholder: "",
              className: "w-1/4",
            })}
          </div>
          <div className="flex gap-3">
            {generateInput({
              disabled: !isEditOn,
              required: true,
              id: "region",
              label: "Region :",
              onChange: (e) => {
                const index = e.target.selectedIndex;
                const el = e.target.childNodes[index];
                const option = el.getAttribute("id");
                provinces(option).then((response: Array<Iprovince>) => {
                  setProvince(response);
                  setCity([]);
                  setBarangay([]);
                });
                formik.handleChange(e);
              },
              value: formik.values.region,
              error: formik.errors.region,
              touched: formik.touched.region,
              inputType: "select",
              placeholder: "Select Region",
              selectValues: regionData.map(({ region_name, region_code }) => ({
                text: region_name,
                value: region_name,
                id: region_code,
              })),
              className: "w-1/4",
            })}
            {generateInput({
              disabled: !isEditOn || provinceData.length === 0,
              required: true,
              id: "province",
              label: "Province :",
              onChange: (e) => {
                const index = e.target.selectedIndex;
                const el = e.target.childNodes[index];
                const selectedOptionId = el.getAttribute("id");
                cities(selectedOptionId).then((response: Array<ICity>) => {
                  setCity(response);
                  setBarangay([]);
                  formik.setFieldValue("city", "", false);
                  formik.setFieldValue("barangay", "", false);
                });
                formik.handleChange(e);
              },
              value: formik.values.province,
              error: formik.errors.province,
              touched: formik.touched.province,
              inputType: "select",
              selectValues: provinceData.map(
                ({ province_code, province_name }) => ({
                  text: province_name,
                  value: province_name,
                  id: province_code,
                })
              ),
              className: "w-1/4",
            })}
            {generateInput({
              disabled: !isEditOn || cityData.length === 0,
              required: true,
              id: "city",
              label: "City :",
              onChange: (e) => {
                const index = e.target.selectedIndex;
                const el = e.target.childNodes[index];
                const selectedOptionId = el.getAttribute("id");
                barangays(selectedOptionId).then(
                  (response: Array<IBarangay>) => {
                    setBarangay(response);
                  }
                );
                formik.handleChange(e);
              },
              value: formik.values.city,
              error: formik.errors.city,
              touched: formik.touched.city,
              inputType: "select",
              selectValues: cityData.map(({ city_code, city_name }) => ({
                text: city_name,
                value: city_name,
                id: city_code,
              })),
              className: "w-1/4",
            })}
            {generateInput({
              disabled: !isEditOn || barangayData.length === 0,
              required: true,
              id: "barangay",
              label: "Barangay :",
              onChange: (e) => {
                formik.handleChange(e);
              },
              value: formik.values.barangay,
              error: formik.errors.barangay,
              touched: formik.touched.barangay,
              inputType: "select",
              selectValues: barangayData.map(({ brgy_code, brgy_name }) => ({
                text: brgy_name,
                value: brgy_name,
                id: brgy_code,
              })),
              className: "w-1/4",
            })}
          </div>
        </Card>
      </form>
    </>
  );
};
export default AddressCard;
