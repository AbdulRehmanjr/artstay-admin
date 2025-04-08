"use client";

import { useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { signOut } from "next-auth/react";
import { AccountTypeDisplayNames } from "~/constants";

export function NavUser() {
  const session = useSession();

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
          <User className="text-primary h-4 w-4" />
        </div>
        <p className="text-muted-foreground text-xs">
          {session.data?.user?.accountType
            ? (AccountTypeDisplayNames[session.data.user.accountType] ??
              session.data.user.accountType)
            : "No account type"}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="h-8 w-8"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
