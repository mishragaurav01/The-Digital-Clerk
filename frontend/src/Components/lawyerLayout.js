import Header from "./LandingPage/Header";
import { Outlet, useLocation } from "react-router-dom";

const LawyerLayout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"]; // don't show header here

  // hide header for login/register pages
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      {/* The nested route content will appear here */}
      <main className={!shouldHideHeader ? "pt-16" : ""}>
        <Outlet />
      </main>
    </>
  );
};

export default LawyerLayout;
