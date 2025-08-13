import { Admin, Resource, Login } from "react-admin";
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

const CustomLoginPage = () => <Login usernameLabel="Email" />;

const MyAdmin = () => (
    <Admin
        dataProvider={supabaseDataProvider}
        authProvider={authProvider}
        loginPage={CustomLoginPage}>
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
    </Admin>
);

export default MyAdmin;
