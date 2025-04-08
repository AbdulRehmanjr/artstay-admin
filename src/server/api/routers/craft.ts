import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import axios from "axios";
import { env } from "~/env";

export const craftRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async () => {
        try {
            const response = await axios.get<ApiResponse<CraftProps[]>>(`${env.SERVER_URL}/craft`);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch crafts");
        }
    }),
    create: protectedProcedure
        .input(z.object({ craftName: z.string() }))
        .mutation(async ({ input }) => {
            try {
                await axios.post(`${env.SERVER_URL}/craft`, input);

            } catch (error) {
                console.error(error);
                throw new Error("Failed to create craft");
            }
        }),
    update: protectedProcedure
        .input(z.object({
            craftId: z.string(),
            craftName: z.string(),
        }))
        .mutation(async ({ input }) => {
            try {
                await axios.put(`${env.SERVER_URL}/craft`, input);
            } catch (error) {
                console.error(error);
                throw new Error("Failed to update craft");
            }
        }),
    delete: protectedProcedure
        .input(z.object({ craftId: z.string() }))
        .mutation(async ({ input }) => {
            try {
                await axios.delete(`${env.SERVER_URL}/craft/${input.craftId}`);

            } catch (error) {
                console.error(error);
                throw new Error("Failed to delete craft");
            }
        }),
    getAllSubCraftsByCraftId: protectedProcedure
        .input(z.object({craftId: z.string()}))
        .query(async ({ input }) => {
            try {
                const response = await axios.get<ApiResponse<SubCraftProps[]>>(`${env.SERVER_URL}/craft/sub-craft/${input.craftId}`);
                return response.data.data;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to fetch sub-crafts");
            }
        }),
    createSubCraft: protectedProcedure
        .input(z.object({
            craftId: z.string(),
            subCraftName: z.string(),
        }))
        .mutation(async ({ input }) => {
            try {
                await axios.post(`${env.SERVER_URL}/craft/sub-craft`, input);
            } catch (error) {
                console.error(error);
                throw new Error("Failed to create sub-craft");
            }
        }),
    updateSubCraft: protectedProcedure
        .input(z.object({
            subCraftId: z.string(),
            subCraftName: z.string(),
        }))
        .mutation(async ({ input }) => {
            try {
                await axios.put(`${env.SERVER_URL}/craft/sub-craft`, input);
            } catch (error) {
                console.error(error);
                throw new Error("Failed to update sub-craft");
            }
        }),
});

