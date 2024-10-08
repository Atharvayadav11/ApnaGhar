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
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export function EditModal({ data }) {
  const [taskname, setTaskname] = useState(data.taskname);
  const [status, setStatus] = useState(data.status);
  const [date, setDate] = useState(data.date);
  const [assignedTo, setAssignedTo] = useState(data.assignedTo || "");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const editCust = async () => {
    try {
      const res = await axios.put(`http://localhost:5001/products/${data._id}`, {
        taskname: taskname,
        status: status,
        date: date,
        assignedTo: assignedTo,
      });
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <MdEdit size={20} color="blue" />
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={taskname}
                onChange={(e) => setTaskname(e.target.value)}
                name="taskname"
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={3}>Status</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Date</FormLabel>
              <Input
                value={new Date(date).toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Assigned To</FormLabel>
              <Input
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                name="assignedTo"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              onClick={() => {
                editCust();
                onClose();
              }}
              variant="ghost"
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}