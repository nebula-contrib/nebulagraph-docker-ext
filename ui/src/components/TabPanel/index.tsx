import * as React from 'react';
import {
  Box,
  Fab,
  Grid,
  Link,
  Popper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Help, Refresh } from '@mui/icons-material';
import { createDockerDesktopClient } from '@docker/extension-api-client';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  top: 160,
  right: 56,
};

function StudioHelp() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box sx={{ alignItems: 'left', flexDirection: 'column'}}>

      <Fab sx={fabStyle} onClick={handleClick}>
            <Help />
      </Fab>

      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'primary.main', borderRadius: 1 }}>

        <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 2 }}>
          Login Credential
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Graph Address</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>graphd:9669</TableCell>
                <TableCell>root</TableCell>
                <TableCell>nebula</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
          First time deployment
        </Typography>
        <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
          Run this admin query in console to make storage online.
        </Typography>

        <Typography variant="body2" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
          ADD HOSTS "storaged0":9779,"storaged1":9779,"storaged2":9779
        </Typography>

        </Box>
      </Popper>

    </Box>
  );
}

function homePage() {
  return (
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Box mb={3}>
          <a href="https://stackoverflow.com/questions/tagged/nebula-graph">
                <img src="https://img.shields.io/badge/Stack%20Overflow-nebula--graph-orange?style=for-the-badge&amp;logo=stack-overflow&amp;logoColor=white" alt="Stack Overflow"/>
              </a>
              <span style={{marginRight: 10}}></span>
              <a href="https://github.com/vesoft-inc/nebula/discussions">
                <img src="https://img.shields.io/badge/GitHub_Discussion-000000?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="Discussions"/>
              </a>
              <span style={{marginRight: 10}}></span>
              <a href="https://community-chat.nebula-graph.io/">
                <img src="https://img.shields.io/badge/Community%20Chat-9F2B68?style=for-the-badge&amp;logo=slack&amp;logoColor=white" alt="Chat History"/>
              </a>
          </Box>
          <Box mb={3}>
              <Typography variant="body1">
                <strong>NebulaGraph</strong> is a popular open-source graph database that can handle large volumes of data with milliseconds of latency, scale up quickly, and have the ability to perform fast graph analytics. NebulaGraph has been widely used for social media, recommendation systems, knowledge graphs, security, capital flows, AI, etc. See <Link href="https://nebula-graph.io/cases" target="_blank">NebulaGraph users</Link>.
              </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              NebulaGraph is:
            </Typography>
            <Typography variant="body1">
            <ul>
              <li>Distributed</li>
              <li>Storage and Computation separation</li>
              <li>Horizontal scalability</li>
              <li>Strong data consistency by RAFT protocol</li>
              <li>OpenCypher-compatible query language</li>
            </ul>
            </Typography>

          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Architecture:
            </Typography>
            <img src="https://camo.githubusercontent.com/3cfabc21c71f25eda8c748e0dfb9f2faba385664edcfb491f99ebfa24c3ca362/68747470733a2f2f646f63732d63646e2e6e6562756c612d67726170682e636f6d2e636e2f666967757265732f6e6562756c612d67726170682d6172636869746563747572655f332e706e67" alt="NebulaGraph Architecture" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={3}>
            <Typography variant="body2">
              Learn more on <Link href="https://nebula-graph.io/" target="_blank">nebula-graph.io</Link>.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>

        </Grid>
      </Grid>
  );
}


export default function NebulaGraphTabs() {
  const ddClient = createDockerDesktopClient();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [coreContainers, setCoreContainers] = React.useState<any[]>([]);
  const [utilsContainers, setUtilsContainers] = React.useState<any[]>([]);


  const fetchContainerList = async () => {
    ddClient.docker.cli.exec('ps', ['--all', '--format', '"{{json .}}"', '--filter', 'label=com.vesoft.scope=core']).then((result) => {
      setCoreContainers(result.parseJsonLines());
    });
    ddClient.docker.cli.exec('ps', ['--all', '--format', '"{{json .}}"', '--filter', 'label=com.vesoft.scope=utils']).then((result) => {
      setUtilsContainers(result.parseJsonLines());
    });

    setTimeout(fetchContainerList, 60000);
  };
  
  React.useEffect(() => {
    fetchContainerList();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Resources" {...a11yProps(1)} />
          <Tab label="Studio Playground" {...a11yProps(2)} />
          <Tab label="Docs" {...a11yProps(3)} />
          {/* <Tab label="Utils" {...a11yProps(4)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {homePage()}
      </TabPanel>

      <TabPanel value={value} index={1}>

        <Fab sx={fabStyle} onClick={fetchContainerList}>
              <Refresh />
        </Fab>
        <Box sx={{ alignItems: 'left', flexDirection: 'column'}}>
          <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
            NebulaGraph Core Resources
          </Typography>
        </Box>

        <Box sx={{ alignItems: 'left', flexDirection: 'column'}}>
        <b>- Empty?</b> By default we cannot see Docker Desktop extension spawned containers, see <a href="https://docs.docker.com/desktop/extensions-sdk/dev/test-debug/#show-the-extension-containers">docs</a> on how to change the setting.
        </Box>

        <Box sx={{ alignItems: 'left', flexDirection: 'column'}}>
        <b>- unhealthy</b> for storaged? Follow the help step in Studio Playground for first time run.
        </Box>

        <TableContainer sx={{mt:-1}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Container id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coreContainers.map((container) => (
                <TableRow
                  key={container.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{container.ID}</TableCell>
                  <TableCell>{container.Image}</TableCell>
                  <TableCell>{container.CreatedAt}</TableCell>
                  <TableCell>{container.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ alignItems: 'left', flexDirection: 'column'}}>
        <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
          NebulaGraph Utils Resources
        </Typography>
      </Box>

        <TableContainer sx={{mt:-1}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Container id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {utilsContainers.map((container) => (
                <TableRow
                  key={container.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{container.ID}</TableCell>
                  <TableCell>{container.Image}</TableCell>
                  <TableCell>{container.CreatedAt}</TableCell>
                  <TableCell>{container.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </TabPanel>

      <TabPanel value={value} index={2}>
        <StudioHelp/>
        <iframe src="http://127.0.0.1:7001" width="100%" height="800"/>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <iframe src="https://docs.nebula-graph.io/" width="100%" height="800"/>
      </TabPanel>

      {/* <TabPanel value={value} index={4}>
        TBD
      </TabPanel> */}
    </Box>
  );
}
