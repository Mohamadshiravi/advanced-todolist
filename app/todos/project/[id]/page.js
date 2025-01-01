"use client";

import AddTodoForm from "@/components/module/add-todo-form";
import ToDOSection from "@/components/module/todo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProjectsSection({ params }) {
  const [defProject, setDefProject] = useState([]);
  const [userProject, setUserProject] = useState([]);
  const [userTodo, setUserTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      setLoading(true);

      const res = await axios.get("/api/project");
      const res2 = await axios.get("/api/todo");

      const ProjectTodo = res2.data.data.filter((e) => e.project === params.id);

      const currentProject = res.data.defProject.filter(
        (e) => e._id === params.id
      );
      setCurrentPage(currentProject[0]);

      if (!currentProject[0]) {
        const userProject = res.data.userProject.filter(
          (e) => e._id === params.id
        );
        setCurrentPage(userProject[0]);
      }

      setDefProject(res.data.defProject);
      setUserProject(res.data.userProject);
      setUserTodo(ProjectTodo);

      setLoading(false);
    } catch (error) {
      router.push("/auth");
    }
  }
  return (
    <section className="bg-white min-h-screen dark:bg-zinc-800 w-full border-r border-zinc-200 dark:border-zinc-800 py-20 sm:px-8 px-4">
      <div className="text-4xl uppercase text-zinc-800 dark:text-white font-bold flex items-center gap-4">
        <div className="relative w-[20px] h-[20px]">
          <span
            style={{ backgroundColor: currentPage?.color }}
            className="w-full h-full absolute top-0 animate-ping left-0 rounded-full"
          ></span>
          <span
            style={{ backgroundColor: currentPage?.color }}
            className="w-full h-full absolute top-0 left-0 rounded-full"
          ></span>
        </div>
        {currentPage?.name}
      </div>
      {loading && (
        <div className="bg-gray-300 dark:bg-zinc-700 w-full h-[60px] rounded-md animate-pulse"></div>
      )}
      <hr className="border border-zinc-200 my-3 dark:border-zinc-700"></hr>
      {loading && (
        <div className="flex flex-col items-cenetr w-full gap-3">
          {Array.from({ length: 6 }).map((e, i) => (
            <div
              key={i}
              className="bg-gray-300 dark:bg-zinc-700 w-full h-[60px] rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      )}
      <div className="flex flex-col items-cenetr w-full gap-3">
        {userTodo.map((e, i) => (
          <ToDOSection
            ReRender={fetchUserData}
            key={i}
            body={e.body}
            checked={e.checked}
            id={e._id}
            color
          />
        ))}
      </div>
      <AddTodoForm
        Defprojects={defProject}
        userProjects={userProject}
        ReRender={fetchUserData}
        color={currentPage?.color}
        currentProject={currentPage?._id}
      />
      {loading === false && userTodo.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] my-10">
          <h3 className="text-4xl font-black uppercase text-center">
            {currentPage.name} is Empty
          </h3>
          <p className="text-zinc-400 dark:text-zinc-500 text-center">
            You dont have any tasks in this project
          </p>
        </div>
      )}
    </section>
  );
}
