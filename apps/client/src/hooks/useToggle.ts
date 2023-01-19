import { useState } from "react";

const useToggle = (defaultVal = true) => {
  const [status, setStatus] = useState(defaultVal);

  const toggle = () => {
    setStatus((old) => !old);
  };

  return { status, toggle };
};

export default useToggle;
