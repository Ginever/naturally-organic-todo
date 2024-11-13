import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Fab,
  Modal,
  Box,
  List,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Todo from "./components/Todo";
import { db } from "./firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./App.css";

const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));

function App() {
  const [todos, setTodos] = useState([]);
  const [inputs, setInputs] = useState({
    task: null,
    priority: null,
    quantity: null,
    bagState: null,
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            item: doc.data(),
          }))
          .concat()
      );
    });
  }, [inputs]);

  const handleChange = (event) => {
    const name = event.target.name;
    var value = event.target.value;
    
    if (name === "bagState") {
      console.log(value);
      value = inputs.bagState == 1 ? 0 : 1;
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const addTodo = (e) => {
    e.preventDefault();
    addDoc(collection(db, "todos"), {
      task: inputs.task,
      priority: inputs.priority,
      bagState: inputs.bagState,
      quantity: inputs.quantity,
      timestamp: serverTimestamp(),
    });
    closeModal();
  };

  const closeModal = () => {
    setOpenModal(false);
    setInputs({ task: null, priority: null, quantity: null, bagState: null });
  };
  return (
    <>
      <div className="App">
        <h2 className="text-2xl">Bagging list</h2>
        <List className="w-full">
          {todos.map((item) => (
            <Todo key={item.id} arr={item} />
          ))}
        </List>

        <img src={require("./url-qr-code.png")} width="150px" alt="QR code" />

        <Fab
          className="floating-action-button"
          color="primary"
          aria-label="add"
          onClick={() => setOpenModal(true)}
        >
          <AddIcon />
        </Fab>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="modal-box ">
          <form>
            <TextField
              id="outlined-basic"
              label="Description"
              name="task"
              variant="outlined"
              style={{ margin: "0px 5px" }}
              size="small"
              value={inputs.task}
              onChange={(e) => handleChange(e)}
            />

            <TextField
              type="number"
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              style={{ margin: "0px 5px" }}
              size="small"
              value={inputs.quantity}
              name="quantity"
              onChange={(e) => handleChange(e)}
            />

            <TextField
              type="number"
              id="outlined-basic"
              label="Priority"
              variant="outlined"
              style={{ margin: "0px 5px" }}
              size="small"
              value={inputs.priority}
              name="priority"
              onChange={(e) => handleChange(e)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  margin="auto"
                  name="bagState"
                  checked={inputs.bagState}
                  onChange={(e) => handleChange(e)}
                />
              }
              label="bagState"
            />

            <Button
              className="my-10"
              variant="contained"
              color="primary"
              onClick={addTodo}
            >
              Add Item
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
export default App;
