import { Modal, Typography, Stack, Paper } from "@mui/material";

const WinPopup = ({ open, title, children }) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "2rem",
            width: "90%",
            maxWidth: "800px",
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" sx={{ color: "rgb(var(--text-color))" }}>
              {title}
            </Typography>
            {children}
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default WinPopup;
