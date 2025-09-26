import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    DateField,
    Edit,
    Create,
    Show,
    SimpleForm,
    TextInput,
    SimpleShowLayout,
    ImageInput,
    ImageField,
    FunctionField,
    Labeled,
    ReferenceField,
    ReferenceInput,
    SelectInput,
} from "react-admin";
import { useMediaQuery } from "@mui/material";
import ImageCell from "../utils/ImageCell";
import { limitWords, limitChars } from "../utils/textLimit";

// List
export const ProjectList = (props) => {
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
                    <TextField source="title" />
                    <FunctionField
                        label="Description"
                        render={(record) => limitWords(record.description)}
                    />
                    <FunctionField
                        label="Image"
                        render={(record) => (
                            <ImageCell src={record.image_url} />
                        )}
                    />
                    <TextField source="slug" />
                    <ReferenceField
                        label="Kategori"
                        source="category_id"
                        reference="project_category"
                        link={false}>
                        <TextField source="kategori" />
                    </ReferenceField>
                    <FunctionField
                        label="Github"
                        render={(record) => limitChars(record.github)}
                    />
                    <FunctionField
                        label="Preview"
                        render={(record) => limitChars(record.preview)}
                    />
                    <DateField source="created_at" />
                </Datagrid>
            )}
        </List>
    );
};

// Edit
export const ProjectEdit = (props) => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <TextInput source="id" disabled />
            <TextInput source="title" />
            <TextInput source="description" />
            <TextInput source="slug" />
            <ReferenceInput
                source="category_id"
                reference="project_category"
                label="Kategori">
                <SelectInput optionText="kategori" />
            </ReferenceInput>
            <TextInput source="github" />
            <TextInput source="preview" />
            <Labeled label="Gambar Lama">
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

// Create
export const ProjectCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="title" />
            <TextInput source="description" />
            <TextInput source="slug" />
            <ReferenceInput
                source="category_id"
                reference="project_category"
                label="Kategori">
                <SelectInput optionText="kategori" />
            </ReferenceInput>
            <TextInput source="github" />
            <TextInput source="preview" />
            <ImageInput source="image_url" label="Image" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

// Show
export const ProjectShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="slug" />
            <ReferenceField
                label="Kategori"
                source="category_id"
                reference="project_category"
                link={false}>
                <TextField source="kategori" />
            </ReferenceField>
            <TextField source="github" />
            <TextField source="preview" />
            <Labeled label="Gambar">
                <ImageField source="image_url" />
            </Labeled>
        </SimpleShowLayout>
    </Show>
);
