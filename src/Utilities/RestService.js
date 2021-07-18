import axios from "axios";

const storiesPerPage = 10;
const lastPage = 500 / storiesPerPage;

export const getTopStoryIds = async () => {

    const response = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const ids = await response.data;

    return ids;
}

export const getStories = async (ids, pageNumber) => {

    const startId = pageNumber * storiesPerPage;
    const endId = pageNumber * storiesPerPage + storiesPerPage;

    const pageIds = ids.slice(startId, endId)

    const stories = pageIds.map((id) => {
        return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    });

    return stories;
}