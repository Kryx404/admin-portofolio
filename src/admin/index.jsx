import { Admin, Resource, Login, bwLightTheme, bwDarkTheme  } from "react-admin";
import supabaseDataProvider from "./supabaseDataProvider";
import authProvider from "./authProvider";
import {
    ProjectList,
    ProjectEdit,
    ProjectCreate,
    ProjectShow,
} from "./projects";
import {
    ProjectDetailsList,
    ProjectDetailsEdit,
    ProjectDetailsCreate,
    ProjectDetailsShow,
} from "./project_details";
import {
    SertifikatList,
    SertifikatCreate,
    SertifikatEdit,
    SertifikatShow,
} from "./sertifikat";
import { CategoryList, CategoryEdit, CategoryCreate } from "./project_category";
import {
    PengalamanList,
    PengalamanCreate,
    PengalamanEdit,
    PengalamanShow,
} from "./pengalaman";

const CustomLoginPage = () => <Login usernameLabel="Email" />;

const MyAdmin = () => (
    <Admin
        dataProvider={supabaseDataProvider}
        authProvider={authProvider}
        loginPage={CustomLoginPage}
        theme={bwLightTheme}
        darkTheme={bwDarkTheme}>
        <Resource
            name="projects"
            list={ProjectList}
            edit={ProjectEdit}
            create={ProjectCreate}
            show={ProjectShow}
        />
        <Resource
            name="project_details"
            list={ProjectDetailsList}
            edit={ProjectDetailsEdit}
            create={ProjectDetailsCreate}
            show={ProjectDetailsShow}
        />
        <Resource
            name="sertifikat"
            list={SertifikatList}
            create={SertifikatCreate}
            edit={SertifikatEdit}
            show={SertifikatShow}
        />
        <Resource
            name="project_category"
            list={CategoryList}
            edit={CategoryEdit}
            create={CategoryCreate}
        />
        <Resource
            name="pengalaman"
            list={PengalamanList}
            edit={PengalamanEdit}
            create={PengalamanCreate}
            show={PengalamanShow}
        />
    </Admin>
);

export default MyAdmin;
