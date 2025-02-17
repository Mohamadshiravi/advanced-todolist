"use client";

import { FaInbox } from "react-icons/fa6";
import AddTodoForm from "@/components/module/add-todo-form";
import ToDOSection from "@/components/module/todo";
import { useEffect, useState } from "react";
import axios from "axios";
import AppHeader from "@/components/header";
import { Skeleton } from "@nextui-org/react";

export default function InboxPage() {
  const [defProject, setDefProject] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProject, setUserProject] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    await Promise.all([FetchTodos(), FetchProjects()]);
  }

  async function FetchTodos() {
    setLoading(true);
    const res = await axios.get("/api/todo");
    const todayTodo = res.data.data.filter((e) => e.categori === "nextweek");

    setTodos(todayTodo);
    setLoading(false);
  }

  async function FetchProjects() {
    const res = await axios.get("/api/project");
    setDefProject(res.data.defProject);
    setUserProject(res.data.userProject);
  }

  return (
    <>
      <AppHeader
        color={"oklch(0.705 0.213 47.604)"}
        reRenderTasks={FetchTodos}
      />
      <section className="bg-white min-h-screen dark:bg-zinc-800 w-full border-r border-zinc-200 dark:border-zinc-800 py-20 sm:px-8 px-4">
        <div className="text-4xl text-zinc-800 dark:text-white font-bold">
          Inbox
        </div>
        <hr className="border border-zinc-200 my-3 dark:border-zinc-700"></hr>
        {loading && (
          <div className="flex flex-col items-cenetr w-full gap-3">
            {Array.from({ length: 6 }).map((e, i) => (
              <Skeleton key={i} className="w-full h-[60px] rounded-md" />
            ))}
          </div>
        )}
        <div className="flex flex-col items-cenetr w-full gap-3">
          {!loading &&
            todos.map((e, i) => (
              <ToDOSection
                ReRender={fetchUserData}
                key={i}
                body={e.body}
                checked={e.checked}
                id={e._id}
              />
            ))}
        </div>
        <AddTodoForm
          Defprojects={defProject}
          userProjects={userProject}
          ReRender={fetchUserData}
        />
        {loading === false && todos.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] my-10">
            <FaInbox className="text-[160px] text-zinc-300 dark:text-zinc-700" />
            <h3 className="text-4xl font-black text-center">Inbox is Empty</h3>
            <p className="text-zinc-400 dark:text-zinc-500 text-center">
              You dont have any tasks
            </p>
          </div>
        )}
      </section>
    </>
  );
}
