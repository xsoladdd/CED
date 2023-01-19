import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { PingDocument } from "../graphQL/generated/graphql";
import { useEffectOnce } from "./useEffectOnce";

const useAuth = (priv = false) => {
  const [loading, setloading] = useState(true);
  const { push } = useRouter();
  const [pingQuery] = useLazyQuery(PingDocument);
  const check = () => {
    if (!priv) push("/dashboard");
    const token = localStorage.getItem("token");
    if (!token) {
      push("/");
    }
    setloading(false);
  };

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
        check();
      },
    });
  });

  // custom hook returns value
  return { loading };
};

export default useAuth;
