import axios, { AxiosError } from "axios";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";
import { z } from "zod";





export const safariRouter = createTRPCRouter({

    getAllSafaris: protectedProcedure.query(async () => {
        try {
            const response = await axios.get<ApiResponse<SafariProps[]>>(`${env.SERVER_URL}/safari/all`);
            return response.data.data;
        } catch (error) {

            if (error instanceof AxiosError) {
                console.error(error.message);
                throw new Error(error.message);
            }
            console.error(error);
            throw new Error("Failed to fetch safaris");
        }
    }),
    toggleStatus: protectedProcedure
        .input(z.object({ safariId: z.string(), status: z.boolean() }))
        .mutation(async ({ input }) => {
            try {
                const response = await axios.put<ApiResponse<null>>(`${env.SERVER_URL}/safari/toggle-status`, input);
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