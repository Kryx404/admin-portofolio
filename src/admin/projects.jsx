import {
    List,
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
import ImageCell from "../utils/ImageCell";

// List
export const ProjectList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <FunctionField
                label="Description"
                render={(record) => {
                    const text = record.description || "";
                    const words = text.split(" ");
                    return words.length > 20
                        ? words.slice(0, 20).join(" ") + "..."
                        : text;
                }}
            />
            <FunctionField
                label="Image"
                render={(record) => <ImageCell src={record.image_url} />}
            />
            <TextField source="slug" />
            <ReferenceField
                label="Kategori"
                source="category_id"
                reference="project_category"
                link={false}>
                <TextField source="kategori" />
            </ReferenceField>
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

// Edit
export const ProjectEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
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
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <TextInput source="slug" />
            <ReferenceInput
                source="category_id"
                reference="project_category"
                label="Kategori">
                <SelectInput optionText="kategori" />
            </ReferenceInput>
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
            <Labeled label="Gambar">
                <ImageField source="image_url" />
            </Labeled>
        </SimpleShowLayout>
    </Show>
);
