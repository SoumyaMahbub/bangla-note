import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FaceIcon from "@mui/icons-material/Face";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from '@mui/icons-material/Add';
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { BrowserRouter as Router, Link } from "react-router-dom";

const drawerWidth = 240;

const SideBar = () => {
    return (
        <div>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar/>
                <Divider/>
                <List>
                    <Link to="/authors">
                        <ListItem button>
                            <ListItemIcon>
                                <FaceIcon />
                            </ListItemIcon>
                            <ListItemText>লেখকসমূহ</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/quiz">
                        <ListItem button>
                            <ListItemIcon>
                                <QuizIcon />
                            </ListItemIcon>
                            <ListItemText>কুইজ</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/add-poet">
                        <ListItem button>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText>নতুন লেখক</ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
};

export default SideBar;
