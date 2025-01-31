import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const EpisodePage = () => {
  const { episodeId } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100vw", height: "99vh", position: "relative", bgcolor: "black" }}>
      {/* Video Player */}
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${episodeId}`}
        playing
        width="100vw"
        height="99vh"
        style={{ position: "absolute", top: 0, left: 0 }}
        config={{
          youtube: {
            playerVars: {
              controls: 1,
              autoplay: 1,
              fs: 1,
            },
          },
        }}
      />

      {/* Left Overlay Box (30% of the screen) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
          height: "100%",
          backgroundColor: "transparent", // Transparent background for hover effect
          zIndex: 2,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          "&:hover .backButton": {
            opacity: 1, // Show the button on hover
            pointerEvents: "auto", // Enable interaction with the button
          },
        }}
      >
        {/* Back Button (Hidden by default, shows on hover) */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            opacity: 0, // Hidden by default
            pointerEvents: "none", // Prevent interaction until hover
            transition: "opacity 0.3s ease-in-out",
            zIndex: 3,
          }}
          className="backButton"
        >
          <ArrowBackIcon sx={{ color: "white", fontSize: 52 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
