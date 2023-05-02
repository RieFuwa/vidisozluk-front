import { CChart } from "@coreui/react-chartjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
function AreaCharts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allPostTypeCount, setAllPostTypeCount] = useState([]);

  const getAllPostTypeCount = () => {
    axios
      .get("/post/getPostTypeByCount")
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAllPostTypeCount(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    getAllPostTypeCount();
  }, []);
  return (
    <div class=" items-center mt-10" >
      <p class="text-xl font-bold px-3 py-1">Başlık Türüne Göre Başlık Sayısı</p>
      <CChart
        class=" w-72 h-72 mt-2"
        type="doughnut"
        data={{
          labels: allPostTypeCount?.map((key) => key.postTypeName),
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
              data: allPostTypeCount?.map((key) => key.countTitle),
            },
          ],
        }}
      />
    </div>
  );
}
export default AreaCharts;
