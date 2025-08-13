import { supabase } from "./supabaseDataProvider";

const authProvider = {
    // Panggil saat login
    login: async ({ username, password }) => {
        const email = username; // React Admin form mengirim 'username'
        console.log("Login attempt:", email, password);
        const { error, data } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        return;
    },
    // Panggil saat logout
    logout: async () => {
        await supabase.auth.signOut();
        return;
    },
    // Cek status login
    checkAuth: async () => {
        const { data } = await supabase.auth.getUser();
        if (!data.user) throw new Error("Not authenticated");
        return;
    },
    // Cek permission (opsional)
    getPermissions: async () => {
        return;
    },
    // Dapatkan user info (opsional)
    getIdentity: async () => {
        const { data } = await supabase.auth.getUser();
        if (!data.user) return null;
        return {
            id: data.user.id,
            fullName: data.user.email,
        };
    },
};

export default authProvider;
