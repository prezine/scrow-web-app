import { useLayoutEffect, useState } from "react";

const useDocTitle = title => {
  const [doctitle, setDocTitle] = useState(title);

  useLayoutEffect(() => {
    document.title = doctitle;
  }, [doctitle]);

  return [doctitle, setDocTitle];
};

export default useDocTitle;