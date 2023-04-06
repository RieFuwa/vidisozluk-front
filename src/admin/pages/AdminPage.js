import Error from "../../pages/Error";
import AreaCharts from "../Components/areaCharts/AreaCharts";
import ReportCharts from "../Components/charts/ReportCharts";
import PostTypeCount from "../Components/query/PostTypeCount";
import UserTitleCount from "../Components/query/UserTitleCount";
import AdminNavbar from "../layouts/AdminNavbar";

function AdminPage() {
  var roleList = JSON.stringify(localStorage.getItem("role"));
  //  if (roleList.includes("ROLE_USER")) {
  //    console.log("slm");
  //  }
  if (roleList.includes("ROLE_ADMIN")) {
    return (
      <div class=" relative">
        <AdminNavbar></AdminNavbar>
        <ReportCharts></ReportCharts>

        <div class="  grid grid-cols-2 sm:grid-cols-1  lg:grid-cols-2 2xl:grid-cols-2  ">
          <div class="flex items-center  ">
            <UserTitleCount></UserTitleCount>
            <PostTypeCount></PostTypeCount>
          </div>
        </div>
        <AreaCharts></AreaCharts>
      </div>
    );
  } else {
    return (
      <div>
        <Error></Error>
      </div>
    );
  }
}

export default AdminPage;
