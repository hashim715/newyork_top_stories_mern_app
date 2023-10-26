import { Outlet } from "react-router-dom";
import Header from "../components/web_components/header";
import Footer from "../components/web_components/footer";

const OutletPage = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default OutletPage;
