import React from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PersonIcon from '@material-ui/icons/Person';
import { UnixToYYYYMMdd } from '../Utilities/TimeHelper';

export default function StoryCard(props) {

    if (!props.story) return null;

    let postTime = UnixToYYYYMMdd(props.story.time);
    let storyUrl = '#'

    if (props.story.url) {
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
                <a href={"/item?id=" + props.story.id}>
                    {props.story.descendants}<ChatBubbleOutlineIcon fontSize="small" />
                </a>
            </TableCell>
            <TableCell align="right">
                <a href={"/user?id=" + props.story.by}>
                    {props.story.by} <PersonIcon fontSize="small" />
                </a>
            </TableCell>
            <TableCell align="right">{postTime}</TableCell>
        </TableRow>
    );
}