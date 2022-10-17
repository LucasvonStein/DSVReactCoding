import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Delete from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import type { TUser } from "../types";
import { Button } from "@mui/material";

type Props = {
  user: TUser;
  onActionClick: () => void;
};

export const UserCard = (props: Props) => {
  const { username, address, age, companyName, isRemoved } = props.user;
  return (
    <Card sx={{ minWidth: 275, textAlign: "left" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {username}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {age} years old
        </Typography>
        {companyName}
        <Typography variant="caption">
          <br />
          {address.street}
          <br />
          {address.zipcode}
          <br />
          {address.city}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={props.onActionClick}
          color={isRemoved ? "success" : "error"}
          endIcon={isRemoved ? <RestoreFromTrashIcon /> : <Delete />}
        >
          {isRemoved ? "Restore User" : "Delete User"}
        </Button>
      </CardActions>
    </Card>
  );
};
