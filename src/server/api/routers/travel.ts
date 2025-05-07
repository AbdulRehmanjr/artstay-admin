import axios, { AxiosError } from "axios";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";
import { z } from "zod";



export const travelRouter = createTRPCRouter({

    getAllTravels: protectedProcedure.query(async () => {
        try {
            const response = await axios.get<ApiResponse<TravelPlanerProps[]>>(`${env.SERVER_URL}/travel/all`);
            return response.data.data;
        } catch (error) {

            if (error instanceof AxiosError) {
                console.error(error.message);
                throw new Error(error.message);
            }
            console.error(error);
            throw new Error("Failed to fetch travel planners");
        }
    }),
    toggleStatus: protectedProcedure
        .input(z.object({ travelPlanerId: z.string(), status: z.boolean() }))
        .mutation(async ({ input }) => {
            try {
                const response = await axios.put<ApiResponse<null>>(`${env.SERVER_URL}/travel/toggle-status`, input);
                return response.data.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error.message);
                    throw new Error(error.message);
                }
                console.error(error);
                throw new Error("Failed to toggle status");
            }
        }),
})