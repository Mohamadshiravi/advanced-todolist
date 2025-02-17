"use client";

import AddTodoForm from "@/components/module/add-todo-form";
import ToDOSection from "@/components/module/todo";
import { useEffect, useState } from "react";
import axios from "axios";
import AppHeader from "@/components/header";
import { Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ProjectsSection({ params }) {
  const [defProject, setDefProject] = useState([]);
  const [userProject, setUserProject] = useState([]);
  const [userTodo, setUserTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleLoading, setTitleLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    await Promise.all([FetchTodos(), FetchProjects()]);
  }

  async function FetchTodos() {
    setLoading(true);
    const res = await axios.get("/api/todo");
    const ProjectTodo = res.data.data.filter((e) => e.project === params.id);
    setUserTodo(ProjectTodo);
    setLoading(false);
  }

  async function FetchProjects() {
    setTitleLoading(true);
    const res = await axios.get("/api/project");

    if (
      !res.data.userProject.some((e) => e._id === params.id) &&
      !res.data.defProject.some((e) => e._id === params.id)
    ) {
      router.push("/todos");
    }

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
    setTitleLoading(false);
  }

  return (
    <>
      <AppHeader reRenderTasks={FetchTodos} color={currentPage?.color} />
      <section className="bg-white min-h-screen dark:bg-zinc-800 w-full border-r border-zinc-200 dark:border-zinc-800 py-20 sm:px-8 px-4">
        {titleLoading ? (
          <Skeleton className="w-[250px] h-[60px] rounded-md" />
        ) : (
          <div className="text-4xl h-[60px] uppercase text-zinc-800 dark:text-white font-bold flex items-center gap-4">
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
        )}
        <hr className="border border-zinc-200 my-3 dark:border-zinc-700"></hr>
        {loading && (
          <div className="flex flex-col items-cenetr w-full gap-3">
            {Array.from({ length: 6 }).map((e, i) => (
              <Skeleton key={i} className="w-full h-[60px] rounded-md" />
            ))}
          </div>
        )}
        <div className="flex flex-col items-center w-full gap-3">
          {!loading &&
            userTodo.map((e, i) => (
              <ToDOSection
                ReRender={FetchTodos}
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
          ReRender={FetchTodos}
          color={currentPage?.color}
          currentProject={currentPage?._id}
        />
        {!loading && userTodo.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] my-10">
            <h3 className="text-4xl font-black uppercase text-center">
              {currentPage?.name} is Empty
            </h3>
            <p className="text-zinc-400 dark:text-zinc-500 text-center">
              You dont have any tasks in this project
            </p>
          </div>
        )}
      </section>
    </>
  );
}
