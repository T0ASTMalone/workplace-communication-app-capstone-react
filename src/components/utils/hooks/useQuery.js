// A custom hook that builds on useLocation to parse

import { useLocation } from "react-router-dom";

// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default useQuery;
