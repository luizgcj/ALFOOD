import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,    
  } from "@mui/material";
import { METHODS } from "http";
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import http from "../../../http";  
  import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";
  
  export default function FormularioPrato() {
    const [nomePrato, setNomePrato] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tag, setTag] = useState("");
    const [restaurante, setRestaurante] = useState("");
    const [imagem, setImagem] = useState< File | null>(null);

    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  
    const parametro = useParams();
  
    useEffect(() => {
      http
        .get< { tags: ITag[] } >(`tags/`)
        .then((resposta) => setTags(resposta.data.tags));
      http
        .get< IRestaurante[] >(`restaurantes/`)
        .then((resposta) => setRestaurantes(resposta.data));
      }, []);

      useEffect(() => {
        if (parametro.id) {
          http
            .get(`pratos/${parametro.id}/`)
            .then((resposta) => {
              setNomePrato(resposta.data.nome)
              setDescricao(resposta.data.descricao)
              setTag(resposta.data.tag)
              setRestaurante(resposta.data.restaurante)
              setImagem(resposta.data.imagem)              
            });
        }
      }, [parametro]);

    function selecionarArquivo (evento: React.ChangeEvent<HTMLInputElement>){
      if (evento.target.files?.length) {
        setImagem(evento.target.files[0]);
      } else {
        setImagem(null);
      }
    }

    function limparCampos(){
      setNomePrato("");
      setDescricao("");
      setRestaurante("");
      setTag("");
      setImagem(null);
    }
  
    function aoSubmeter(evento: React.FormEvent<HTMLFormElement>) {
      evento.preventDefault(); //não recarregar a pagina
  
       const formData = new FormData();
       formData.append('nome', nomePrato);
       formData.append('descricao', descricao);
       formData.append('tag', tag);
       formData.append('restaurante', restaurante);

       if (imagem)
         formData.append('imagem', imagem);

        if (parametro.id) 
        {
          console.log('entrou aqui')
          http.request({
            url: `pratos/${parametro.id}/`,
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: formData
          })
          .then(() => {
             limparCampos()
             alert('Prato alterado com sucesso')
          })
          .catch(erro => console.log(erro))
        } else {
        http.request({
          url: 'pratos/',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
        .then(() => {
           limparCampos()
           alert('Prato cadastrado com sucesso')
        })
        .catch(erro => console.log(erro))
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
          Formulário de Pratos
        </Typography>
        <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeter}>
          <TextField
            sx={{ marginTop: 1 }}
            value={nomePrato}
            onChange={(evento) => setNomePrato(evento.target.value)}
            label="Nome do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />

          <TextField
            sx={{ marginTop: 1 }}
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            label="Descrição do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
              {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>)}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
              {restaurantes.map(rest => <MenuItem key={rest.id} value={rest.id}>
                {rest.nome}
              </MenuItem>)}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionarArquivo}/>


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
  