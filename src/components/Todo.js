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
        color: arr.item.isBagged ?? false ? "black" : "red",
      }}
      button
      onClick={() => {
        setDoc(doc(db, "todos", arr.id), {
          ...arr.item,
          isBagged: !arr.item.isBagged,
        });
        console.log("clicked" + arr.item.isBagged);
      }}
    >
      <ListItemText
        primary={arr.item.task ?? "Someone forgot the name"}
        secondary={"quantity: " + (arr.item.quantity ?? "?")}
      />
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
