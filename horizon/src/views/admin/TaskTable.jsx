import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Box,
  Flex,
  Text,
  Button,
  useToast
} from '@chakra-ui/react';
import { MdEdit, MdDelete, MdCheckCircle, MdCancel, MdAccessTime } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { TaskModal } from './TaskModal'; // Assuming TaskModal is in the same directory

const StatusToggle = ({ status, onToggle }) => {
  const statusOrder = ['pending', 'completed', 'incomplete'];
  
  const handleToggle = () => {
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onToggle(statusOrder[nextIndex]);
  };

  return (
    <Button
      size="sm"
      onClick={handleToggle}
      leftIcon={getStatusIcon(status)}
      colorScheme={getStatusColor(status)}
    >
      {status}
    </Button>
  );
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return <MdCheckCircle />;
    case 'pending':
      return <MdAccessTime />;
    case 'incomplete':
      return <MdCancel />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'green';
    case 'pending':
      return 'orange';
    case 'incomplete':
      return 'red';
    default:
      return 'gray';
  }
};

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: 'Error fetching tasks',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleStatusToggle = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
      toast({
        title: 'Error updating task status',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast({
        title: 'Task deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: 'Error deleting task',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <Box boxShadow="md" borderRadius="lg" overflow="hidden" bg="white" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Tasks</Text>
        <TaskModal onTaskAdded={handleTaskAdded} />
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Deadline</Th>
              <Th>Worker Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
              <Tr key={task._id}>
                <Td>
                  <Text fontWeight="medium">{task.title}</Text>
                </Td>
                <Td>
                  <StatusToggle
                    status={task.status}
                    onToggle={(newStatus) => handleStatusToggle(task._id, newStatus)}
                  />
                </Td>
                <Td>{new Date(task.deadline).toLocaleDateString()}</Td>
                <Td>
                  <Flex align="center">
                    <Box mr={2}>
                      <FaUser />
                    </Box>
                    {task.worker_name}
                  </Flex>
                </Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<MdEdit />}
                    mr={2}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => console.log('Edit', task)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(task._id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskTable;