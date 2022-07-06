import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  function excluir(prato : IPrato){
    http.delete(`pratos/${prato.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(pr => pr.id !== prato.id);
        setPratos([...listaPratos]);
      });
  }

  useEffect(() => {
    http
      .get<IPrato[]>("pratos/")
      .then((resposta) => setPratos(resposta.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>          
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>           
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [<a href={prato.imagem} target="blank" rel="noreferrer">ver imagem</a>]
              </TableCell>
              <TableCell>[ <Link to={`/admin/pratos/${prato.id}`}>editar</Link> ] </TableCell>
              <TableCell> <Button variant="outlined" color="error" onClick={() => excluir(prato)}> Excluir </Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
