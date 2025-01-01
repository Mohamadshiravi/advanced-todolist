"use client";

import { SiTodoist } from "react-icons/si";
import { FaPlus } from "react-icons/fa6";
import { FaPizzaSlice } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import axios from "axios";
import { MdCalendarToday } from "react-icons/md";
import { newErrorToast, newSucToast } from "@/utils/helper-func";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dark, setDark] = useState(false);

  const [project, setProject] = useState(null);
  const [categori, setCategori] = useState(null);

  const [body, setBody] = useState("");

  const [defProject, setDefProject] = useState([]);
  const [userProject, setUserProject] = useState([]);

  const [currentPage, setCurrentPage] = useState(null);

  const path = usePathname();

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  useEffect(() => {
    if (localStorage.theme === "dark") {
      setDark(true);
    }

    async function FetchProject() {
      const res = await axios.get("/api/project");
      setDefProject(res.data.defProject);
      setUserProject(res.data.userProject);
    }
    FetchProject();
  }, []);

  useEffect(() => {
    const currentProject = defProject.filter(
      (e) => e._id === path.split("/")[3]
    );
    setCurrentPage(currentProject[0]);

    if (!currentProject[0]) {
      const FilteredUserProject = userProject.filter(
        (e) => e._id === path.split("/")[3]
      );
      setCurrentPage(FilteredUserProject[0]);
    }
  });

  useEffect(() => {
    if (project !== null && categori !== null) {
      setProject(null);
    }
  }, [categori]);

  useEffect(() => {
    if (categori !== null && project !== null) {
      setCategori(null);
    }
  }, [project]);

  async function AddTaskHandler() {
    if (project === null && categori === null) {
      return newErrorToast("please select categori or project");
    }

    if (body === "") {
      return newErrorToast("please type something");
    }
    const todo = {
      body,
      project,
      categori,
    };
    try {
      const res = await axios.post("/api/todo", todo);
      if (res.status === 201) {
        newSucToast("Task Added");
        setIsFormOpen(false);
        setProject(null);
        setCategori(null);
        setBody("");
      }
    } catch (error) {
      return newErrorToast("Error");
    }
  }
  return (
    <>
      <header
        style={{ backgroundColor: currentPage?.color }}
        className={`${
          !currentPage && "bg-orange-600"
        } flex z-[42] items-center text-3xl lg:justify-between justify-end py-2 fixed sm:px-20 px-4 top-0 left-0 w-full`}
      >
        <SiTodoist className="text-white lg:block hidden" />
        <div className="flex items-center gap-1">
          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
            variant="light"
            radius="full"
            isIconOnly
          >
            <FaPlus className="text-white text-2xl" />
          </Button>
          <Button
            variant="light"
            radius="full"
            isIconOnly
            onClick={ChangeTheme}
          >
            <FaPizzaSlice className="text-white text-2xl" />
          </Button>
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        radius="sm"
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ModalContent>
          <h3 className="roboto-bold text-lg my-3 mx-6">Quik Add Task</h3>
          <div className="mt-8 w-full p-5">
            <Input
              onChange={(e) => {
                setBody(e.target.value);
              }}
              value={body}
              radius="sm"
              type="text"
              color="primary"
              label="New Task"
              placeholder="Your New Task"
              variant="bordered"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button
                  onClick={AddTaskHandler}
                  color="primary"
                  radius="sm"
                  className="sm:px-10"
                >
                  Add Task
                </Button>
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    setProject(null);
                    setCategori(null);
                    setBody("");
                  }}
                  color="primary"
                  variant="bordered"
                  radius="sm"
                  className="sm:px-10"
                >
                  Cancel
                </Button>
              </div>
              <div className="flex items-center sm:gap-4 gap-0 text-2xl text-zinc-600">
                <Dropdown radius="sm" className="p-0">
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" variant="light">
                      <LuCalendarDays className="text-2xl" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu className="p-0 m-0">
                    {defProject.map((e, i) => (
                      <DropdownItem key={i} className="m-0" isReadOnly>
                        <label
                          className={`${
                            project === e._id
                              ? "bg-zinc-300 dark:bg-zinc-800"
                              : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                          } flex items-center gap-3 cursor-pointer py-2 px-2 rounded-md transition`}
                        >
                          <input
                            type="radio"
                            onChange={() => {
                              setProject(e._id);
                            }}
                            checked={project === e._id ? true : false}
                            className="w-0 h-0 absolute"
                          />
                          <div className="relative w-[10px] h-[10px]">
                            <span
                              style={{ backgroundColor: e.color }}
                              className={`w-full h-full absolute top-0 animate-ping left-0 rounded-full`}
                            ></span>
                            <span
                              style={{ backgroundColor: e.color }}
                              className={`w-full h-full absolute top-0 left-0 rounded-full`}
                            ></span>
                          </div>
                          <span className="font-semibold">{e.name}</span>
                        </label>
                      </DropdownItem>
                    ))}
                    {userProject.map((e, i) => (
                      <DropdownItem key={i} className="m-0" isReadOnly>
                        <label
                          className={`${
                            project === e._id
                              ? "bg-zinc-300 dark:bg-zinc-800"
                              : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                          } flex items-center gap-3 cursor-pointer py-2 px-2 rounded-md transition`}
                        >
                          <input
                            type="radio"
                            onChange={() => {
                              setProject(e._id);
                            }}
                            checked={project === e._id ? true : false}
                            className="w-0 h-0 absolute"
                          />
                          <div className="relative w-[10px] h-[10px]">
                            <span
                              style={{ backgroundColor: e.color }}
                              className={`w-full h-full absolute top-0 animate-ping left-0 rounded-full`}
                            ></span>
                            <span
                              style={{ backgroundColor: e.color }}
                              className={`w-full h-full absolute top-0 left-0 rounded-full`}
                            ></span>
                          </div>
                          <span className="font-semibold">{e.name}</span>
                        </label>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Dropdown radius="sm" className="p-0">
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" variant="light">
                      <FaRegListAlt className="text-2xl" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu className="p-0 m-0">
                    <DropdownItem className="m-0" isReadOnly>
                      <label
                        className={`${
                          categori === "today"
                            ? "bg-zinc-300 dark:bg-zinc-800"
                            : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                        } flex items-center gap-3 cursor-pointer py-2 px-2 rounded-md transition`}
                      >
                        <input
                          type="radio"
                          onChange={(e) => {
                            setCategori("today");
                          }}
                          checked={categori === "today" ? true : false}
                          className="w-0 h-0 absolute"
                        />
                        <MdCalendarToday className="text-xl" />
                        <span className="font-semibold">Today</span>
                      </label>
                    </DropdownItem>
                    <DropdownItem className="m-0" isReadOnly>
                      <label
                        className={`${
                          categori === "nextweek"
                            ? "bg-zinc-300 dark:bg-zinc-800"
                            : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                        } flex items-center gap-3 cursor-pointer py-2 px-2 rounded-md transition`}
                      >
                        <input
                          type="radio"
                          onChange={(e) => {
                            setCategori("nextweek");
                          }}
                          checked={categori === "nextweek" ? true : false}
                          className="w-0 h-0 absolute"
                        />
                        <LuCalendarDays className="text-xl" />
                        <span className="font-semibold">Next 7 days</span>
                      </label>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
  function ChangeTheme() {
    if (dark) {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
    setDark(!dark);
  }
}
