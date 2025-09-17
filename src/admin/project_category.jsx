import {
    List,
    Datagrid,
    TextField,
    Edit,
    Create,
    Show,
    SimpleForm,
    TextInput,
    SimpleShowLayout,
    Labeled,
    FunctionField,
} from "react-admin";
import { limitWords } from "../utils/textLimit";
import { columnWidth } from "../utils/columnWidth";

// List
export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <FunctionField
                label="Kategori"
                render={(record) => limitWords(record.kategori, 5)}
                sx={columnWidth(400, 700)}
            />
           
        </Datagrid>
    </List>
);

// Create
export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="kategori" />
        </SimpleForm>
    </Create>
);

// Edit
export const CategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <TextInput source="id" disabled label="ID" />
            <TextInput source="kategori" label="Judul Kategori" />
        </SimpleForm>
    </Edit>
);

// Show
export const CategoryShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="kategori" label="Judul Kategori" />
        </SimpleShowLayout>
    </Show>
);
