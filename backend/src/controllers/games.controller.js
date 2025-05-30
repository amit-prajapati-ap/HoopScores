import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import axios from 'axios'

const fetchGames = async (req, res) => {
    try {
        const API_KEY = process.env.BASKETBALL_API_KEY

        const games = await axios.get('https://v1.basketball.api-sports.io/games', {
            params: {
                league: 12,
                season: '2022-2023',
                timezone: 'Asia/Kolkata'
            },
            headers: {
                'X-RapidAPI-Key': API_KEY
            }
        });

        if (!games || !games.data || !games.data.response) {
            return res.status(400).json(new ApiError(400, "No Upcoming Matches"))
        }

        res.status(200).json(new ApiResponse(200, games.data.response, "Matches Fetched Successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(500, "Server error occured while fetching the matches", error))
    }
}

export { fetchGames }