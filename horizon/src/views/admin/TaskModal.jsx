import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import { useProjectContext } from 'context/ProjectContext';

export function TaskModal({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("pending");
  const [workerName, setWorkerName] = useState("");
  const {projectId} = useProjectContext()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addTask = async () => {
    try {
        console.log("Hello");
        
      const response = await axios.post("http://localhost:5001/tasks/create", {
        title,
        description,
        deadline,
        status,
        worker_name: workerName,
        project_id: projectId
      });
      console.log(response);
      

      if (response.data) {
        onTaskAdded(response.data);
        toast({
          title: "Task added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Error adding task",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <GrAdd size={20} color="blue" />
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Deadline</FormLabel>
              <Input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                type="date"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Status</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </Select>
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Worker Name</FormLabel>
              <Input
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                type="text"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={addTask} colorScheme="green">Add Task</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}