"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/types/user.interface";
import { Bell, Search, User } from "lucide-react";
import UserDropdown from "./UserDropdown";



interface DashboardNavbarContentProps {
  userInfo: UserInfo | null;
}

export default function DashboardNavbarContent({ userInfo }: DashboardNavbarContentProps) {
   
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          
         {/* search bar */}
         <div className="flex-1">

            <div className="relative">
                <Search className="absolute left-3 top-1 h-4 w-4 translate-y-1/2 text-muted-foreground"/>
                <Input type="search" placeholder="Search..." className="pl-9"/>
            </div>

         </div>

           {/* Notification  */}
        <Button variant="outline" size="icon" className="relative">
           <Bell className="h-5 w-5"/>
           <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

        </Button>

         {/* user Drop down */}

         <UserDropdown userInfo={userInfo}/>

        </div>
    </header>
  )
}
