import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export default function FormBtn({ children }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      radius="sm"
      color="secondary"
      isLoading={pending}
      className=""
    >
      {children}
    </Button>
  );
}
