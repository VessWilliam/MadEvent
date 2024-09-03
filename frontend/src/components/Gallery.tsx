import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useGetAllEvents } from "../hooks/useEvents";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const { data: events = [] } = useGetAllEvents();
  const navigate = useNavigate();

  const handleInfoClick = (id: string) => {
    navigate(`/event/${id}`);
  };

  return (
    <ImageList sx={{ width: 500, height: 500 }}>
      <ImageListItem key="Subheader" cols={2}></ImageListItem>
      <ListSubheader>Events</ListSubheader>
      {events.map((item) => (
        <ImageListItem key={item.id}>
          <img
            srcSet={item.thumbnail}
            src={item.thumbnail}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.name}`}
                onClick={() => handleInfoClick(item.id as string)}
              >
                <InfoIcon />
              </IconButton>
            }
            title={item.name}
            subtitle={item.status}
            sx={{
              "& .MuiImageListItemBar-title": {
                fontSize: "1.2rem",
              },
              "& .MuiImageListItemBar-subtitle": {
                fontSize: "0.6rem",
                color: "yellow",
              },
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
