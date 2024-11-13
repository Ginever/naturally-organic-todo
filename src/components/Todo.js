import {
  ListItemText,
  IconButton,
  ListItemButton,
  Box,
  List,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../firebase.js";
import { doc, deleteDoc, setDoc } from "firebase/firestore";

const Todo = ({ arr }) => {
  return (
    <ListItem
      className="outline m-3 rounded table border-20"
      style={{
        width: "auto",
        color:
          { 0: "red", 1: "black", 2: "green" }[arr.item.bagState ?? 0] ??
          "blue",
      }}
    >
      <ListItemButton
        onClick={() => {
          setDoc(doc(db, "todos", arr.id), {
            ...arr.item,
            bagState: (arr.item.bagState + 1) % 3,
          });
        }}
      >
        <ListItemText
          primary={arr.item.task ?? "Someone forgot the name"}
          secondary={"quantity: " + (arr.item.quantity ?? "?")}
        />
        <ListItemText class="float-right">
          {arr.item.priority ?? "?"}
        </ListItemText>
      </ListItemButton>{" "}
      <ListItemButton class="float-right mr-3" edge="end">
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon
            edge="end"
            onClick={() => {
              deleteDoc(doc(db, "todos", arr.id));
            }}
          />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
};
export default Todo;
