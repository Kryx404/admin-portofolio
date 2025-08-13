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
        const { data: oldData, error: getError } = await supabase
            .from(resource)
            .select("*")
            .eq("id", params.id)
            .single();
        if (getError) throw getError;

        const { data, error } = await supabase
            .from(resource)
            .delete()
            .eq("id", params.id)
            .select()
            .single();
        if (error) throw error;

        // Hapus file di storage untuk semua field gambar yang relevan
        const imageFields = [
            "image_url",
            "thumbnail",
            "flowchart",
            "design_system",
            "wireframe",
            "mockup",
            "prototype",
        ];
        for (const field of imageFields) {
            if (oldData && oldData[field]) {
                const url = oldData[field];
                const match = url.match(/assets\/(.+)$/);
                if (match && match[1]) {
                    await supabase.storage.from("assets").remove([match[1]]);
                }
            }
        }

        return { data };
    },
    getMany: (resource, params) => {
        // resource: nama tabel, params.ids: array id yang diminta
        return (
            supabase
                .from(resource)
                .select("*")
                .in("id", params.ids)
                // eslint-disable-next-line no-unused-vars
                .then(({ data, error }) => ({
                    data: data || [],
                }))
        );
    },
};

export default supabaseDataProvider;
