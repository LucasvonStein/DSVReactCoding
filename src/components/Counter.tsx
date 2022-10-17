import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useCounter } from "../hooks/useCounter";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const Counter = () => {
  const [{ count }, dispatch] = useCounter();
  const [numberInput] = useState(0);
  const onChangeHandler = (
    ev: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = ev.currentTarget;
    dispatch({ type: "subtract", payload: { value: Number(value) } });
  };

  return (
    <Stack direction="column" spacing={2} alignItems={"center"}>
      <Typography
        variant="overline"
        style={{
          marginBottom: 0,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        Count: <Typography variant="h3">{count}</Typography>
      </Typography>
      <TextField
        label="subtract"
        defaultValue={numberInput}
        onChange={onChangeHandler}
        type="number"
        style={{ display: "block" }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: "decrement" })}
        >
          -
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: "increment" })}
        >
          +
        </Button>

        <Button variant="contained" onClick={() => dispatch({ type: "reset" })}>
          <RestartAltIcon />
        </Button>
      </Stack>
      <Stack direction="column" spacing={2} alignItems={"center"}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch({ type: "randomize" })}
        >
          + random number
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => dispatch({ type: "nearestOdd" })}
        >
          + nearest odd number
        </Button>
      </Stack>
    </Stack>
  );
};
