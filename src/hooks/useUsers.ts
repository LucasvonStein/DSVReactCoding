import { useReducer } from "react";
import { TUser, TUserMap } from "../types";

type TUsersState = {
  users: TUserMap;
  removedUsers: TUserMap;
};
type TUsersActions =
  | {
      type: "setUsers";
      payload: { users: TUsersState["users"] };
    }
  | {
      type: "removeUser" | "restoreUser";
      payload: { userId: TUser["id"] };
    }
  | {
      type: "search";
      payload: { q: string };
    };

/**
 * To remove or add a user from main state to removedUsers state
 */
function addOrRemoveUser(
  userId: string,
  state: TUsersState,
  type: "remove" | "restore"
) {
  const to = type === "restore" ? "users" : "removedUsers";
  const from = type === "remove" ? "users" : "removedUsers";
  const isRemoved = type === "remove" ? true : false;
  const foundUser = state[from].get(userId);
  if (!foundUser) {
    throw new Error("no user with that id was found");
  }
  state[to].set(userId, { ...foundUser, isRemoved });
  state[from].delete(userId);
  return { ...state };
}

function usersReducer(state: TUsersState, action: TUsersActions) {
  switch (action.type) {
    case "setUsers":
      return { ...state, users: action.payload.users };
    case "removeUser": {
      return addOrRemoveUser(action.payload.userId, state, "remove");
    }
    case "restoreUser": {
      return addOrRemoveUser(action.payload.userId, state, "restore");
    }
    default:
      throw new Error();
  }
}

export const useUsers = (initState: TUsersState) => {
  return useReducer(usersReducer, initState);
};
