"use client";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const AuthButton = ({ where, icon }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  return (
    <>
      <Button
        sx={{
          ":hover": {
            background: "none",
          },
          cursor: "default",
          background: "none",
          color: "black",
        }}
        disableRipple
        onClick={() => {
          signIn(`${where}`, { callbackUrl });
        }}
      >
        {icon == "github" ? (
          <GitHubIcon
            sx={{
              ":hover": {
                cursor: "pointer",
                transform: "scale(1.5)",
              },
            }}
          ></GitHubIcon>
        ) : icon == "yandex" ? (
          <img className="authimg" src="/yandex.png" alt="Яндекс"></img>
        ) : (
          <img className="authimg" src="/vk.png" alt="Вконтакте"></img>
        )}
      </Button>
    </>
  );
};
export default AuthButton;
