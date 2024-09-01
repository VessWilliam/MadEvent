import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowId,
  GridToolbarContainer,
  GridSlots,
  GridRowModel,
} from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEvents } from "../../hooks/useEvents";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useCallback } from "react";
import { IEvent } from "../../types/eventTypes";

function CreateNewEvent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/CreateEvent");
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function DataGridDemo() {
  const { events, updateEvent } = useEvents();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleSaveClick = useCallback(
    (id: GridRowId) => async () => {
      setRowModesModel((prevModel) => ({
        ...prevModel,
        [id]: { mode: GridRowModes.View },
      }));
    },
    []
  );

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel) => {
      const updatedRow = { ...newRow } as IEvent;

      try {
        await updateEvent(updatedRow.id as any, {
          name: updatedRow.name,
          location: updatedRow.location,
          thumbnail: updatedRow.thumbnail,
          status: updatedRow.status,
        });
      } catch (error) {
        console.error("Failed to update event", error);
      }

      return updatedRow;
    },
    [updateEvent]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel((prevModel) => ({
        ...prevModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      }));
    },
    []
  );

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel((prevModel) => ({
        ...prevModel,
        [id]: { mode: GridRowModes.Edit },
      }));
    },
    []
  );

  const columns: GridColDef<IEvent>[] = [
    { field: "name", headerName: "Name", width: 150, editable: true },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 180,
      editable: false,
    },
    { field: "endDate", headerName: "End Date", width: 180, editable: false },
    { field: "location", headerName: "Location", width: 150, editable: true },
    { field: "thumbnail", headerName: "Thumbnail", width: 150, editable: true },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Completed", "Ongoing"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return isInEditMode
          ? [
              <GridActionsCellItem
                key="save"
                icon={<SaveIcon />}
                label="Save"
                color="warning"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                key="cancel"
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(id)}
                color="warning"
              />,
            ]
          : [
              <GridActionsCellItem
                key="edit"
                icon={<EditIcon />}
                label="Edit"
                color="warning"
                onClick={handleEditClick(id)}
              />,
            ];
      },
    },
  ];

  return (
    <Container>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          style={{ backgroundColor: "white" }}
          rows={events}
          columns={columns}
          filterMode="client"
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{
            toolbar: CreateNewEvent as GridSlots["toolbar"],
          }}
          pageSizeOptions={[5]}
          processRowUpdate={processRowUpdate}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}
