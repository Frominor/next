"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm, Controller, useFormState } from "react-hook-form";
import GitHubIcon from "@mui/icons-material/GitHub";
const theme = createTheme();
const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const { handleSubmit, control } = useForm({ mode: "onSubmit" });
  const router = useRouter();
  const { errors } = useFormState({
    control,
  });
  const onSubmit = async (obj) => {
    const { password, email } = obj;
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" id="regsiterbox">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <svg
              style={{ marginTop: 70 + "px" }}
              xmlns="http://www.w3.org/2000/svg"
              class="site__logo"
              width="56"
              height="84"
              viewBox="77.7 214.9 274.7 412"
            >
              <defs>
                <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                  <stop offset="0%" stop-color="#8ceabb" />
                  <stop offset="100%" stop-color="#378f7b" />
                </linearGradient>
              </defs>
              <path
                fill="url(#a)"
                d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"
              />
            </svg>
          </div>
          <Typography component="h4" variant="h2" id={"dasdadad"}>
            Авторизация
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Введите почту",
                    min: 5,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                      message: "Неверный формат",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      className="registerfield"
                      id="filled-hidden-label-small"
                      label={"Почта"}
                      error={!!errors.email?.message}
                      InputLabelProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      InputProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      value={field.value}
                      variant="standard"
                      helperText={errors.email?.message}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                ></Controller>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Введите пароль",
                    minLength: 5,
                    maxLength: 30,
                  }}
                  render={({ field }) => (
                    <TextField
                      label={"Пароль"}
                      fullWidth
                      value={field.value}
                      variant="standard"
                      InputLabelProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      InputProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      error={!!errors.password?.message}
                      helperText={errors.password?.message}
                    ></TextField>
                  )}
                ></Controller>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id="registerButton"
              sx={{ mt: 6, mb: 2 }}
            >
              Войти
            </Button>
          </Box>
          <Box>
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
                signIn("github", { callbackUrl });
              }}
            >
              {" "}
              <GitHubIcon
                sx={{
                  ":hover": {
                    cursor: "pointer",
                    transform: "scale(1.5)",
                  },
                }}
              ></GitHubIcon>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInForm;
// //  <button onClick={() => signIn("github", { callbackUrl })}>
// Sign in with GitHub
// // </button>
