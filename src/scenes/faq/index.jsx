import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState("");

  useEffect(() => {
    const storedQuestions =
      JSON.parse(localStorage.getItem("faqQuestions")) || [];
    setQuestions(storedQuestions);
  }, []);

  useEffect(() => {
    // Sayfa yüklendiğinde LocalStorage'dan soruları al
    const storedQuestions =
      JSON.parse(localStorage.getItem("faqQuestions")) || [];
    setQuestions(storedQuestions);
  }, []);

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      const newQuestionItem = {
        id: Date.now(),
        question: newQuestion,
      };
      const updatedQuestions = [...questions, newQuestionItem];
      setQuestions(updatedQuestions);
      setNewQuestion("");

       // LocalStorage'a kaydet
       localStorage.setItem("faqQuestions", JSON.stringify(updatedQuestions));
    }
  };

  const removeQuestion = (question) => {
    setSelectedQuestion(question);
    setOpenDeleteDialog(true);
  };

  const editQuestion = (question) => {
    setSelectedQuestion(question);
    setEditedQuestion(question.question);
    setOpenEditDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const confirmDelete = () => {
    const updatedQuestions = questions.filter(
      (q) => q.id !== selectedQuestion.id
    );
    setQuestions(updatedQuestions);
    setOpenDeleteDialog(false);
  };

  const confirmEdit = () => {
    const updatedQuestions = questions.map((q) =>
      q.id === selectedQuestion.id ? { ...q, question: editedQuestion } : q
    );
    setQuestions(updatedQuestions);
    setOpenEditDialog(false);
  };

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Tasks Page" />

      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Typography variant="h5" mb={2}>
          Add New Task
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addQuestion}
            startIcon={<AddIcon />}
            sx={{
              marginLeft:"5px"
          }}
          >
            Add
          </Button>
        </Box>
      </Box>
<Box  
    sx={{
      maxWidth: "80%",
      marginRight:"auto",
      marginLeft:"auto",
    }}
> 
      {questions.map((question) => (
        <Accordion 
        key={question.id} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              borderBottom: `1px solid ${colors.grey[600]}`,
              backgroundColor: colors.primary[50],
              minHeight: "48px",
            }}
          >
            <Typography variant="h6">{question.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => editQuestion(question)}
                startIcon={<EditIcon />}
                sx={{
                    marginRight:"5px"
                }}
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => removeQuestion(question)}
                startIcon={<DeleteIcon />}
             
              >
                Delete
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      )
    
      )}  </Box>

      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the task "{selectedQuestion?.question}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="edited-question"
            label="Edit Question"
            variant="outlined"
            fullWidth
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={confirmEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FAQ;
