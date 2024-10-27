// TaskTable.jsx
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
  useToast,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { MdEdit, MdDelete, MdCheckCircle, MdCancel, MdAccessTime } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { TaskModal } from './TaskModal';

const API_BASE_URL = 'http://localhost:5001';

const StatusToggle = ({ status, onToggle, isLoading }) => {
  const statusOrder = ['pending', 'completed', 'incomplete'];
  
  const handleToggle = () => {
    if (isLoading) return;
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onToggle(statusOrder[nextIndex]);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { icon: <MdCheckCircle />, color: 'green' };
      case 'pending':
        return { icon: <MdAccessTime />, color: 'orange' };
      case 'incomplete':
        return { icon: <MdCancel />, color: 'red' };
      default:
        return { icon: null, color: 'gray' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Button
      size="sm"
      onClick={handleToggle}
      leftIcon={isLoading ? <Spinner size="xs" /> : config.icon}
      colorScheme={config.color}
      isDisabled={isLoading}
    >
      {status}
    </Button>
  );
};

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [deleteDialogState, setDeleteDialogState] = useState({ isOpen: false, taskId: null });
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching tasks',
        description: error.response?.data?.error || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (taskId, newStatus) => {
    try {
      setUpdateLoading(taskId);
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      toast({
        title: 'Status updated',
        description: `Task status changed to ${newStatus}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating task status',
        description: error.response?.data?.error || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUpdateLoading(null);
    }
  };

  const handleDelete = async () => {
    const { taskId } = deleteDialogState;
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast({
        title: 'Task deleted',
        description: 'Task has been successfully removed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting task',
        description: error.response?.data?.error || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleteDialogState({ isOpen: false, taskId: null });
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
    toast({
      title: 'Task added',
      description: 'New task has been successfully created',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

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
                    isLoading={updateLoading === task._id}
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
                    onClick={() => setDeleteDialogState({ isOpen: true, taskId: task._id })}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog
        isOpen={deleteDialogState.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteDialogState({ isOpen: false, taskId: null })}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDeleteDialogState({ isOpen: false, taskId: null })}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

// Add default export
export default TaskTable;