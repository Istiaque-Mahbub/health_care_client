import { getUserInfo } from "@/services/auth/getUserInfo"
import DashboardSidebarContent from "./DashboardSidebarContent"
import { getDefaultDashboardRoute } from "@/lib/auth.utils"
import { UserInfo } from "@/types/user.interface"
import { NavSection } from "@/types/dashboard.interface"
import { getNavItemsByRole } from "@/lib/navIttems.config"

export default async function DashboardSidebar() {
  const userInfo = (await getUserInfo()) as UserInfo

  const navItems:NavSection[] = getNavItemsByRole(userInfo.role)

  const dashboardHome = getDefaultDashboardRoute(userInfo?.role)

  return <DashboardSidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}/>
}
