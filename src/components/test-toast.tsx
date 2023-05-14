"use client";

import { Button } from "@/components/ui/button";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/components/ui/use-toast";

export function ToastSimple() {
  // const notify = () => toast("Wow so easy!");
  const { toast } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
        }
      >
        Notify!
      </button>
      {/* <ToastContainer /> */}
    </div>
  );
}
