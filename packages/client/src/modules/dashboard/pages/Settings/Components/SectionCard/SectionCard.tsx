import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../components/Card";
import TableLoading from "../../../../../../components/Table/Loading";
import WarningModal from "../../../../../../components/WarningModal";
import { DeleteSectionDocument } from "../../../../../../graphQL/generated/graphql";
import useToggle from "../../../../../../hooks/useToggle";
import useStore from "../../../../../../store/useStore";
import { joinClass } from "../../../../../../utils/joinClass";
import AddEditModal from "./AddEditModal";
const SectionCard: React.FC = () => {
  const {
    globalVars: { year_level, deleteSection: deleteStoreSection },
  } = useStore();
  const [selectedYear, setSelectedYear] = useState("");
  const { status: deleteWarningStatus, toggle: deleteWarningToggle } =
    useToggle(false);

  const { status: addEditStatus, toggle: addEditToggle } = useToggle(false);
  const [modalParams, setModalParams] = useState<{
    transaction: "edit" | "add";
    id?: string;
    default_title?: string;
  }>({
    transaction: "add",
  });
  const deleteSectionId = useRef("");

  const [deleteSection] = useMutation(DeleteSectionDocument);

  const filterCard = (
    <>
      <div className="flex gap-5 pb-4">
        <label className="label ">
          <span className="label-text ">Select Year </span>
        </label>
        <select
          className={joinClass(`select select-bordered select-sm w-1/3`)}
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          <option value="" disabled>
            Pick one
          </option>
          {year_level.map(({ title, value }, idx) => (
            <option value={value} key={idx}>
              {title}
            </option>
          ))}
        </select>

        <button
          className=" btn btn-sm btn-info"
          onClick={() => {
            setModalParams({
              transaction: "add",
            });
            addEditToggle();
          }}
        >
          Add new
        </button>
      </div>
    </>
  );

  const selectedYearLevel = year_level.filter(
    ({ value }) => value === selectedYear
  )[0];

  const tableTemplate = (
    <table className="table table-compact w-2/3 mx-auto table-zebra shadow-lg">
      <thead>
        <tr>
          <th className="w-1/5">ID</th>
          <th className="w-3/5">SECTION</th>
          <th className="w-1/5">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {!selectedYear && (
          <TableLoading>Please select year to continue</TableLoading>
        )}
        {selectedYearLevel && selectedYearLevel.sections?.length === 0 && (
          <TableLoading>No data found</TableLoading>
        )}
        {selectedYearLevel &&
          selectedYearLevel.sections?.map(({ title, id }, idx) => (
            <tr key={idx}>
              <td>{id}</td>
              <td>{title}</td>
              <td className="flex gap-1">
                <button
                  className="btn btn-success btn-xs"
                  onClick={() => {
                    addEditToggle();
                    setModalParams({
                      default_title: title,
                      transaction: "edit",
                      id,
                    });
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className="btn btn-error btn-xs"
                  onClick={() => {
                    deleteSectionId.current = id;
                    deleteWarningToggle();
                  }}
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
  return (
    <>
      <AddEditModal
        status={addEditStatus}
        handleClose={() => addEditToggle()}
        default_year_level={selectedYear}
        transaction={modalParams.transaction}
        selected_id={modalParams.id}
        default_title={modalParams.default_title}
      />
      <WarningModal
        status={deleteWarningStatus}
        handleClose={() => deleteWarningToggle()}
        handleProceed={() => {
          deleteSection({
            variables: {
              deleteSectionId: deleteSectionId.current,
            },
            onCompleted: () => {
              deleteWarningToggle();
              deleteStoreSection(deleteSectionId.current, selectedYear);
            },
          });
        }}
      >
        {`Are you sure that you want to delete this?`}
      </WarningModal>
      <Card
        className="w-full"
        bordered={false}
        header={<CardHeader title="Manage Section" />}
      >
        {filterCard}
        {tableTemplate}
      </Card>
    </>
  );
};
export default SectionCard;
