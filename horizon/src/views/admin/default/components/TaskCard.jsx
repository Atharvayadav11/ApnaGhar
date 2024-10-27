import CardMenu from "components/card/CardMenu";
import React from "react";
import Checkbox from "components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import Card from "components/card";
import { useState, useEffect } from "react";
import { useProjectContext } from "context/ProjectContext";
import { Alert, AlertIcon, Center, Spinner } from "@chakra-ui/react";
import axios from "axios";

const TaskCard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId } = useProjectContext();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(projectId);
      const response = await axios.get(`http://localhost:5001/tasks/${projectId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Center h="400px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading tasks: {error}
      </Alert>
    );
  }

  return (
    <Card extra="pb-7 p-[20px]">
      {/* task header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700 dark:text-white">
            Tasks
          </h4>
        </div>
        <CardMenu />
      </div>

      {/* task content */}
      {tasks.map((task) => {
        return (
          <div className="h-full w-full">
            <div className="mt-5 flex items-center justify-between p-2">
              <div className="flex items-center justify-center gap-2">
                <Checkbox />
                <p className="text-base font-bold text-navy-700 dark:text-white">
                  {task.title}
                </p>
              </div>
              <div>
                <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
              </div>
            </div>


          </div>
        )
      })}

    </Card>
  );
};

export default TaskCard;
