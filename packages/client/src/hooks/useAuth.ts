import { useRouter } from "next/router";
import { useState } from "react";
import { useEffectOnce } from "./useEffectOnce";

const useAuth = () => {
  const [loading, setloading] = useState(true);
  const { push } = useRouter();
  const check = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    if (token || userid) return push("/dashboard");
    return setloading(false);
  };

  useEffectOnce(() => {
    check();
  });

  // custom hook returns value
  return { loading };
};

export default useAuth;
