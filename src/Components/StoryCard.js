import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
    root: {
      marginBottom: 3,
      minWidth: 300,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 12,
    },
    host: {
      marginBottom: 1,
      fontSize: 10,
    },
  });

export default function StoryCard(props) {

    if(!props.story) return null;

    let postTime = new Date(props.story.time * 1000).toISOString().slice(0, 10);
    let storyUrl = '#'

    if(props.story.url) {
      storyUrl = new URL(props.story.url);
    }

    return (
        <TableRow>
            <TableCell>
                <ChangeHistoryIcon fontSize="small" />{props.story.score}
            </TableCell>
            <TableCell align="left">
                <Link color="inherit" href={storyUrl} target="_blank">{props.story.title}</Link>
            </TableCell>
            <TableCell align="left">
                <Link color="inherit" href={"https://" + storyUrl.hostname} target="_blank">{storyUrl.hostname}</Link>
            </TableCell>
            <TableCell align="right">
                {props.story.descendants}<ChatBubbleOutlineIcon fontSize="small" />
            </TableCell>
            <TableCell align="right">
                {props.story.by} <PersonIcon fontSize="small" />
            </TableCell>
            <TableCell align="right">{postTime}</TableCell>
        </TableRow>
    );
}