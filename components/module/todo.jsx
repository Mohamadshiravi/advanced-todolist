"use client";

import { newSucToast } from "@/utils/helper-func";
import { Button, Checkbox } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import swal from "sweetalert";

export default function ToDOSection({ body, checked, id, ReRender, color }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
    console.log(body, checked);
  }, []);
  return (
    <div className="flex gap-3 items-center justify-between min-h-[50px] border-b hover:border-b-2 border-zinc-200 dark:border-zinc-700 w-full">
      <label className="flex items-center gap-3 cursor-pointer w-full">
        <Checkbox
          isSelected={isChecked}
          onChange={ToggleTodoHandler}
          color={color ? "success" : "secondary"}
          size="lg"
          radius="full"
        />
        <p
          className={`roboto-bold text-lg ${
            isChecked && "line-through"
          } overflow-hidden`}
        >
          {body}
        </p>
      </label>
      <Button
        onClick={DeleteTaskHandler}
        isIconOnly
        variant="light"
        radius="full"
      >
        <AiTwotoneDelete className="text-2xl dark:text-zinc-400" />
      </Button>
    </div>
  );
  async function ToggleTodoHandler() {
    setIsChecked(!isChecked);
    const res = await axios.put(`/api/todo/${id}`, { checked: !checked });
    if (res.status === 200) {
      if (!isChecked) {
        newSucToast(`${body} Checked`);
      } else {
        newSucToast(`${body} UNchecked`);
      }
    }
  }
  async function DeleteTaskHandler() {
    const isOk = await swal({
      icon: "warning",
      title: "Delete Task ?",
      text: `(${body})`,
      buttons: ["cancel", "yes"],
    });
    if (isOk) {
      const res = await axios.delete(`/api/todo/${id}`);
      if (res.status === 200) {
        newSucToast("Task Deleted");
        ReRender();
      }
    }
  }
}
