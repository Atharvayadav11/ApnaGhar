import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useProjectContext } from "context/ProjectContext";

const Sidebar = ({ open, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const {projectId,setProjectId} = useProjectContext();

  const locations = projects.map((project) => {
    return { id: project._id, name: project.project_name }
  })

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5001/projects/");
      setProjects(res.data);
      console.log(res);
      if (res.data.length > 0) {
        setSelectedLocation(res.data[0].project_name);
        setProjectId(res.data[0]._id);
      }

      localStorage.setItem("projects", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    console.log("Use effect triggered");
    fetchProjects();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[40px]`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Apna <span className="font-medium">Ghar</span>
        </div>

        {/* Custom Combobox */}
        <div className="mt-8 relative text-sm" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 text-left bg-white dark:bg-navy-800 border border-gray-300 dark:border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
          >
            <span className="text-gray-700 dark:text-white">
              {selectedLocation || "Select Project..."}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute w-full mt-1 bg-white dark:bg-navy-800 border border-gray-300 dark:border-white/30 rounded-md shadow-lg max-h-60 overflow-auto z-50">
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full px-4 py-2 border-b border-gray-300 dark:border-white/30 focus:outline-none dark:bg-navy-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-700 dark:text-white"
                  onClick={() => {
                    setSelectedLocation(location.name);
                    setIsOpen(false);
                    setSearchTerm("");
                    console.log("Hii",location.id);
                    
                    setProjectId(location.id)
                  }}
                >
                  {location.name}
                </div>
              ))}
              {filteredLocations.length === 0 && (
                <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  No locations found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-[20px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      <div className="flex justify-center">
        <SidebarCard />
      </div>
    </div>
  );
};

export default Sidebar;