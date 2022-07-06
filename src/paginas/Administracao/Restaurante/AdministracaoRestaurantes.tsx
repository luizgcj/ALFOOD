import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import http from "../../../http";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  function excluir(restaurante : IRestaurante){
    http.delete(`restaurantes/${restaurante.id}/`)
      .then(() => {
        const listaRestaurantes = restaurantes.filter(rest => rest.id !== restaurante.id);
        setRestaurantes([...listaRestaurantes]);
      });
  }

  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>[ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ] </TableCell>
              <TableCell> <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}> Excluir </Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
