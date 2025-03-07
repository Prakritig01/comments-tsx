import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUrl } from "@/slices/linkSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fetching comments for:", videoUrl);
    dispatch(setCurrentUrl(videoUrl));
    navigate("/result");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h4 className="text-2xl font-bold text-gray-900 mb-6">
        YouTube Comments Fetcher
      </h4>
      <Card className="p-6 w-full max-w-md bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Enter YouTube Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Analyze Comments
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Search;
