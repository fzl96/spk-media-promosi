"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function GoogleSignIn() {
  return (
    <div>
      <button
        className="rounded-md flex text-white font-semibold items-center gap-3 px-3 py-2 bg-gray-800"
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000",
          })
        }
        type="button"
      >
        <span className="text-2xl">
          <FcGoogle />
        </span>
        Login with Google
      </button>
    </div>
  );
}
