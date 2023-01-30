import * as React from 'react';
import {
  Box,
  Button,
  Fab,
  Grid,
  Popper,
  List,
  ListItem,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Help, Insights, Refresh } from '@mui/icons-material';
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
  const ddClient = createDockerDesktopClient();
  const openExternalUrl = (url: string) => {
    ddClient.host.openExternal(url);
  };
  return (
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Box mb={3}>
              <a href="#"
                onClick={() => openExternalUrl("https://stackoverflow.com/questions/tagged/nebula-graph")}
              >
                <img src="https://img.shields.io/badge/Stack%20Overflow-nebula--graph-orange?style=for-the-badge&amp;logo=stack-overflow&amp;logoColor=white" alt="Stack Overflow"/>
              </a>
              <span style={{marginRight: 10}}></span>
              <a href="#"
                onClick={() => openExternalUrl("https://github.com/vesoft-inc/nebula/discussions")}
              >
                <img src="https://img.shields.io/badge/GitHub_Discussion-000000?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="Discussions"/>
              </a>
              <span style={{marginRight: 10}}></span>
              <a href="#"
                onClick={() => openExternalUrl("https://community-chat.nebula-graph.io/")}
              >
                <img src="https://img.shields.io/badge/Community%20Chat-9F2B68?style=for-the-badge&amp;logo=slack&amp;logoColor=white" alt="Chat History"/>
              </a>
          </Box>
          <Box mb={3}>
              <Typography variant="body1">
                <strong>NebulaGraph</strong> is a popular open-source graph database that can handle large volumes of data with milliseconds of latency, scale up quickly, and have the ability to perform fast graph analytics. NebulaGraph has been widely used for social media, recommendation systems, knowledge graphs, security, capital flows, AI, etc.
                See <a href="#" onClick={() => openExternalUrl("https://nebula-graph.io/cases")}>NebulaGraph users</a>
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
              Learn more on <a href="#" onClick={() => openExternalUrl("https://nebula-graph.io/")}>nebula-graph.io</a>
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

  const openExternalUrl = (url: string) => {
    ddClient.host.openExternal(url);
  };

  // get started stepper tab start
  const steps = [
    'Login',
    'Activate StorageD',
    'Load Dataset',
    'Query NebulaGraph',
    'Explore More from Docs and Community',
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // get started stepper tab end

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
          <Tab label="Get Started" {...a11yProps(2)} />
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
        <b>- Empty?</b> By default we cannot see Docker Desktop extension spawned containers, see <a href="#" onClick={() => openExternalUrl("https://docs.docker.com/desktop/extensions-sdk/dev/test-debug/#show-the-extension-containers")}>docs</a> on how to change the setting.
        </Box>

        <Box sx={{ alignItems: 'left', flexDirection: 'column'}}>
        <b>- unhealthy</b> for storaged? Follow the <b>Get Started</b> steps for first time run.
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
        {/* Now NebulaGraph Stuio doesn't support being embedded as an iFrame, let's create an quick start instead. */}
        {/* <StudioHelp/> */}
        {/* <iframe src="http://127.0.0.1:7003" width="100%" height="800"/> */}

        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Congrats!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>xxx Step {activeStep + 1}</Typography> */}

            {/* Content of the steps with index */}
            <Box sx={{ alignItems: 'left', flexDirection: 'column'}}>
            {activeStep === 0 && (

              <Typography sx={{ mt: 2, mb: 1 }}>

                <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
                  <b>Step {activeStep + 1}</b> - Login to the Studio.
                </Typography>

                <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
                  <b>First, </b>open the Studio in your browser:
                    <Box>
                    <Button
                      variant="outlined"
                      onClick={() => openExternalUrl("http://127.0.0.1:7001")}
                      endIcon={<Insights />}
                    >
                      Studio in Browser
                    </Button>
                    </Box>
                </Typography>
                <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>

                  <b>Second, </b> fill in access info & credentials, then click <b>Connect</b>:

                  <TableContainer sx={{width: 300}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Field</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Host Address</TableCell>
                          <TableCell>graphd:9669</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>User Name</TableCell>
                          <TableCell>root</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Password</TableCell>
                          <TableCell>nebula</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ mt: 2, mb: 1 }}>

                    <video
                      width="80%"
                      muted
                      controls
                      autoPlay
                    >
                      <source
                        src="https://user-images.githubusercontent.com/1651790/215395891-d5ab4d4c-1135-46fa-a558-6c3434af1c98.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </Box>

                </Typography>

              </Typography>
            )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {
              // isStepOptional(activeStep) &&
              (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}

        {activeStep === 1 && (
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              <b>Step {activeStep + 1}</b> - Activate StorageD instances only for the first time.
            </Typography>

            <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              Go to the NebulaGraph Studio's Console view, and run the following command:
              <Box sx={{ mt: 2, mb: 1 }}>
                <code>
                  <pre>
                    {`ADD HOSTS "storaged0":9779,"storaged1":9779,"storaged2":9779`}
                  </pre>
                </code>
              </Box>

            </Typography>
            <Box sx={{ mt: 2, mb: 1 }}>
              <video
                width="80%"
                muted
                controls
                autoPlay
              >
                <source
                  src="https://user-images.githubusercontent.com/1651790/215395889-b55d66c5-3a39-42f5-b9f6-a6d5cd39d29c.mp4"
                  type="video/mp4"
                />
              </video>
            </Box>

          </Typography>

        )}

        {activeStep === 2 && (
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              <b>Step {activeStep + 1}</b> - Load the initial Dataset.
            </Typography>

            <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              Go to the NebulaGraph Studio's Home view by clicking the logo, and click <b>Download</b> on the dataset you would like to play with:
            </Typography>
            <Box sx={{ mt: 2, mb: 1 }}>
              <video
                width="80%"
                muted
                controls
                autoPlay
              >
                <source
                  src="https://user-images.githubusercontent.com/1651790/215395874-b61c889f-1c0e-4faa-b400-780275b5a3a4.mp4"
                  type="video/mp4"
                />
              </video>
            </Box>

            <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              Wait for its completion, and you are ready to go!
            </Typography>

          </Typography>
        )}

        {activeStep === 3 && (
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              <b>Step {activeStep + 1}</b> - Load the initial Dataset.
            </Typography>

            <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              Go to the NebulaGraph Studio's console view, and run queries like:
              <Box sx={{ mt: 2, mb: 1 }}>
                <code>
                  <pre>
                    {`MATCH ()-[e]->() RETURN e LIMIT 100;`}
                  </pre>
                  <pre>
                    {`MATCH (n) RETURN n LIMIT 100;`}
                  </pre>
                  <pre>
                    {`SHOW TAGS;`}
                  </pre>
                  <pre>
                    {`SHOW EDGES;`}
                  </pre>
                </code>
              </Box>
            </Typography>
            <Box sx={{ mt: 2, mb: 1 }}>
              <video
                width="80%"
                muted
                controls
                autoPlay
              >
                <source
                  src="https://user-images.githubusercontent.com/1651790/215395885-e1438405-6308-4865-a45b-e4f8222d9567.mp4"
                  type="video/mp4"
                />
              </video>
            </Box>

            <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              Wait for its completion, and you are ready to go!
            </Typography>

          </Typography>
        )}

        {activeStep === 4 && (
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Typography variant="h6" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              <b>Step {activeStep + 1}</b> - Congrats!
            </Typography>

            <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              Now you have your initial local NebulaGraph playground!
            </Typography>

            <Typography variant="body1" color={(theme) => theme.palette.text.primary} sx={{ my: 2, mr: 6 }}>
              <List component="div">
                <ListItem>
                Learn more from the docs 📚 <a href="#" onClick={() => openExternalUrl("https://docs.nebula-graph.io")}>docs.nebula-graph.io</a>
                </ListItem>
                <ListItem>
                Join the NebulaGraph Community 🏂 <a href="#" onClick={() => openExternalUrl("https://github.com/vesoft-inc/nebula-community")}>github.com/vesoft-inc/nebula-community</a>
                </ListItem>
                <ListItem>
                Start building your own graph applications!
                </ListItem>
              </List>

            </Typography>

          </Typography>
        )}

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
