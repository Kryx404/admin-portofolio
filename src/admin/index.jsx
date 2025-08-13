import { Admin, Resource, ListGuesser } from "react-admin";
import supabaseDataProvider from "./supabaseDataProvider";

const MyAdmin = () => (
    <Admin dataProvider={supabaseDataProvider}>
        {/* Ganti nama resource sesuai tabel di Supabase kamu */}
        <Resource name="projects" list={ListGuesser} />
        <Resource name="project_details" list={ListGuesser} />
    </Admin>
);

export default MyAdmin;
