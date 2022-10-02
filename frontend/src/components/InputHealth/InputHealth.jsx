import { useState, useEffect } from "react";
import { Typography, Rating, Stack } from "@mui/material";
import { FavoriteRounded, FavoriteBorderRounded } from "@mui/icons-material";

const InputHealth = ({ lifes, forwardRef }) => {
  const [value, setValue] = useState(lifes ?? 5);

  useEffect(() => {
    setValue(lifes ?? 5);
  }, [lifes]);

  return (
    <>
      <Stack ref={forwardRef} direction="row" spacing={2} alignItems="center">
        <Rating
          value={value}
          icon={<FavoriteRounded />}
          emptyIcon={<FavoriteBorderRounded />}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#ff6d75",
            },
            "& .MuiRating-iconHover": {
              color: "#ff3d47",
            },
          }}
          readOnly
        />
        <Typography variant="body1" sx={{ color: "rgb(var(--text-color))" }}>
          {value} {value > 1 ? "tentativas" : "tentativa"}
        </Typography>
      </Stack>
    </>
  );
};

export default InputHealth;
