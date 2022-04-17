import cacheData from "memory-cache";

export async function getNotenApiData(session) {
    const url = 'https://grade-scraper.herokuapp.com/getGrades'
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else {
        const hours = 24;
        let body = JSON.stringify({
            username: session.username,
            password: session.password
        })
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            });
            const data = await res.json()
            cacheData.put(url, data, hours * 1000 * 60 * 60);
            return data;
        } catch (err) {
            console.log(err);
        }
    }
}