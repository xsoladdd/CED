import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import {
  barangays,
  cities,
  provinces,
  regions,
} from "select-philippines-address";
import { IselectedStudentState } from "../../../../../../../store/useStore/slices/student/types";
import {
  IBarangay,
  ICity,
  Iprovince,
  IregionType,
} from "../../../../Shared/Components/StudentDetails/Components/AddressCard/types";
import { generateInput } from "../../../../Shared/Components/StudentDetails/Components/helper";

const AddressInfoForm: React.FC<{
  formik: FormikProps<IselectedStudentState>;
}> = ({ formik }) => {
  const [regionData, setRegion] = useState<Array<IregionType>>([]);
  const [provinceData, setProvince] = useState<Array<Iprovince>>([]);
  const [cityData, setCity] = useState<Array<ICity>>([]);
  const [barangayData, setBarangay] = useState<Array<IBarangay>>([]);

  useEffect(() => {
    regions().then((regionList: Array<IregionType>) => {
      setRegion(regionList);
    });
  }, []);

  return (
    <div>
      <div className="flex gap-3">
        {generateInput({
          id: "addressInfo.no",
          label: "House number :",
          onChange: formik.handleChange,
          value: formik.values.addressInfo.no,
          error: formik.errors.addressInfo?.no,
          touched: formik.touched.addressInfo?.no,
          placeholder: "",
          className: "w-1/4",
        })}

        {generateInput({
          id: "addressInfo.street",
          label: "Street :",
          onChange: formik.handleChange,
          value: formik.values.addressInfo.street,
          error: formik.errors.addressInfo?.street,
          touched: formik.touched.addressInfo?.street,
          placeholder: "",
          className: "w-1/4",
        })}
        {generateInput({
          required: true,
          id: "addressInfo.subdiv",
          label: "Subdivision :",
          onChange: formik.handleChange,
          value: formik.values.addressInfo.subdiv,
          error: formik.errors.addressInfo?.subdiv,
          touched: formik.touched.addressInfo?.subdiv,
          placeholder: "",
          className: "w-1/4",
        })}
        {generateInput({
          required: true,
          id: "addressInfo.zip",
          label: "Zip code :",
          onChange: formik.handleChange,
          value: formik.values.addressInfo.zip,
          error: formik.errors.addressInfo?.zip,
          touched: formik.touched.addressInfo?.zip,
          placeholder: "",
          className: "w-1/4",
        })}
      </div>
      <div className="flex gap-3">
        {generateInput({
          required: true,
          id: "addressInfo.region",
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
          value: formik.values.addressInfo.region,
          error: formik.errors.addressInfo?.region,
          touched: formik.touched.addressInfo?.region,
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
          disabled: provinceData.length === 0,
          required: true,
          id: "addressInfo.province",
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
          value: formik.values.addressInfo.province,
          error: formik.errors.addressInfo?.province,
          touched: formik.touched.addressInfo?.province,
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
          disabled: cityData.length === 0,
          required: true,
          id: "addressInfo.city",
          label: "City :",
          onChange: (e) => {
            const index = e.target.selectedIndex;
            const el = e.target.childNodes[index];
            const selectedOptionId = el.getAttribute("id");
            barangays(selectedOptionId).then((response: Array<IBarangay>) => {
              setBarangay(response);
            });
            formik.handleChange(e);
          },
          value: formik.values.addressInfo.city,
          error: formik.errors.addressInfo?.city,
          touched: formik.touched.addressInfo?.city,
          inputType: "select",
          selectValues: cityData.map(({ city_code, city_name }) => ({
            text: city_name,
            value: city_name,
            id: city_code,
          })),
          className: "w-1/4",
        })}
        {generateInput({
          disabled: barangayData.length === 0,
          required: true,
          id: "addressInfo.barangay",
          label: "Barangay :",
          onChange: (e) => {
            formik.handleChange(e);
          },
          value: formik.values.addressInfo.barangay,
          error: formik.errors.addressInfo?.barangay,
          touched: formik.touched.addressInfo?.barangay,
          inputType: "select",
          selectValues: barangayData.map(({ brgy_code, brgy_name }) => ({
            text: brgy_name,
            value: brgy_name,
            id: brgy_code,
          })),
          className: "w-1/4",
        })}
      </div>
    </div>
  );
};
export default AddressInfoForm;
