import { useRouter } from "next/router";
import React from "react";
import { client } from "../../../../graphQL/helper";
import useStore from "../../../../store/useStore";
import { useMutation } from "@apollo/client";
import { LogoutDocument } from "../../../../graphQL/generated/graphql";

const SignoutArea: React.FC = () => {
  const { push } = useRouter();
  const {
    globalVars: { school_year },
  } = useStore();
  const [logout, { loading }] = useMutation(LogoutDocument);

  const handleLogout = () => {
    logout({
      onCompleted: () => {
        client.clearStore();
        localStorage.clear();
        push("/");
      },
    });
  };

  return (
    <>
      <div className="flex place-items-center gap-5">
        <span className="text-sm ">SY: {school_year}</span>
        <button
          className="link text-sm"
          onClick={handleLogout}
          disabled={loading}
        >
          SIGN OUT
        </button>
      </div>
    </>
  );
};
export default SignoutArea;
