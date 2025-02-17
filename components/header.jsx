"use client";

import { SiTodoist } from "react-icons/si";
import { FaPlus } from "react-icons/fa6";
import { FaPizzaSlice } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import HeaderAddTaskModalContent from "./headerAddTaskModal";

export default function AppHeader({ color, reRenderTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dark, setDark] = useState(false);

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
  }, []);

  return (
    <>
      <header
        style={{ backgroundColor: color }}
        className={`flex z-[41] items-center text-3xl lg:justify-between justify-end py-2 fixed sm:px-20 px-4 top-0 left-0 w-full`}
      >
        <SiTodoist className="text-white lg:block hidden" />
        <div className="flex items-center gap-1">
          <Button
            onPress={() => {
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
            onPress={ChangeTheme}
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
          <HeaderAddTaskModalContent
            reRenderTasks={reRenderTasks}
            close={() => setIsModalOpen(false)}
          />
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
