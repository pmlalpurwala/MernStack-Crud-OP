const base_url = "https://api.rawg.io/api/"

//7630710d82b14431b48a4703e5d73d3f
// Getting the dates
const getCurrentMonth = () => {
    const month = new Date().getMonth() + 1;
    if (month < 10) {
        // console.log(month);
        return `0${month}`;
    }
    else {
        // console.log(month);
        return month;
    }
}

const getCurrentDate = () => {
    const day = new Date().getDate();
    if (day < 10) {
        // console.log(day);
        return `0${day}`;
    }
    else {
        // console.log(day);
        return day;
    }
};

//Current day/month/year
const currentYear = new Date().getFullYear();
// console.log(currentYear);

const currentMonth = getCurrentMonth();
const currentDay = getCurrentDate();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
// console.log(currentDate);
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const popular_games = `games?key=7630710d82b14431b48a4703e5d73d3f&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`
const upcoming_games = `games?key=7630710d82b14431b48a4703e5d73d3f&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`
const new_games = `games?key=7630710d82b14431b48a4703e5d73d3f&dates=${lastYear},${currentDate}&ordering=-release&page_size=10`
export const popularGamesURL = () => `${base_url}${popular_games}`
// console.log(popularGamesURL())
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`
//console.log(upcomingGamesURL())
export const newGamesURL = () => `${base_url}${new_games}`;

//Game Details
export const gameDetailsURL = (game_id) => `${base_url}games/${game_id}?key=7630710d82b14431b48a4703e5d73d3f`

//GANE SCREENSHOT
export const gameScreenshotURL = (game_id) => `${base_url}games/${game_id}/screenshots?key=7630710d82b14431b48a4703e5d73d3f`

//SEARCHED A GAME
export const searchGameURL = (game_name) => `${base_url}games?key=7630710d82b14431b48a4703e5d73d3f&search=${game_name}&page_size=10`;