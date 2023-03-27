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
function PostCharts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const [allPostType, setAllPostType] = useState([]);

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
  const getAllPostType = () => {
    axios
      .get("/postType/getAll")
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAllPostType(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    getAllPost();
    getAllPostType();
  }, []);

  const data = {
    labels: allPostType?.map((key) => key.postTypeName),
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 6, 20],
        backgroundColor: "transparent",
        borderColor: "#F32323  ",
        pointBorderColor: "black",
        pointBorderWith: 4,

        tension: 0.4,
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
        max: 102,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  return (
    <div class=" w-auto h-96 font-bodyFont font-semibold mt-4">
      <p>Başlık Sayıları</p>

      <Line data={data}></Line>
    </div>
  );
}
export default PostCharts;
