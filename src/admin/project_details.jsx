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
    ArrayField,
    ChipField,
    ReferenceField,
    SingleFieldList,
    FunctionField,
    Labeled,
    ImageField,
    ImageInput,
    ReferenceInput,
    SelectInput,
} from "react-admin";
import { limitWords, limitChars } from "../utils/textLimit";
import { columnWidth } from "../utils/columnWidth";
import ImageCell from "../utils/ImageCell";

// List
export const ProjectDetailsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField
                label="Project Title"
                source="project_id"
                reference="projects"
                link={false}>
                <FunctionField render={(record) => limitWords(record.title)} />
            </ReferenceField>
            <FunctionField
                label="Thumbnail"
                render={(record) => <ImageCell src={record.thumbnail} />}
            />
            <FunctionField
                label="Description"
                render={(record) => limitWords(record.description)}
                sx={columnWidth(250, 500)}
            />
            <FunctionField
                label="User research"
                render={(record) => limitWords(record.user_research)}
                sx={columnWidth(250, 500)}
            />
            <FunctionField
                label="Flowchart"
                render={(record) => <ImageCell src={record.flowchart} />}
            />
            <FunctionField
                label="Design System"
                render={(record) => <ImageCell src={record.design_system} />}
            />
            <FunctionField
                label="Wireframe"
                render={(record) => <ImageCell src={record.wireframe} />}
            />
            <FunctionField
                label="Mockup"
                render={(record) => <ImageCell src={record.mockup} />}
            />
            <FunctionField
                label="Prototype"
                render={(record) => <ImageCell src={record.prototype} />}
            />
            <ArrayField source="fitur">
                <SingleFieldList>
                    <FunctionField
                        render={(record) =>
                            record && record.title ? record.title : ""
                        }
                        sx={columnWidth(200, 400)}
                    />
                </SingleFieldList>
            </ArrayField>
            <FunctionField
                label="User research link"
                render={(record) => limitChars(record.user_research_link)}
            />
            <FunctionField
                label="Flowchart link"
                render={(record) => limitChars(record.flowchart_link)}
            />
            <FunctionField
                label="Design system link"
                render={(record) => limitChars(record.design_system_link)}
            />
            <FunctionField
                label="Wireframe link"
                render={(record) => limitChars(record.wireframe_link)}
            />
            <FunctionField
                label="Mockup link"
                render={(record) => limitChars(record.mockup_link)}
            />
            <FunctionField
                label="Prototype link"
                render={(record) => limitChars(record.prototype_link)}
            />
        </Datagrid>
    </List>
);

// Edit
export const ProjectDetailsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm
            transform={(data) => ({
                project_id: data.project_id,
                thumbnail: data.thumbnail?.src,
                flowchart: data.flowchart?.src,
                design_system: data.design_system?.src,
                wireframe: data.wireframe?.src,
                mockup: data.mockup?.src,
                prototype: data.prototype?.src,
                description: data.description,
                user_research: data.user_research,
                user_research_link: data.user_research_link,
                flowchart_link: data.flowchart_link,
                design_system_link: data.design_system_link,
                wireframe_link: data.wireframe_link,
                mockup_link: data.mockup_link,
                prototype_link: data.prototype_link,
            })}>
            <TextInput source="id" disabled />
            <ReferenceInput
                label="Project"
                source="project_id"
                reference="projects">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <Labeled label="Gambar Thumbnail Lama">
                <ImageField source="thumbnail" />
            </Labeled>
            <ImageInput
                source="thumbnail"
                label="Upload Thumbnail"
                accept="image/*">
                <ImageField source="src" title="Thumbnail" />
            </ImageInput>
            <TextInput source="description" />
            <TextInput source="user_research" />
            <TextInput source="user_research_link" />
            <Labeled label="Gambar Flowchart Lama">
                <ImageField source="flowchart" />
            </Labeled>
            <ImageInput
                source="flowchart"
                label="Upload Flowchart"
                accept="image/*">
                <ImageField source="src" title="Flowchart" />
            </ImageInput>
            <TextInput source="flowchart_link" />

            <Labeled label="Gambar Design System Lama">
                <ImageField source="design_system" />
            </Labeled>
            <ImageInput
                source="design_system"
                label="Upload Design System"
                accept="image/*">
                <ImageField source="src" title="Design System" />
            </ImageInput>
            <TextInput source="design_system_link" />

            <Labeled label="Gambar Wireframe Lama">
                <ImageField source="wireframe" />
            </Labeled>
            <ImageInput
                source="wireframe"
                label="Upload Wireframe"
                accept="image/*">
                <ImageField source="src" title="Wireframe" />
            </ImageInput>
            <TextInput source="wireframe_link" />

            <Labeled label="Gambar Mockup Lama">
                <ImageField source="mockup" />
            </Labeled>
            <ImageInput source="mockup" label="Upload Mockup" accept="image/*">
                <ImageField source="src" title="Mockup" />
            </ImageInput>
            <TextInput source="mockup_link" />

            <Labeled label="Gambar Prototype Lama">
                <ImageField source="prototype" />
            </Labeled>
            <ImageInput
                source="prototype"
                label="Upload Prototype"
                accept="image/*">
                <ImageField source="src" title="Prototype" />
            </ImageInput>
            <TextInput source="prototype_link" />
        </SimpleForm>
    </Edit>
);

// Create
export const ProjectDetailsCreate = (props) => (
    <Create {...props}>
        <SimpleForm
            // Hanya kirim field yang sesuai dengan skema tabel
            transform={(data) => ({
                project_id: data.project_id,
                thumbnail: data.thumbnail?.src,
                flowchart: data.flowchart?.src,
                design_system: data.design_system?.src,
                wireframe: data.wireframe?.src,
                mockup: data.mockup?.src,
                prototype: data.prototype?.src,
                description: data.description,
                user_research: data.user_research,
                user_research_link: data.user_research_link,
                flowchart_link: data.flowchart_link,
                design_system_link: data.design_system_link,
                wireframe_link: data.wireframe_link,
                mockup_link: data.mockup_link,
                prototype_link: data.prototype_link,
            })}>
            <ReferenceInput
                label="Project"
                source="project_id"
                reference="projects">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <ImageInput
                source="thumbnail"
                label="Upload Thumbnail"
                accept="image/*">
                <ImageField source="src" title="Thumbnail" />
            </ImageInput>
            <TextInput source="description" />
            <TextInput source="user_research" />
            <TextInput source="user_research_link" />
            <ImageInput
                source="flowchart"
                label="Upload Flowchart"
                accept="image/*">
                <ImageField source="src" title="Flowchart" />
            </ImageInput>
            <TextInput source="flowchart_link" />
            <ImageInput
                source="design_system"
                label="Upload Design System"
                accept="image/*">
                <ImageField source="src" title="Design System" />
            </ImageInput>
            <TextInput source="design_system_link" />
            <ImageInput
                source="wireframe"
                label="Upload Wireframe"
                accept="image/*">
                <ImageField source="src" title="Wireframe" />
            </ImageInput>
            <TextInput source="wireframe_link" />
            <ImageInput source="mockup" label="Upload Mockup" accept="image/*">
                <ImageField source="src" title="Mockup" />
            </ImageInput>
            <TextInput source="mockup_link" />
            <ImageInput
                source="prototype"
                label="Upload Prototype"
                accept="image/*">
                <ImageField source="src" title="Prototype" />
            </ImageInput>
            <TextInput source="prototype_link" />
        </SimpleForm>
    </Create>
);

// Show
export const ProjectDetailsShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <ReferenceField
                label="Project Title"
                source="project_id"
                reference="projects"
                link={false}>
                <TextField source="title" />
            </ReferenceField>
            <TextField source="description" />
            <TextField source="user_research" />
            <ImageField source="flowchart" label="Flowchart" />
            <ImageField source="design_system" label="Design System" />
            <ImageField source="wireframe" label="Wireframe" />
            <ImageField source="mockup" label="Mockup" />
            <ImageField source="prototype" label="Prototype" />
            <ImageField source="thumbnail" label="Thumbnail" />
            <ArrayField source="fitur" label="Fitur">
                <SingleFieldList>
                    <TextField source="title" />
                </SingleFieldList>
            </ArrayField>
            <TextField source="user_research_link" />
            <TextField source="flowchart_link" />
            <TextField source="design_system_link" />
            <TextField source="wireframe_link" />
            <TextField source="mockup_link" />
            <TextField source="prototype_link" />
        </SimpleShowLayout>
    </Show>
);
