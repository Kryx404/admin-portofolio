import {
    List,
    SimpleList,
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
import { useMediaQuery } from "@mui/material";
import { limitWords } from "../utils/textLimit";
import { columnWidth } from "../utils/columnWidth";

// List
export const CategoryList = (props) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList primaryText={(record) => record.kategori} />
            ) : (
                <Datagrid rowClick="edit">
                    <FunctionField
                        label="Kategori"
                        render={(record) => limitWords(record.kategori, 5)}
                    />
                </Datagrid>
            )}
        </List>
    );
};

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
