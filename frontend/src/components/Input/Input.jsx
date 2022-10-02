import { useState } from "react";
import { Autocomplete, TextField, Button, Stack, CircularProgress } from "@mui/material";
import { RocketLaunchRounded } from "@mui/icons-material";

const Input = ({
  setLives,
  setZoom,
  answer,
  setWin,
  label,
  listData,
  forwardRef,
  onChange,
  forwardRefButton,
  onClick,
  loading,
}) => {
  const [inputString, setInputString] = useState("");

  const checkAnswer = () => {
    if (inputString === "") return;

    if (inputString.toLowerCase() === answer.toLowerCase()) {
      setWin(true);
    } else {
      setLives((prev) => prev - 1);
      setZoom((prev) => prev + 1);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <Autocomplete
          options={listData ?? []}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                setInputString(e.target.value);
                if (onChange) onChange(e);
              }}
              variant="filled"
              label={`🧑‍🚀 ${label}`}
              ref={forwardRef}
            />
          )}
          style={{
            width: "300px",
          }}
          sx={{
            "& input": {
              width: "100%!important",
            },
          }}
          freeSolo
        />
        <Button
          style={{
            color: "rgb(var(--text-color))",
            fontWeight: "bold",
          }}
          variant="contained"
          endIcon={<RocketLaunchRounded />}
          ref={forwardRefButton}
          onClick={(e) => {
            checkAnswer();
            if (onClick) onClick(e);
          }}
        >
          Adivinhar
        </Button>
      </Stack>
    </>
  );
};

export default Input;
