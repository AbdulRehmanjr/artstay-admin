import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { craftRouter } from "~/server/api/routers/craft";
import { artisanRouter } from "~/server/api/routers/artisan";
import { safariRouter } from "~/server/api/routers/safari";
import { fairRouter } from "~/server/api/routers/fair";
import { travelRouter } from "~/server/api/routers/travel";
import { diningVoyageRouter } from "~/server/api/routers/dining-voyage";
import { languageServiceRouter } from "./routers/language-service";

export const appRouter = createTRPCRouter({
  craft: craftRouter,
  artisan: artisanRouter,
  safari: safariRouter,
  fair: fairRouter,
  travel: travelRouter,
  diningVoyage: diningVoyageRouter,
  languageService: languageServiceRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
