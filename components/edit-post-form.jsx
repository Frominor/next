"use client";
import { useRouter } from "next/navigation";
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
const EditForm = ({ post, updatepost, id }) => {
  console.log(post);
  const { handleSubmit, control } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: post.title,
      description: post.description,
    },
  });
  const router = useRouter();
  const { errors } = useFormState({
    control,
  });
  const onSubmit = async (obj) => {
    updatepost(obj, id);
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="title"
                  rules={{
                    required: "Поле не должно быть пустым",
                    minLength: 5,
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      id="filled-hidden-label-small"
                      label={"Заголовок"}
                      error={!!errors.title?.message}
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
                      helperText={errors.title?.message}
                      onChange={(e) => {
                        console.log(e.target.value);
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                ></Controller>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: "Поле не должно содержать менее 5 символов",
                    minLength: 5,
                  }}
                  render={({ field }) => (
                    <TextField
                      label={"Описание"}
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
                      error={!!errors.description?.message}
                      helperText={errors.description?.message}
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
              Сохранить
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditForm;
