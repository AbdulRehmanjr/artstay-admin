"use client";

import {useSidebar} from "~/components/ui/sidebar";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";

export const ResponsiveContent = ({ children }: { children: React.ReactNode }) =>{
    const { state, isMobile } = useSidebar();
    
    return (
      <ScrollArea 
        className={cn(
          !isMobile && state === "expanded" 
            ? "w-[calc(100vw-17rem)]"
            : !isMobile && state === "collapsed" 
              ? "w-[calc(100vw-3rem)]" 
              : "w-full"
        )}
      >
          {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }