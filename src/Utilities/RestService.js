import axios from "axios";

const storiesPerPage = 10;
const lastPage = 500 / storiesPerPage;

export const getStories = async (pageNumber) => {

    const startId = pageNumber * storiesPerPage;
    const endId = pageNumber * storiesPerPage + storiesPerPage;
    const stories = [];

    const getPageIds = await getTopStoryIds();;
    const pageIds = getPageIds.slice(startId, endId)

    for (let i = 0; i < pageIds.length; i++) {
        let response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${pageIds[i]}.json`);
        let story = await response.data;

        stories.push(story);
    }

    return stories;
}

export const getTopStoryIds = async () => {

    const response = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const ids = await response.data;

    return ids;
}

export const getUserInfo = async (userName) => {

    const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/user/${userName}.json?print=pretty`
    );

    const userData = await response.data;

    return userData;
}

export const getSingleItem = async (id) => {
    const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );

    const item = await response.data;

    return item;
}

export const getComments = async (ids) => {
    const comments = [];
    console.log(ids);
    for (let i = 0; i < ids.length; i++) {
        let response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json?print=pretty`);
        let comment = await response.data;

        comments.push(comment);
    }

    return comments;
}