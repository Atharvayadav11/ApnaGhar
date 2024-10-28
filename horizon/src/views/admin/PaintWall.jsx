import React, { useEffect, useState } from 'react';
import { MdBarChart, MdPending } from 'react-icons/md';
import { BsCheck2Circle } from 'react-icons/bs';
import { Spinner, Center } from '@chakra-ui/react';
import Widget from 'components/widget/Widget';
import CustomTable from './TaskTable';
import { useProjectContext } from 'context/ProjectContext';
import axios from 'axios';

function PaintWall() {
  const [taskCounts, setTaskCounts] = useState({ total: 0, pending: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useProjectContext();

  const fetchCount = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/tasks/count/${projectId}`);
      setTaskCounts(response.data);
    } catch (error) {
      console.error("Error fetching task counts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  // Sample data for table
  const data = [
    { title: "Task 1", status: "completed", deadline: "2023-06-30", workerName: "John Doe" },
    { title: "Task 2", status: "pending", deadline: "2023-07-15", workerName: "Jane Smith" },
    { title: "Task 3", status: "incomplete", deadline: "2023-07-01", workerName: "Bob Johnson" },
  ];

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 pb-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total"}
          subtitle={`${taskCounts.total}`}
          progress={100}
        />
        <Widget
          icon={<MdPending className="h-6 w-6" />}
          title={"Pending"}
          subtitle={`${taskCounts.pending}`}
          progress={(taskCounts.pending / taskCounts.total) * 100}
        />
        <Widget
          icon={<BsCheck2Circle className="h-6 w-6" />}
          title={"Completed"}
          subtitle={`${taskCounts.completed}`}
          progress={(taskCounts.completed / taskCounts.total) * 100}
        />
      </div>

      <div className="mt-4">
        <CustomTable initialData={data} />
      </div>
    </>
  );
}

export default PaintWall;
