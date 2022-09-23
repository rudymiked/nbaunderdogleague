import { HttpService } from "../Http/HttpService";

const GetStandingsData = () => {
    const httpService = HttpService();

    return httpService.getExternal({
        url: "https://data.nba.net/prod/v1/current/standings_all.json",
        token: null,
        params: {}
    });
}

export default GetStandingsData;