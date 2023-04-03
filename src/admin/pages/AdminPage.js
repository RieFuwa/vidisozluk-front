import ReportCharts from "../Components/charts/ReportCharts";
import PostTypeCount from "../Components/query/PostTypeCount";
import UserTitleCount from "../Components/query/UserTitleCount";
import AdminNavbar from "../layouts/AdminNavbar";
function AdminPage() {
  return (
    <div class=" relative">
      <AdminNavbar></AdminNavbar>
     <ReportCharts></ReportCharts>
 
     <UserTitleCount></UserTitleCount>
     <PostTypeCount></PostTypeCount>
    </div>
  );
}

export default AdminPage;
