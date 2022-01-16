import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ServerListItem from "./ServerListItem";
import NewServerDialog from "./NewServerDialog";
import { useServerListStyles } from "../styles/useServerListStyles";
const mockState = [
  {
    id: 1,
    title: "Apex",
    owner: 1,
    image:
      "https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86",
  },
  {
    id: 2,
    title: "Val",
    owner: 3,
    image:
      "https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86",
  },
];

export default function ServerList({
  socket,
  user,
  children,
  servers,
  setServer,
}) {
  const classes = useServerListStyles();
  const [state, setState] = useState(mockState);
  // const [servers, setServers] = useState({});

  // const getServers = (state) => {
  //   let arr = [];
  //   for (const server in state.servers) {
  //     arr.push(state.servers[server]);
  //   }
  //   return arr;
  // };

  // api call to get servers
  // const gettingServers = () => {
  //   axios.get("/api/servers").then((res) => {
  //     if (res.status === 200) {
  //       setServers(res.data);
  //     }
  //   });
  // };

  // rn this is set to run everytime the page loads but may have to set a dependency
  // useEffect(() => {
  //   gettingServers();
  // }, []);

  const broadcastMessage = (msg) => {
    // socket.emit("broadcast", msg);
    // sendMessage(msg)
  };
  // mock servers
  // const serversEx = getServers(state);

  servers = mockState;
  const parsedServers = servers.map((serverObj) => {
    return (
      <ServerListItem
        key={serverObj.id}
        server={1}
        id={serverObj.id}
        title={serverObj.title}
        image={serverObj.image}
      />
    );
  });

  // experimenting adding server
  const addServer = (title) => {
    console.log(parsedServers);
    let image =
      "https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86";
    setState((prev) => {
      const id = Math.random() * 100;
      return {
        ...prev,
        servers: {
          ...prev.servers,
          [id]: { title, image, id },
        },
      };
    });
  };

  const handleHomeClick = (socket) => {
    socket.emit("home click", socket.id, user.display_name);
  };

  useEffect(() => {
    socket?.emit("connection", socket.id, user.display_name);
  }, []);

  // rendered Components

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <Drawer className={classes.serverList} variant="permanent" anchor="left">
        <IconButton title="Home" onClick={() => handleHomeClick(socket)}>
          <img alt="Home" src="/images/Disnode-red.png" width="70px" />
        </IconButton>
        <Divider className={classes.divider} />
        <Box ml={"auto"} mr={"auto"}>
          <List>{parsedServers}</List>
        </Box>
        <Divider />
        <Box ml={"auto"} mr={"auto"}>
          <NewServerDialog onClick={addServer} />
        </Box>
      </Drawer>
      {children}
    </Box>
  );
}
