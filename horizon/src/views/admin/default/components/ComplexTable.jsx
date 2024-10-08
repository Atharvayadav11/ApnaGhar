import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modall } from "./Modal";

const CustomTable = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5001/projects/");
      setProjects(res.data);
      console.log(res);
      
      localStorage.setItem("projects", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    console.log("Use effect triggered");
    
    fetchProjects();
  }, []);

  const handleProjectAdded = (newProject) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
    localStorage.setItem("projects", JSON.stringify([...projects, newProject]));
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/projects/${id}`);
      const updatedProjects = projects.filter(project => project._id !== id);
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Project List</Text>
        <Modall onProjectAdded={handleProjectAdded} />
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Project Name</Th>
              <Th>Customer Name</Th>
              <Th>Budget</Th>
              <Th>Deadline</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) => (
              <Tr key={project._id}>
                <Td>{project.project_name}</Td>
                <Td>{project.customer_name}</Td>
                <Td>{project.budget}</Td>
                <Td>{new Date(project.deadline).toLocaleDateString()}</Td>
                <Td>
                  <Button
                    leftIcon={<MdEdit />}
                    colorScheme="blue"
                    size="sm"
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<MdDelete />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => deleteProject(project._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;