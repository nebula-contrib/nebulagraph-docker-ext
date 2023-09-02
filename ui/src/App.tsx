import React from 'react';
import Button from '@mui/material/Button';
import { Insights, Explore, KeyboardArrowRight, AutoAwesome } from '@mui/icons-material';
import { createDockerDesktopClient } from '@docker/extension-api-client';

import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from "@mui/material";
import TabPanel from './components/TabPanel';

export function App() {
  const ddClient = createDockerDesktopClient();

  return (
    <>

      <AppBar position="relative" elevation={0}>
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center" flexWrap="wrap">
          <img src="https://user-images.githubusercontent.com/1651790/213339618-107d0e59-1b8b-4c89-bbae-5529aa4e2666.svg" alt="NebulaGraph" height="35" />
          <span style={{marginRight: 10}}></span>
          <Typography variant="h4" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
            <b>Nebula</b>Graph
          </Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={() =>
                ddClient.host.openExternal('http://127.0.0.1:17001')
              }
              endIcon={<Insights />}
            >
              Studio in Browser
            </Button>
          </Box>

          <span style={{marginRight: 10}}></span>

          <Box>
            <Button
              variant="outlined"
              onClick={() =>
                ddClient.host.openExternal('http://127.0.0.1:17002/?lang=EN_US')
              }
              endIcon={<Explore />}
            >
              Legacy Studio
            </Button>
          </Box>

          <span style={{marginRight: 10}}></span>

          <Box>
            <Button
              variant="outlined"
              onClick={() =>
                ddClient.host.openExternal('http://127.0.0.1:17005')
              }
              endIcon={<AutoAwesome />}
            >
              Gephi-Lite
            </Button>
          </Box>

          <span style={{marginRight: 10}}></span>

          <Box>
            <Button
              variant="outlined"
              onClick={() =>
                ddClient.host.openExternal('http://127.0.0.1:8376')
              }
              endIcon={<KeyboardArrowRight />}
            >
              Console
            </Button>
          </Box>

        </Box>
        <Box>
          <a
            href="#"
            onClick={() =>
              ddClient.host.openExternal('https://github.com/vesoft-inc/nebula')
            }
          >
            <img src="https://shields.io/github/stars/vesoft-inc/nebula?style=social" alt=""/>
          </a>
        </Box>


      </Toolbar>
    </AppBar>

    <TabPanel/>

    {/* footer */}
    <Box sx={{ alignItems: 'left', flexDirection: 'column', height: 20, fontSize: 10, justifyContent: 'center'}}>
      <Typography variant="body2" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
      <span style={{marginRight: 10}}></span>
        NebulaGraph for Docker Desktop Extension 0.4.13, NebulaGraph: v3.6.0, NebulaGraph Studio: v3.7.0
      </Typography>
    </Box>

    </>
  );
}
