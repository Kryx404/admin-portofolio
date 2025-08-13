import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

console.log("SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("SUPABASE_KEY:", import.meta.env.VITE_SUPABASE_KEY);

export const supabase = createClient(supabaseUrl, supabaseKey);

// Simple REST-like dataProvider for React Admin using Supabase
const supabaseDataProvider = {
    getList: async (resource, params) => {
        const { data, error, count } = await supabase
            .from(resource)
            .select("*", { count: "exact" });
        if (error) throw error;
        return {
            data,
            total: count || data.length,
        };
    },
    getOne: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .select("*")
            .eq("id", params.id)
            .single();
        if (error) throw error;
        return { data };
    },
    create: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .insert([params.data])
            .select()
            .single();
        if (error) throw error;
        return { data };
    },
    update: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .update(params.data)
            .eq("id", params.id)
            .select()
            .single();
        if (error) throw error;
        return { data };
    },
    delete: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .delete()
            .eq("id", params.id)
            .select()
            .single();
        if (error) throw error;
        return { data };
    },
};

export default supabaseDataProvider;
