import { Stack, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Container>
        <Stack direction="column" style={{ width: "100%", padding: "1rem" }} alignItems="end">
          <Typography variant="body2" sx={{ color: "rgba(var(--text-color),0.5)" }}>
            Copyright © {new Date().getFullYear()}
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(var(--text-color),0.5)" }}>
            Todos os direitos reservados
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default Footer;
