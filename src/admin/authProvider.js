import { supabase } from "./supabaseDataProvider";

const INACTIVITY_LIMIT_MS = 60 * 60 * 1000; // 1 jam

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
        const lastActive = localStorage.getItem("lastActive");
        const now = Date.now();
        if (lastActive && now - Number(lastActive) > INACTIVITY_LIMIT_MS) {
            await supabase.auth.signOut();
            localStorage.removeItem("lastActive");
            throw new Error("Session expired. Please login again.");
        }
        localStorage.setItem("lastActive", now);

        // Cek session expiry dari Supabase
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session || !sessionData.session.expires_at) {
            await supabase.auth.signOut();
            throw new Error("Session expired. Please login again.");
        }
        const expiresAtMs = sessionData.session.expires_at * 1000;
        if (now > expiresAtMs) {
            await supabase.auth.signOut();
            throw new Error("Session expired. Please login again.");
        }

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
