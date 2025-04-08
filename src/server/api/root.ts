
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { craftRouter } from "~/server/api/routers/craft";

export const appRouter = createTRPCRouter({
  craft: craftRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
