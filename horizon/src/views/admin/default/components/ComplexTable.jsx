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
  Spinner,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modall } from "./Modal";

const CustomTable = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/projects/");
      setProjects(res.data);
      localStorage.setItem("projects", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = (newProject) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newProject];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/projects/${id}`);
      setProjects((prevProjects) => {
        const updatedProjects = prevProjects.filter(
          (project) => project._id !== id
        );
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        return updatedProjects;
      });
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Project List
        </Text>
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
                <Td>{project.project_name || "N/A"}</Td>
                <Td>{project.customer_name || "N/A"}</Td>
                <Td>
                  {project.budget?.total !== undefined
                    ? project.budget.total
                    : "Not specified"}
                </Td>
                <Td>
                  {project.deadline
                    ? new Date(project.deadline).toLocaleDateString()
                    : "No deadline"}
                </Td>
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
