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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import {
  useGetAllEvents,
  useUpdateEvent,
  useDeleteEvent,
} from "../../hooks/useEvents";
import { IEvent } from "../../types/eventTypes";

function CreateNewEvent() {
  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        component={Link}
        to="/createvent"
        startIcon={<AddIcon />}
        sx={{ textTransform: "none" }}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function EventTable() {
  const { data: events = [], isLoading, error } = useGetAllEvents();
  const { mutate: updateEvent } = useUpdateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();
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

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel) => {
      const updatedRow = { ...newRow } as IEvent;
      try {
        await updateEvent({
          id: updatedRow.id as string,
          updatedData: {
            name: updatedRow.name as string,
            location: updatedRow.location as string,
            thumbnail: updatedRow.thumbnail as string,
            status: updatedRow.status as string,
          },
        });
      } catch (error) {
        console.error("Failed to update event", error);
      }

      return updatedRow;
    },
    [updateEvent]
  );

  const handleDeleteClick = useCallback(
    (id: GridRowId) => async () => {
      try {
        await deleteEvent(id.toString());
      } catch (error) {
        console.error("Failed to delete event", error);
      }
    },
    [deleteEvent]
  );

  const columns: GridColDef<IEvent>[] = [
    { field: "name", headerName: "Name", width: 150, editable: true },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 180,
      editable: false,
      valueFormatter: ({ value }) => value,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 180,
      editable: false,
      valueFormatter: ({ value }) => value,
    },
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
              <GridActionsCellItem
                key="delete"
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
      },
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading events</p>;

  return (
    <Container>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
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
