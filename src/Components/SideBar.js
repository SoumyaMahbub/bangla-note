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
import { Link } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Typography } from "@mui/material";

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
                            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>লেখকসমূহ</Typography>}></ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/questions">
                        <ListItem button>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>প্রশ্নসমূহ</Typography>}></ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/quiz">
                        <ListItem button>
                            <ListItemIcon>
                                <QuizIcon />
                            </ListItemIcon>
                            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>কুইজ</Typography>}></ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/add-author">
                        <ListItem button>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>নতুন লেখক</Typography>}></ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
};

export default SideBar;
