"use client";

import { useEffect, useState } from "react";
import { FaInbox, FaPlus } from "react-icons/fa6";
import { MdCalendarToday, MdOutlineLogout } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { RiMenuUnfold3Line2 } from "react-icons/ri";
import { VscSymbolColor } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { newErrorToast, newSucToast, ShowSwal } from "@/utils/helper-func";
import { AiTwotoneDelete } from "react-icons/ai";

export default function AppMenu() {
  const [isProjectOpen, setIsProjectOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [defProject, setDefProject] = useState([]);
  const [userProject, setUserProject] = useState([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  //add project state
  const [projectColor, setProjectColor] = useState("");
  const [projectName, setProjectName] = useState("");

  const [user, setUser] = useState("");

  const path = usePathname();

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      const res = await axios.get("/api/project");
      const theUser = await axios.get("/api/me");

      setDefProject(res.data.defProject);
      setUserProject(res.data.userProject);
      setUser(theUser.data.user);

      setLoading(false);
    }
    fetchUserData();
  }, []);
  return (
    <>
      <section
        onClick={() => {
          setIsMenuOpen(false);
        }}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full h-screen bg-black/30 backdrop-blur-sm fixed top-0 left-0 z-[40]`}
      ></section>
      <Button
        variant="light"
        radius="full"
        isIconOnly
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        className="fixed lg:-top-20 top-2 sm:left-8 left-4 z-[42]"
      >
        <RiMenuUnfold3Line2
          className={`text-2xl text-white transition ${
            isMenuOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </Button>
      <nav
        className={`w-[300px] ${
          !isMenuOpen ? "translate-x-[-300px]" : "translate-x-0"
        } h-screen fixed z-[41] lg:overflow-y-auto py-20 overflow-y-scroll lg:translate-x-0 top-0 lg:left-20 left-0 lg:shadow-none shadow-lg bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 lg:pr-1 px-2 transition duration-300 border-r border-zinc-200`}
      >
        <ul className="gap-1 text-zinc-600 flex flex-col">
          <div
            className={`${
              path === "/todos" &&
              "text-zinc-800 bg-white dark:bg-zinc-800 dark:text-white"
            } flex items-center justify-between gap-3 hover:text-zinc-800 dark:text-zinc-300 px-3 dark:hover:text-white dark:hover:bg-zinc-800 text-base hover:bg-white cursor-pointer rounded-sm transition-all`}
          >
            <Link
              onClick={() => {
                setIsMenuOpen(false);
              }}
              href={"/todos"}
              className="flex flex-col w-full h-full py-3"
            >
              <span className="font-semibold text-lg">Inbox</span>
              <span className="text-zinc-400 dark:text-zinc-500 text-sm font-mono truncate overflow-hidden w-[200px] block">
                {user.email}
              </span>
            </Link>
            <Button
              onClick={LogOutUserHandler}
              className="bg-red-500 dark:bg-red-600"
              radius="full"
              isIconOnly
            >
              <MdOutlineLogout className="text-xl text-zinc-800" />
            </Button>
          </div>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/todos/today"}
            className={`${
              path === "/todos/today" &&
              "text-zinc-800 bg-white dark:bg-zinc-800 dark:text-white"
            } flex items-center gap-3 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 text-base hover:bg-white cursor-pointer py-3 rounded-sm px-3 transition-all`}
          >
            <MdCalendarToday className="text-xl" />
            <span className="font-semibold">Today</span>
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            href={"/todos/nextweek"}
            className={`${
              path === "/todos/nextweek" &&
              "text-zinc-800 bg-white dark:bg-zinc-800 dark:text-white"
            } flex items-center gap-3 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 text-base hover:bg-white cursor-pointer py-3 rounded-sm px-3 transition-all`}
          >
            <LuCalendarDays className="text-xl" />
            <span className="font-semibold">Next 7 Days</span>
          </Link>
        </ul>
        <button
          onClick={() => {
            setIsProjectOpen(!isProjectOpen);
          }}
          className="flex dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 items-center gap-3 font-semibold px-2 my-3 hover:bg-gray-50 transition w-full py-3 rounded-sm"
        >
          <IoIosArrowDown
            className={`${
              isProjectOpen ? "rotate-180" : "rotate-0"
            } text-2xl text-zinc-600 transition`}
          />
          Projects
        </button>

        <ul
          className={`${
            isProjectOpen
              ? "translate-y-0 opacity-100 pt-3 border-t"
              : "-translate-y-10 opacity-0 pt-0 h-[0px]"
          } text-zinc-600 flex flex-col gap-1 transition overflow-hidden border-zinc-200 dark:border-zinc-800`}
        >
          {loading &&
            Array.from({ length: 5 }).map((e, i) => (
              <div
                key={i}
                className="bg-gray-300 dark:bg-zinc-700 w-full h-[50px] mt-0.5 animate-pulse rounded-md"
              ></div>
            ))}
          {defProject.map((e, i) => (
            <Link
              onClick={() => {
                setIsMenuOpen(false);
              }}
              href={`/todos/project/${e._id}`}
              key={i}
              className={`${
                path === `/todos/project/${e._id}` &&
                "bg-white text-zinc-800 dark:bg-zinc-800 dark:text-white"
              } flex items-center uppercase dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 gap-3 hover:text-zinc-800 text-base hover:bg-white cursor-pointer py-3 rounded-sm px-3 transition-all`}
            >
              <div className="relative w-[10px] h-[10px]">
                <span
                  style={{ backgroundColor: e.color }}
                  className="w-full h-full absolute top-0 animate-ping left-0 rounded-full"
                ></span>
                <span
                  style={{ backgroundColor: e.color }}
                  className="w-full h-full absolute top-0 left-0 rounded-full"
                ></span>
              </div>
              <span className="font-semibold">{e.name}</span>
            </Link>
          ))}
          {userProject.map((e, i) => (
            <div
              key={i}
              className={`${
                path === `/todos/project/${e._id}` &&
                "bg-white text-zinc-800 dark:bg-zinc-800 dark:text-white"
              } flex items-center justify-between uppercase dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 gap-3 hover:text-zinc-800 text-base hover:bg-white cursor-pointer rounded-sm px-3 transition-all`}
            >
              <Link
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                href={`/todos/project/${e._id}`}
                className="flex items-center gap-3 w-full h-full py-3"
              >
                <div className="relative w-[10px] h-[10px]">
                  <span
                    style={{ backgroundColor: e.color }}
                    className="w-full h-full absolute top-0 animate-ping left-0 rounded-full"
                  ></span>
                  <span
                    style={{ backgroundColor: e.color }}
                    className="w-full h-full absolute top-0 left-0 rounded-full"
                  ></span>
                </div>
                <span className="font-semibold">{e.name}</span>
              </Link>
              <Button
                size="sm"
                onClick={() => DeleteProjectHandler(e._id, e.name)}
                isIconOnly
                variant="light"
                radius="full"
              >
                <AiTwotoneDelete className="text-xl dark:text-zinc-400" />
              </Button>
            </div>
          ))}

          {!isAddProjectOpen && (
            <button
              onClick={() => {
                setIsAddProjectOpen(true);
              }}
              className="flex dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 items-center gap-3 text-zinc-500 text-sm font-semibold px-2 my-2 hover:bg-gray-50 transition w-full py-3 rounded-sm"
            >
              <FaPlus className="text-base text-zinc-500" />
              Add Project
            </button>
          )}
          {isAddProjectOpen && (
            <div className="pr-2">
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                radius="sm"
                variant="bordered"
                color="primary"
                placeholder="Name your project"
              ></Input>
              <div className="w-full mt-1 flex items-center justify-between">
                <div className="flex gap-1">
                  <Button
                    onClick={AddProjectHandler}
                    color="primary"
                    radius="sm"
                    size="sm"
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddProjectOpen(false);
                      setProjectColor("");
                      setProjectName("");
                    }}
                    radius="sm"
                    color="primary"
                    variant="bordered"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
                <label
                  style={{ backgroundColor: projectColor }}
                  className={`${
                    !projectColor && "bg-gray-600"
                  } relative rounded-full p-2 cursor-pointer`}
                >
                  <VscSymbolColor className="text-2xl text-zinc-200" />
                  <input
                    value={projectColor}
                    onChange={(e) => setProjectColor(e.target.value)}
                    type="color"
                    className="w-0 h-0 absolute"
                  />
                </label>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </>
  );
  async function AddProjectHandler() {
    if (projectName === "" || projectColor === "") {
      return newErrorToast("please type project name and select color");
    }
    const project = {
      name: projectName,
      color: projectColor,
    };
    const res = await axios.post("/api/project", project);
    if (res.status === 201) {
      newSucToast("project Added");
      setInterval(() => {
        location.reload();
      }, 500);
    }
  }
  async function DeleteProjectHandler(id, name) {
    const isOk = await ShowSwal(
      "warning",
      `Are you sure want to delete ${name}`,
      ["cancel", "yes"]
    );
    if (isOk) {
      const res = await axios.delete(`/api/project/${id}`);
      if (res.status === 200) {
        newSucToast("project Deleted");
        setInterval(() => {
          location.href = "/todos";
        }, 500);
      }
    }
  }
  async function LogOutUserHandler() {
    const isOk = await ShowSwal("info", `Are you sure want to LogOut ?`, [
      "cancel",
      "yes",
    ]);
    if (isOk) {
      const res = await axios.get("/api/logout");
      if (res.status === 200) {
        location.reload();
      }
    }
  }
}
