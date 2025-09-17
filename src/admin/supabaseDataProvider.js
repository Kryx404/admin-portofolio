import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImage(file, folder = "project") {
    const filePath = `${folder}/${file.name}`; // gunakan nama file asli

    const { error } = await supabase.storage
        .from("assets")
        .upload(filePath, file, { upsert: true }); // upsert agar bisa replace jika nama sama

    if (error) throw error;

    const { data } = supabase.storage.from("assets").getPublicUrl(filePath);

    return data.publicUrl;
}

const supabaseDataProvider = {
    // eslint-disable-next-line no-unused-vars
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
        let dataToInsert = { ...params.data };

        if (resource === "project_details") {
            // Proses upload untuk setiap field gambar
            const imageFields = [
                "thumbnail",
                "flowchart",
                "design_system",
                "wireframe",
                "mockup",
                "prototype",
            ];
            for (const field of imageFields) {
                if (dataToInsert[field] && dataToInsert[field].rawFile) {
                    dataToInsert[field] = await uploadImage(
                        dataToInsert[field].rawFile,
                        "project",
                    );
                } else if (dataToInsert[field] && dataToInsert[field].src) {
                    dataToInsert[field] = dataToInsert[field].src;
                }
            }
            delete dataToInsert.image_url;
        } else if (dataToInsert.image_url && dataToInsert.image_url.rawFile) {
            const folder = resource === "projects" ? "project" : resource;
            dataToInsert.image_url = await uploadImage(
                dataToInsert.image_url.rawFile,
                folder,
            );
        }

        const { data, error } = await supabase
            .from(resource)
            .insert([dataToInsert])
            .select()
            .single();
        if (error) throw error;
        return { data };
    },
    update: async (resource, params) => {
        let dataToUpdate = { ...params.data };

        if (resource === "project_details") {
            const imageFields = [
                "thumbnail",
                "flowchart",
                "design_system",
                "wireframe",
                "mockup",
                "prototype",
            ];
            for (const field of imageFields) {
                if (dataToUpdate[field] && dataToUpdate[field].rawFile) {
                    dataToUpdate[field] = await uploadImage(
                        dataToUpdate[field].rawFile,
                        "project",
                    );
                } else if (dataToUpdate[field] && dataToUpdate[field].src) {
                    dataToUpdate[field] = dataToUpdate[field].src;
                }
            }
            delete dataToUpdate.image_url;
        } else if (dataToUpdate.image_url && dataToUpdate.image_url.rawFile) {
            const folder = resource === "projects" ? "project" : resource;
            dataToUpdate.image_url = await uploadImage(
                dataToUpdate.image_url.rawFile,
                folder,
            );
        }

        const { data, error } = await supabase
            .from(resource)
            .update(dataToUpdate)
            .eq("id", params.id)
            .select()
            .single();
        if (error) throw error;
        return { data };
    },
    delete: async (resource, params) => {
        // ambil record lama (untuk path file)
        const { data: oldData, error: getError } = await supabase
            .from(resource)
            .select("*")
            .eq("id", params.id)
            .single();
        if (getError) throw getError;

        // helper untuk ekstrak path storage dari publicUrl
        const extractPath = (url) => {
            if (!url) return null;
            try {
                const u = new URL(url);
                // pathname contoh: /storage/v1/object/public/assets/project/filename.png
                const idx = u.pathname.indexOf("/assets/");
                if (idx >= 0) return u.pathname.slice(idx + "/assets/".length);
            } catch (e) {
                // fallback regex
                const match = String(url).match(/assets\/(.+)$/);
                if (match && match[1]) return match[1];
            }
            return null;
        };

        // kumpulkan semua file keys yang perlu dihapus
        const imageFields = [
            "image_url",
            "thumbnail",
            "flowchart",
            "design_system",
            "wireframe",
            "mockup",
            "prototype",
        ];
        const toRemove = [];
        for (const field of imageFields) {
            const url = oldData?.[field];
            const key = extractPath(url);
            if (key) toRemove.push(key);
        }

        // hapus file di storage terlebih dahulu (ignore gagal hapus jika permission)
        if (toRemove.length > 0) {
            const { error: removeError } = await supabase.storage
                .from("assets")
                .remove(toRemove);
            // jika error permission atau lainnya, log agar bisa dicek di console
            if (removeError)
                console.warn("Supabase storage remove error:", removeError);
        }

        // lalu hapus row dari DB
        const { data, error } = await supabase
            .from(resource)
            .delete()
            .eq("id", params.id)
            .select()
            .single();
        if (error) throw error;
        return { data };
    },
    deleteMany: async (resource, params) => {
        // ambil semua record dulu untuk dapat file paths
        const { data: records, error: getError } = await supabase
            .from(resource)
            .select("*")
            .in("id", params.ids);
        if (getError) throw getError;

        const extractPath = (url) => {
            if (!url) return null;
            try {
                const u = new URL(url);
                const idx = u.pathname.indexOf("/assets/");
                if (idx >= 0) return u.pathname.slice(idx + "/assets/".length);
            } catch (e) {
                const match = String(url).match(/assets\/(.+)$/);
                if (match && match[1]) return match[1];
            }
            return null;
        };

        const toRemove = [];
        const imageFields = [
            "image_url",
            "thumbnail",
            "flowchart",
            "design_system",
            "wireframe",
            "mockup",
            "prototype",
        ];
        for (const rec of records || []) {
            for (const f of imageFields) {
                const key = extractPath(rec?.[f]);
                if (key) toRemove.push(key);
            }
        }

        if (toRemove.length > 0) {
            const { error: removeError } = await supabase.storage
                .from("assets")
                .remove(toRemove);
            if (removeError)
                console.warn("Supabase storage remove error:", removeError);
        }

        const { error } = await supabase
            .from(resource)
            .delete()
            .in("id", params.ids);
        if (error) throw error;
        return { data: params.ids };
    },
};

export default supabaseDataProvider;
