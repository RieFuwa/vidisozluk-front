import { FaHeart } from "react-icons/fa";
import ReportTitle from "../components/createTitle/ReportTitle";
import Footer from "../components/layouts/Footer";
import { Link } from "react-router-dom";
import CreateTitle from "../components/createTitle/CreateTitle";
import PostCard from "../components/post/Pcard";
import CreateComment from "../components/createComment/CreateComment";
import axios from "axios";
import React, { useEffect,useRef, useState } from "react";

function Main() {

  return (
    <div class="mt-12 px-2 min-h-screen ">
      <h1 class=" text-5xl font-bodyFont font-bold  ">
        vıdı<span class=" text-lime-600">GÜNDEM</span>
        <div class=" border-lime-600 border-2"></div>
      </h1>
    <PostCard></PostCard>
      <Footer></Footer>
    </div>
  );
}

export default Main;
