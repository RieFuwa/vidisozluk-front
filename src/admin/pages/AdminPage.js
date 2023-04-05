import Error from "../../pages/Error";
import ReportCharts from "../Components/charts/ReportCharts";
import PostTypeCount from "../Components/query/PostTypeCount";
import UserTitleCount from "../Components/query/UserTitleCount";
import AdminNavbar from "../layouts/AdminNavbar";
function AdminPage() {
  var roleList = JSON.stringify(localStorage.getItem("role"));
      //  if (roleList.includes("ROLE_USER")) {
      //    console.log("slm");
      //  }
       if(roleList.includes("ROLE_ADMIN")){
        return (
          <div class=" relative">
            <AdminNavbar></AdminNavbar>
           <ReportCharts></ReportCharts>
       
           <UserTitleCount></UserTitleCount>
           <PostTypeCount></PostTypeCount>
          </div>
        )
       }else{
        return(
          <div><Error></Error></div>
        )
       }
 
}

export default AdminPage;
