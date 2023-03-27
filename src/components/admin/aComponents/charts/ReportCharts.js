import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { formatDate } from "../../../FormatDate/StringFormatter";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
function ReportCharts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allPost, setAllPost] = useState([]);

  const getAllPost = () => {
    axios
      .get("/post/getAll")
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAllPost(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    getAllPost();
  }, []);
  const data = {
    labels: allPost?.map((key) => key.id),
    datasets: [
      {
        data: allPost?.map((key) => key.reportlist.length),
        backgroundColor: "transparent",
        borderColor: "#F32323  ",
        pointBorderColor: "black",
        pointBorderWith: 4,

        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legends: false,
    },
    scale: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        max: 10,
        ticks: {
          stepSize: 4,
        },
      },
    },
  };
  return (
    <div class="container mt-5 ml-30 w-auto h-96 font-bodyFont font-semibold">
      <p class="text-2xl mt-4 font-bodyFont font-semibold ">Şikayet Edilen Başlıklar</p>

      <Line data={data}></Line>
    </div>
  );
}
export default ReportCharts;
