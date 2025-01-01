"use client";

import { useEffect, useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { MdCalendarToday } from "react-icons/md";
import { newErrorToast, newSucToast } from "@/utils/helper-func";
import axios from "axios";

export default function AddTodoForm({
  Defprojects,
  userProjects,
  currentCategori,
  currentProject,
  ReRender,
  color,
}) {
  const [project, setProject] = useState(null);
  const [categori, setCategori] = useState(null);

  const [body, setBody] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (currentCategori) {
      setCategori(currentCategori);
    }
  }, []);

  useEffect(() => {
    if (currentProject && project === null && categori === null) {
      setProject(currentProject);
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
        ReRender();
      }
    } catch (error) {
      return newErrorToast("Error");
    }
  }
  return (
    <div className="my-2">
      {!isFormOpen && (
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-700 items-center gap-3 text-zinc-500 text-sm font-semibold px-3 hover:bg-gray-50 transition w-full py-3 rounded-sm"
        >
          <FaPlus
            style={{ color: color }}
            className={`text-lg ${!color && "text-orange-600"}`}
          />
          Add Task
        </button>
      )}
      {isFormOpen && (
        <div className="mt-8 w-full">
          <Input
            onChange={(e) => {
              setBody(e.target.value);
            }}
            value={body}
            radius="sm"
            type="text"
            color={color ? "primary" : "secondary"}
            label="New Task"
            placeholder="Your New Task"
            variant="bordered"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Button
                onClick={AddTaskHandler}
                color={color ? "primary" : "secondary"}
                radius="sm"
                className="sm:px-10"
              >
                Add Task
              </Button>
              <Button
                onClick={() => {
                  setIsFormOpen(false);
                  setProject(null);
                  setCategori(null);
                  setBody("");
                }}
                color={color ? "primary" : "secondary"}
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
                  {Defprojects.map((e, i) => (
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
                  {userProjects.map((e, i) => (
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
                          ? "bg-zinc-300"
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
                          ? "bg-zinc-300"
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
      )}
    </div>
  );
}
