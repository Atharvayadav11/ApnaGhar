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
} from "@chakra-ui/react";
import axios from "axios";
import { GrAdd } from "react-icons/gr";

export function Modall({ id }) {
  const [taskname, setTaskname] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const AddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/products/", {
        id,
        taskname,
        status,
        date,
        endDate,
        assignedTo,
      });
      window.location.reload();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <>
      <Button onClick={onOpen}><GrAdd size={20} color="blue" /></Button>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input onChange={(e) => setTaskname(e.target.value)} type="text" />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Status</FormLabel>
              <Select onChange={(e) => setStatus(e.target.value)} placeholder="Select status">
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Start Date</FormLabel>
              <Input onChange={(e) => setDate(e.target.value)} type="date" />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>End Date</FormLabel>
              <Input onChange={(e) => setEndDate(e.target.value)} type="date" />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Assigned To</FormLabel>
              <Input onChange={(e) => setAssignedTo(e.target.value)} type="text" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
            <Button type="submit" onClick={(e) => { AddCustomer(e); onClose(); }} variant="ghost">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}