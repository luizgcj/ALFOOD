import {
  Box,
  Button,
  TextField,
  Typography,
  AppBar,
  Container,
  Toolbar,
  Link,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

import { Link as RouterLink } from "react-router-dom";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const parametro = useParams();

  useEffect(() => {
    if (parametro.id) {
      http
        .get(`restaurantes/${parametro.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametro]);

  function aoSubmeter(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault(); //não recarregar a pagina

    if (parametro.id) {
      http
        .put<IRestaurante>(`restaurantes/${parametro.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso");
        });
    } else {
      http
        .post<IRestaurante>("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso");
        });
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeter}>
        <TextField
          sx={{ marginTop: 1 }}
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
