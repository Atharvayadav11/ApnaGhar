import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
  Spinner,
} from "@chakra-ui/react";
import {
  GiFloorPolisher,
  GiLargePaintBrush,
  GiStraightPipe,
  GiWireCoil,
} from "react-icons/gi";
import { MdChair } from "react-icons/md";
import TaskCard from "./components/TaskCard";
import BarGraph from "./components/BarGraph";
import PieGraph from "./components/PieGraph";
import { useProjectContext } from "context/ProjectContext";

const Budget = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todoDetails, setTodoDetails] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [projects, setProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useProjectContext();

  const [taskExpenses, setTaskExpenses] = useState({
    flooring: [],
    painting: [],
    plumbing: [],
    wiring: [],
    furniture: [],
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [totalBudget, setTotalBudget] = useState(50000);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5001/projects/${projectId}`);
      setProjects(res.data);
      localStorage.setItem("projects", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [projectId]); // Added projectId as dependency

  const handleTaskCardClick = (icon, title) => {
    setSelectedTask({ icon, title });
    onOpen();
  };

  const handleSaveExpense = () => {
    if (!todoDetails || !expenseAmount) {
      return; // Add proper validation handling
    }

    const newExpense = {
      details: todoDetails,
      amount: parseFloat(expenseAmount) || 0,
    };

    const selectedTaskExpenses = taskExpenses[selectedTask.title.toLowerCase()];
    setTotalBudget((prevTotalBudget) => prevTotalBudget - newExpense.amount);

    const updatedExpensesArray = [...selectedTaskExpenses, newExpense];

    setTaskExpenses({
      ...taskExpenses,
      [selectedTask.title.toLowerCase()]: updatedExpensesArray,
    });

    // Reset form
    setTodoDetails("");
    setExpenseAmount("");
    onClose();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div>
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-11">
          <div className="card card-border xl:col-span-11 2xl:col-span-11">
            <div className="card-body flex items-center gap-10">
              <h4 className="text-xl font-semibold">Total Budget</h4>
              {projects?.budget?.total || 0}
            </div>
          </div>
          {projects && (
            <>
              <div className="card card-border xl:col-span-7 2xl:col-span-8">
                <div className="card-body">
                  <h4 className="text-xl font-semibold">Cost Tracking</h4>
                  <div className="chartRef" style={{ minHeight: "395px" }}>
                    <BarGraph taskExpenses={taskExpenses} project={projects} />
                  </div>
                </div>
              </div>
              <div className="card card-border xl:col-span-4 2xl:col-span-3">
                <div className="card-body">
                  <h4 className="text-xl font-semibold">Budget Allocated</h4>
                  <div className="mt-20 flex items-center justify-center">
                    <div className="chartRef mx-auto w-[250px]">
                      <PieGraph taskExpenses={taskExpenses} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
        {[
          { icon: <GiFloorPolisher className="h-7 w-7" />, title: "Flooring" },
          { icon: <GiLargePaintBrush className="h-7 w-7" />, title: "Painting" },
          { icon: <GiStraightPipe className="h-7 w-7" />, title: "Plumbing" },
          { icon: <GiWireCoil className="h-7 w-7" />, title: "Wiring" },
          { icon: <MdChair className="h-7 w-7" />, title: "Furniture" },
        ].map((task, idx) => (
          <button key={idx} onClick={() => handleTaskCardClick(task.icon, task.title)}>
            <TaskCard
              icon={task.icon}
              title={task.title}
              subtitle={`₹:${taskExpenses[task.title.toLowerCase()]
                .reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
                .toFixed(2)}`}
              previousExpenses={taskExpenses[task.title.toLowerCase()]}
            />
          </button>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD EXPENSE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTask && (
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center">
                  <div className="rounded-full bg-lightPrimary p-3">
                    <span className="text-brand-500">{selectedTask.icon}</span>
                  </div>
                  <h1 className="ml-2 text-2xl font-bold">{selectedTask.title}</h1>
                </div>

                <Textarea
                  placeholder="Enter details..."
                  value={todoDetails}
                  onChange={(e) => setTodoDetails(e.target.value)}
                />

                <Input
                  type="number"
                  placeholder="Enter amount..."
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                />
                <table className="w-4/5">
                  <thead>
                    <tr className="flex justify-between py-2">
                      <th className="text-xl font-bold">Details</th>
                      <th className="text-xl font-bold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskExpenses[selectedTask.title.toLowerCase()].map((expense, index) => (
                      <tr key={index} className="flex justify-between py-2">
                        <td className="text-md font-medium">{expense.details}</td>
                        <td className="text-md font-medium">Rs {expense.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSaveExpense}>
              SAVE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Budget;