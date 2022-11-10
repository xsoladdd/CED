import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { PingDocument } from "../graphQL/generated/graphql";
import { useEffectOnce } from "./useEffectOnce";

const useAuth = (priv = false) => {
  const [loading, setloading] = useState(true);
  const { push } = useRouter();
  const [pingQuery] = useLazyQuery(PingDocument);
  // const check = () => {
  //   const token = localStorage.getItem("token");
  //   const userid = localStorage.getItem("userid");
  //   if (token || userid) return push("/dashboard");
  //   return setloading(false);
  // };

  useEffectOnce(() => {
    setloading(true);
    pingQuery({
      onError: (error) => {
        if (error.message.includes("Failed to fetch")) {
          // push("/500");
          console.log("something went wrong");
        } else {
          console.log(error);
          push("/");
          setloading(false);
        }
      },
      onCompleted: () => {
        if (!priv) push("/dashboard");
        setloading(false);
      },
    });
  });

  // custom hook returns value
  return { loading };
};

export default useAuth;
