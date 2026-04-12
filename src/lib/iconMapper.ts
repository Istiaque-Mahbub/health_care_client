import type { LucideIcon } from "lucide-react";
import  * as Icons from "lucide-react";

export const getIconComponent = (iconName: string): LucideIcon => {
 const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;

 if(!IconComponent){
    return Icons.HelpCircle as LucideIcon; 
 }

 return IconComponent as LucideIcon;
}