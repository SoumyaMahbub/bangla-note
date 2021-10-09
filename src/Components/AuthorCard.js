import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const AuthorCard = (props) => {
    return (
        <Grid item>    
            <Link to={`/authors/${props.authorId}`}>
                <Card sx={{maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="300"
                            image={props.imageUrl}
                            alt={props.authorName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.pseudonym != "" ? props.authorName + " (" + props.pseudonym + ")": props.authorName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">{props.lifespan}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    )
}

export default AuthorCard
