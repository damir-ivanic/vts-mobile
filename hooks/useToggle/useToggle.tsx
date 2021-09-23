import { useState } from "react";

const useToggle: (initialValue?: boolean) => [boolean, () => void] = (
  initialValue = false,
) => {
  const [toggle, setToggle] = useState(initialValue);

  return [toggle, () => setToggle(!toggle)];
};

export default useToggle;
