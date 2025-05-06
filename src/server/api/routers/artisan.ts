import axios, { AxiosError } from "axios";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";
import { z } from "zod";





export const artisanRouter = createTRPCRouter({

    getAllArtisans: protectedProcedure.query(async () => {
        try {
            const response = await axios.get<ApiResponse<ArtisanDetailProps[]>>(`${env.SERVER_URL}/artisan/all`);
            return response.data.data;
        } catch (error) {

            if (error instanceof AxiosError) {
                console.error(error.message);
                throw new Error(error.message);
            }
            console.error(error);
            throw new Error("Failed to create craft");
        }
    }),
    toggleStatus: protectedProcedure
        .input(z.object({ artisanId: z.string(), status: z.boolean() }))
        .mutation(async ({ input }) => {
            try {
                const response = await axios.put<ApiResponse<null>>(`${env.SERVER_URL}/artisan/toggle-status`, input);
                return response.data.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error.message);
                    throw new Error(error.message);
                }
                console.error(error);
                throw new Error("Failed to create craft");
            }
        }),
})