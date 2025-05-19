import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios, { AxiosError } from "axios";
import { env } from "~/env";


export const diningVoyageRouter = createTRPCRouter({
  getAllDiningVoyages: protectedProcedure.query(async () => {
    try {
      const response = await axios.get<ApiResponse<RestaurantProps[]>>(`${env.SERVER_URL}/dining/all`);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        throw new Error(error.message);
      }
      console.error(error);
      throw new Error("Failed to fetch dining voyages");
    }
  }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        restaurantId: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios.patch<ApiResponse<null>>(
          `${env.SERVER_URL}/dining/toggle-status`,
          input
        );
        return response.data.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Failed to update dining voyage status");
      }
    }),
}); 