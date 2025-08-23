// lib/icons.ts
import { 
    HeartHandshake,
    Code,
    Layers,
    RefreshCw,
    Target,
    LifeBuoy,
    TrendingUp
  } from "lucide-react";
  import type { ComponentType } from "react";
  
  export const iconMap: Record<string, ComponentType<any>> = {
    HeartHandshake,
    Code,
    Layers,
    RefreshCw,
    Target,
    LifeBuoy,
    TrendingUp,
  };
  
  export type IconName = keyof typeof iconMap;
  