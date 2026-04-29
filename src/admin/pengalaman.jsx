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
    NumberInput,
    NumberField,
    FunctionField,
} from "react-admin";
import { useMediaQuery } from "@mui/material";
import { limitWords } from "../utils/textLimit";
import { columnWidth } from "../utils/columnWidth";

// List
export const PengalamanList = (props) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.posisi}
                    secondaryText={(record) => record.perusahaan}
                    tertiaryText={(record) => record.tahun}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <NumberField source="urutan" label="Urutan" />
                    <TextField source="tahun" label="Tahun" />
                    <TextField source="posisi" label="Posisi" />
                    <TextField source="perusahaan" label="Perusahaan" />
                    <FunctionField
                        label="Deskripsi"
                        render={(record) => limitWords(record.deskripsi, 5)}
                        sx={columnWidth(400, 700)}
                    />
                </Datagrid>
            )}
        </List>
    );
};

// Create
export const PengalamanCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <NumberInput source="urutan" label="Urutan" />
            <TextInput source="tahun" label="Tahun (cth: 2020 - 2022)" />
            <TextInput source="posisi" label="Posisi / Jabatan" />
            <TextInput source="perusahaan" label="Perusahaan / Institusi" />
            <TextInput source="deskripsi" label="Deskripsi" multiline fullWidth />
        </SimpleForm>
    </Create>
);

// Edit
export const PengalamanEdit = (props) => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <TextInput source="id" disabled label="ID" />
            <NumberInput source="urutan" label="Urutan" />
            <TextInput source="tahun" label="Tahun (cth: 2020 - 2022)" />
            <TextInput source="posisi" label="Posisi / Jabatan" />
            <TextInput source="perusahaan" label="Perusahaan / Institusi" />
            <TextInput source="deskripsi" label="Deskripsi" multiline fullWidth />
        </SimpleForm>
    </Edit>
);

// Show
export const PengalamanShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <NumberField source="urutan" label="Urutan" />
            <TextField source="tahun" label="Tahun" />
            <TextField source="posisi" label="Posisi" />
            <TextField source="perusahaan" label="Perusahaan" />
            <TextField source="deskripsi" label="Deskripsi" />
        </SimpleShowLayout>
    </Show>
);
