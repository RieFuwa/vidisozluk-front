import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Main from "./pages/Main";
import Footer from "./components/layouts/Footer";
import User from "./pages/User";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Error from "./pages/Error";
import Spor from "./pages/PageList/Spor";
import Siyaset from "./pages/PageList/Siyaset";
import Muzik from "./pages/PageList/Muzik";
import Tarih from "./pages/PageList/Tarih";
import Ekonomi from "./pages/PageList/Ekonomi";
import Egitim from "./pages/PageList/Egitim";
import CreateComment from "./components/createComment/CreateComment";
import AdminPage from "./admin/pages/AdminPage";
import AllUser from "./admin/pages/AllUser";
import ReportOperations from "./admin/pages/ReportOperation";

function App() {
  const WithNavbar = () => (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
  return (
    <div class="container mx-auto px-4">
      <Router>
        <Routes>
          <Route element={<WithNavbar></WithNavbar>}>
            <Route exact path="/" element={<Main></Main>}>
              {" "}
            </Route>
            <Route exact path="/gundem" element={<Main></Main>}></Route>
            <Route exact path="/spor" element={<Spor></Spor>}></Route>
            <Route exact path="/siyaset" element={<Siyaset></Siyaset>}></Route>
            <Route exact path="/tarih" element={<Tarih></Tarih>}></Route>
            <Route exact path="/ekonomi" element={<Ekonomi></Ekonomi>}></Route>
            <Route exact path="/muzik" element={<Muzik></Muzik>}></Route>
            <Route exact path="/teknoloji" element={<Egitim></Egitim>}></Route>
            <Route exact path="/user/:userId" element={<User></User>}></Route>
          </Route>

          <Route
            exact
            path="/adminpage"
            element={<AdminPage></AdminPage>}
          ></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/alluser" element={<AllUser></AllUser>}></Route>
          <Route exact path="/reportoperations" element={<ReportOperations></ReportOperations>}></Route>

          <Route exact path="/register" element={<Register></Register>}></Route>
          <Route path="*" element={<Error></Error>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
