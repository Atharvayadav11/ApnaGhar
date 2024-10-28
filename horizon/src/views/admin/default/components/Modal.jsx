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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import { useProjectContext } from 'context/ProjectContext';

export function Modall({ onProjectAdded }) {
  const [projectName, setProjectName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [workers, setWorkers] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState({
    flooring: 0,
    plumbing: 0,
    wiring: 0,
    painting: 0,
    furniture: 0
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {projectId,setProjectId} = useProjectContext();

  // Calculate total budget
  const totalBudget = Object.values(budget).reduce((acc, curr) => acc + curr, 0);

  // Handle budget changes
  const handleBudgetChange = (value, field) => {
    setBudget(prev => ({
      ...prev,
      [field]: Number(value)
    }));
  };

  const addProject = async () => {
    try {
      // Convert comma-separated workers string to array
      const workersArray = workers.split(',').map(worker => worker.trim());
      
      const response = await axios.post("http://localhost:5001/projects/", {
        project_name: projectName,
        customer_name: customerName,
        workers: workersArray,
        deadline,
        budget: {
          ...budget,
          total: totalBudget
        },
        budget_spent: 0
      });

      if (response.data) {
        console.log("Response:",response.data);
        onProjectAdded(response.data);
        toast({
          title: "Project added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setProjectId(response.data._id)
        onClose();
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error adding project",
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
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                type="text"
              />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel>Customer Name</FormLabel>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                type="text"
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Workers (comma-separated)</FormLabel>
              <Input
                value={workers}
                onChange={(e) => setWorkers(e.target.value)}
                type="text"
                placeholder="John, Jane, Mike"
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

            {/* Budget Fields */}
            <FormControl mt={5}>
              <FormLabel fontWeight="bold">Budget Division</FormLabel>
              
              <FormControl mt={3} isRequired>
                <FormLabel>Flooring Budget</FormLabel>
                <NumberInput
                  min={0}
                  value={budget.flooring}
                  onChange={(value) => handleBudgetChange(value, 'flooring')}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mt={3} isRequired>
                <FormLabel>Plumbing Budget</FormLabel>
                <NumberInput
                  min={0}
                  value={budget.plumbing}
                  onChange={(value) => handleBudgetChange(value, 'plumbing')}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mt={3} isRequired>
                <FormLabel>Wiring Budget</FormLabel>
                <NumberInput
                  min={0}
                  value={budget.wiring}
                  onChange={(value) => handleBudgetChange(value, 'wiring')}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mt={3} isRequired>
                <FormLabel>Painting Budget</FormLabel>
                <NumberInput
                  min={0}
                  value={budget.painting}
                  onChange={(value) => handleBudgetChange(value, 'painting')}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mt={3} isRequired>
                <FormLabel>Furniture Budget</FormLabel>
                <NumberInput
                  min={0}
                  value={budget.furniture}
                  onChange={(value) => handleBudgetChange(value, 'furniture')}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Text mt={4} fontWeight="bold" color="blue.500">
                Total Budget: ₹{totalBudget}
              </Text>
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