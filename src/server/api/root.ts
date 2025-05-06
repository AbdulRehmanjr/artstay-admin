
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { craftRouter } from "~/server/api/routers/craft";
import { artisanRouter } from "~/server/api/routers/artisan";
import { safariRouter } from "~/server/api/routers/safari";

export const appRouter = createTRPCRouter({
  craft: craftRouter,
  artisan: artisanRouter,
  safari : safariRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
