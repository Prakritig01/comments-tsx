import { selectCurrentUrl } from "@/slices/linkSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Result = () => {
  const videoUrl = useSelector(selectCurrentUrl) || ''; // ✅ Use it at the top level

  useEffect(() => {
    console.log("video url:", videoUrl);
  }, []); 

  return <div>Result page</div>;
};

export default Result;
