"use client";
import AuthButton from "../../components/authbutton";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React from "react";
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

import Link from "next/link";
import { useForm, Controller, useFormState } from "react-hook-form";

const theme = createTheme();
const SignInForm = () => {
  const [ErrorMessage, SetErrorMessage] = React.useState(null);
  const { handleSubmit, control } = useForm({ mode: "onSubmit" });
  const router = useRouter();
  const { errors } = useFormState({
    control,
  });
  const onSubmit = async (obj) => {
    const res = await signIn("credentials", {
      ...obj,
      redirect: false,
    });
    if (res.error) {
      if (res.error == "Cannot read properties of null (reading email)") {
        SetErrorMessage("Пользователь не найден");
      } else {
        SetErrorMessage("Пользователь не найден");
      }
    }
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
              className="site__logo"
              width="56"
              height="84"
              viewBox="77.7 214.9 274.7 412"
            >
              <defs>
                <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#8ceabb" />
                  <stop offset="100%" stopColor="#378f7b" />
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
            <AuthButton where={"github"} icon={"github"}></AuthButton>
            <AuthButton where={"vk"} icon={"vk"}></AuthButton>
            <AuthButton where={"yandex"} icon={"yandex"}></AuthButton>
          </Box>
        </Box>
        {ErrorMessage !== null ? (
          <h2 style={{ textAlign: "center", color: "red", fontSize: 30 }}>
            {ErrorMessage}!
          </h2>
        ) : (
          ""
        )}
      </Container>
    </ThemeProvider>
  );
};

export default SignInForm;
