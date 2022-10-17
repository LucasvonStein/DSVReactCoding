import "./styles.css";
import { useEffect, useState } from "react";
import { Box, Divider, Grid, TextField } from "@mui/material";

import usersData from "./data";
import { serializUsers, sortBy } from "./utils";

import type { TUser } from "./types";
import { UserCard } from "./components/UserCard";
import { useUsers } from "./hooks/useUsers";
import { Counter } from "./components/Counter";

/** Instructions
   0. Fork this codesandbox and sync it with your github  √
   1. import users data from data.ts √
   1.1. Utilize TypeScript in your implementation √
   2. On load:
   2.1. Filter the users data array to only include users where age >= 18 √
   2.2. Map the users data array to only include username, address, age and companyName √
   2.3. Add a new ID to each user object, which should consist of a randomized sequence (6 characters) of the following: {ABCDEF123456}√
   2.4. Sort the array (asc) by age, then by companyName √
   2.5. Dispatch the data to the local users state √
   3. Display the users' properties using a loop in the tsx, preferably in a styled "Card" form √
   3.1. Add a "remove" button to each card - this should remove the user from the state √
   3.2. Store the removed users in a new state instance √
   3.3. Using the second input, add a method to search for a user's username with the onChange event √
   3.4. The removed users should also be found if the input is being used to search for a username √
   3.5. In the case where a removed user is shown during a search, there should be a "restore" button, which would insert the removed user back into the users array √
   4. Extend the reducer:
   4.1. Count must always be >= 0, in all cases √
   4.2. Add a case to increment count with a random number, between 1 and 10√
   4.3. Add a case to increment to the nearest odd number, if already odd - increment to next odd√
   4.4. Add a case to decrease the count by the input of the first textfield√
   4.5. Add a case to reset the count√
   4.6. Add buttons to said cases√
   4.7. Add styling using MUI√
   5. Provide the link to your forked repo with your answers√
   */

export default function App() {
  const [{ users, removedUsers }, dispatch] = useUsers({
    users: new Map<string, TUser>(),
    removedUsers: new Map<string, TUser>(),
  });
  const [text, setText] = useState("");

  useEffect(() => {
    const serializedUsers = serializUsers(usersData);
    const mappedUsers = new Map(
      serializedUsers.map((user) => {
        return [user.id, user];
      })
    );
    dispatch({ type: "setUsers", payload: { users: mappedUsers } });
  }, []);

  const onChangeHandler = (
    ev: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = ev.currentTarget;
    setText(value);
  };

  const filteredUsers = [
    ...users.values(),
    ...(text ? removedUsers.values() : []),
  ].filter((user) => {
    if (!text) {
      return true;
    }
    return user.username.toLocaleLowerCase().includes(text.toLocaleLowerCase());
  });

  return (
    <div className="App">
      <Counter />
      <Divider sx={{ margin: "20px 0" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Search"
          onChange={onChangeHandler}
          defaultValue={text}
        />
        <Box sx={{ overflow: "scroll", height: "50vh", padding: "0 16px" }}>
          <Box display="grid" gridTemplateColumns="1fr" gap={2}>
            {filteredUsers.length
              ? filteredUsers
                  .sort(sortBy("age"))
                  .sort(sortBy("companyName"))
                  .map((user) => {
                    return (
                      <UserCard
                        key={user.id}
                        user={user}
                        onActionClick={() => {
                          if (user.isRemoved) {
                            dispatch({
                              type: "restoreUser",
                              payload: { userId: user.id },
                            });
                            return;
                          }
                          dispatch({
                            type: "removeUser",
                            payload: { userId: user.id },
                          });
                        }}
                      />
                    );
                  })
              : "no user was found"}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
