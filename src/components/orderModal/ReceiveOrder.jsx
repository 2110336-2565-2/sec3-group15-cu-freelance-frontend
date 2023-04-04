import { useEffect, useState } from "react";
import { apiClient } from "../../utils/axios";
import tw from "twin.macro";
import LoadingSpinner from "../share/LoadingSpinner";
import Filename from "../Portfolio/createPortfolioPage3/Filename";

const ReceiveOrder = ({ id }) => {
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient.get(`/order/${id}`);
        console.log(res);
        setList(res.data.submission.submissions);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetch();
  }, []);
  return (
    <div tw="h-[500px] overflow-y-auto">
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        list.map((order, idx) => {
          <Filename
            name={`order ${idx}`}
            onClick={() => {}}
            onClickDelete={() => {}}
          />;
        })}
    </div>
  );
};

export default ReceiveOrder;
