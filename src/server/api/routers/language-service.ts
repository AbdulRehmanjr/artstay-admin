import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import axios from "axios";
import { AxiosError } from "axios";
import { env } from "~/env";



export const languageServiceRouter = createTRPCRouter({
  getAllLanguageServices: protectedProcedure.query(async () => {
    try {
      const response = await axios.get<ApiResponse<LanguageServiceProps[]>>(
        `${env.SERVER_URL}/language/all`,
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch language services");
    }
  }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        languageServiceId: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios.patch<ApiResponse<LanguageServiceProps>>(
          `${env.SERVER_URL}/language/toggle-status`,
          {
            languageServiceId:input.languageServiceId,
            status: input.status,
          },
        );
        return response.data.data;
      } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error.message);
            throw new Error(error.message);
        }
        throw new Error("Failed to update language service status");
      }
    }),
}); 