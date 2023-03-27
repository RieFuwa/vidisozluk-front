import ReportCharts from "../aComponents/charts/ReportCharts";
import PostTypeCount from "../aComponents/query/PostTypeCount";
import UserTitleCount from "../aComponents/query/UserTitleCount";
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
