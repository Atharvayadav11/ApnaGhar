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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { GrAdd } from "react-icons/gr";

export function Modall({ onProjectAdded }) {
  const [projectName, setProjectName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addProject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/projects/", {
        project_name: projectName,
        customer_name: customerName,
        budget: budget,
        deadline: deadline
      });
      console.log("Project added successfully");
      const projects = localStorage.getItem("projects")
      if(!projects)
        localStorage.setItem("projects", res.data)
      else
        localStorage.setItem("projects",[res.data,...projects])
      toast({
        title: "Project added.",
        description: "The new project has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onProjectAdded(res.data);  // Notify parent component about the new project
      onClose();  // Close the modal
      // Reset form fields
      setProjectName("");
      setCustomerName("");
      setBudget("");
      setDeadline("");
    } catch (err) {
      console.error("Error adding project:", err);
      toast({
        title: "Error",
        description: "Failed to add the project. Please try again.",
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
          <ModalHeader>Add Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                type="text"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Customer Name</FormLabel>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                type="text"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Budget</FormLabel>
              <Input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                type="number"
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={addProject} colorScheme="green">Add Project</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}