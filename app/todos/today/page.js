"use client";

import AddTodoForm from "@/components/module/add-todo-form";
import ToDOSection from "@/components/module/todo";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdCalendarToday } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function TodayPage() {
  const [defProject, setDefProject] = useState([]);
  const [userProject, setUserProject] = useState([]);
  const [userTodo, setUserTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      setLoading(true);

      const res = await axios.get("/api/project");
      const res2 = await axios.get("/api/todo");

      const todayTodo = res2.data.data.filter((e) => e.categori === "today");

      setDefProject(res.data.defProject);
      setUserProject(res.data.userProject);
      setUserTodo(todayTodo);

      setLoading(false);
    } catch (error) {
      router.push("/auth");
    }
  }
  return (
    <section className="bg-white min-h-screen dark:bg-zinc-800 w-full border-r border-zinc-200 dark:border-zinc-800 py-20 sm:px-8 px-4">
      <div className="text-4xl text-zinc-800 dark:text-white font-bold">
        Today
      </div>
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
          />
        ))}
      </div>
      <AddTodoForm
        Defprojects={defProject}
        userProjects={userProject}
        currentCategori="today"
        ReRender={fetchUserData}
      />
      {loading === false && userTodo.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] my-10">
          <MdCalendarToday className="text-[160px] text-zinc-300 dark:text-zinc-700" />
          <h3 className="text-4xl font-black text-center">today is Empty</h3>
          <p className="text-zinc-400 dark:text-zinc-500 text-center">
            You dont have any tasks today
          </p>
        </div>
      )}
    </section>
  );
}
