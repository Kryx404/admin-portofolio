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
    ImageInput,
    ImageField,
    Labeled,
    FunctionField,
} from "react-admin";
import { useMediaQuery } from "@mui/material";
import { limitWords } from "../utils/textLimit";
import ImageCell from "../utils/ImageCell";
import { columnWidth } from "../utils/columnWidth";

// List
export const SertifikatList = (props) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.title}
                    secondaryText={(record) => limitWords(record.description,10)}
                    tertiaryText={(record) => (
                        <ImageCell src={record.image_url} />
                    )}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <FunctionField
                        label="Title"
                        render={(record) => limitWords(record.title, 5)}
                        sx={columnWidth(400, 700)}
                    />
                    <FunctionField
                        label="Description"
                        render={(record) => limitWords(record.description, 5)}
                        sx={columnWidth(400, 700)}
                    />
                    <FunctionField
                        label="Image"
                        render={(record) => (
                            <ImageCell src={record.image_url} />
                        )}
                    />
                </Datagrid>
            )}
        </List>
    );
};

// Create
export const SertifikatCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="title" />
            <TextInput source="description" />
            <ImageInput
                source="image_url"
                label="Upload Gambar"
                accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

// Edit
export const SertifikatEdit = (props) => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <TextInput source="id" disabled label="ID" />
            <TextInput source="title" label="Judul Sertifikat" />
            <TextInput source="description" label="Deskripsi" />
            <Labeled label="Gambar Sertifikat Lama">
                <ImageField source="image_url" />
            </Labeled>
            <ImageInput
                source="image_url"
                label="Upload Gambar"
                accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

// Show
export const SertifikatShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" label="Judul Sertifikat" />
            <TextField source="description" label="Deskripsi" />
            <ImageField source="image_url" label="Gambar Sertifikat" />
        </SimpleShowLayout>
    </Show>
);
