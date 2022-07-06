import {
    Box,
    Button,
    Typography,
    AppBar,
    Container,
    Toolbar,
    Link,
    Paper,
  } from "@mui/material";
  import React, { Children, useEffect, useState } from "react";
  import { Outlet, useParams } from "react-router-dom";
  
  import {Link as RouterLink} from 'react-router-dom';
  
  export default function PaginaBaseAdmin() {    
    return (
      <>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar>
              <Typography variant="h6">Administração</Typography>
              <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Link component={RouterLink} to="/admin/Restaurantes">
                  <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
                </Link>

                <Link component={RouterLink} to="/admin/Restaurantes/Novo">
                  <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
                </Link>

                <Link component={RouterLink} to="/admin/Pratos">
                  <Button sx={{ my: 2, color: "white" }}>Pratos</Button>
                </Link>

                <Link component={RouterLink} to="/admin/Pratos/Novo">
                  <Button sx={{ my: 2, color: "white" }}>Novo Prato</Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
  
        <Box>
          <Container maxWidth="lg" sx={{ mt: 1 }}>
            <Paper sx={{ p: 2 }}>
              <Outlet/>
            </Paper>
          </Container>
        </Box>
      </>
    );
  }
  