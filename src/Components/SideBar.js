import React from 'react'
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FaceIcon from '@mui/icons-material/Face';
import QuizIcon from '@mui/icons-material/Quiz';

const drawerWidth = 240

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
                <List>
					<ListItem button>
						<ListItemIcon>
							<FaceIcon/>
						</ListItemIcon>
						<ListItemText>Poets</ListItemText>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<QuizIcon/>
						</ListItemIcon>
						<ListItemText>Quiz</ListItemText>
					</ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default SideBar
