import React from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import Card, { CardHeader } from "../../../../../../../../components/Card";
import useToggle from "../../../../../../../../hooks/useToggle";

const AcademicRecordCard: React.FC = ({}) => {
  const { status: isEditOn, toggle } = useToggle();
  return (
    <>
      <Card
        className="w-full"
        header={
          <div className="w-full flex justify-between ">
            <CardHeader title={`Basic Info ${isEditOn ? " " : " - Edit"}`} />
            {isEditOn ? (
              <div className="flex gap-2">
                <button
                  className="btn btn-xs btn-info"
                  onClick={() => toggle()}
                >
                  <FiEdit />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  className="btn btn-xs btn-success"
                  onClick={() => toggle()}
                >
                  <FiSave />
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => toggle()}
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>
        }
      >
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam eos
          nesciunt exercitationem sint? Veniam quidem quisquam fuga accusamus
          quae dolorum, corrupti est quos, perspiciatis in voluptas ipsum
          cupiditate commodi ratione! Eaque laudantium rem quis quam maxime,
          cumque repellat, reprehenderit ducimus necessitatibus, placeat
          nesciunt. Aut sit odio earum quisquam illo eos ullam, eaque fugit
          distinctio debitis necessitatibus quasi adipisci quia pariatur?
          Laboriosam, sequi! Consequatur vitae optio repudiandae fugiat
          excepturi aspernatur beatae inventore amet. Officia nulla aliquam iste
          magni voluptatibus ad, fuga aspernatur, dolore exercitationem fugiat
          labore voluptatem tenetur sit est numquam.
        </p>
      </Card>
    </>
  );
};
export default AcademicRecordCard;
