import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getDefaultDashboardRoute } from "@/lib/auth.utils";
import { UserInfo } from "@/types/user.interface";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navIttems.config";


export default async function DashboardNavbar() {

  const userInfo = (await getUserInfo()) as UserInfo;
   const navItems = getNavItemsByRole(userInfo?.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);

  return <DashboardNavbarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}/>
}
