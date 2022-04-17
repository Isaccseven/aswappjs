import cacheData from "memory-cache";

export async function getStundenplanApiData() {
    const url = 'https://getcalendarapidata.herokuapp.com/getCalendarData'
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else {
        const hours = 24;
        try {
            const res = await fetch(url, {
                method: 'GET',
            });
            const data = await res.json();
            cacheData.put(url, data, hours * 1000 * 60 * 60);
            return data
        } catch (err) {
            console.log(err);
        }
    }
}