//array has millions of record
//for each element, make an API call, return the result, log the result


const makeAPICalls = async () => {
    const MAX = 100;

    const ARRAY = [];
    const batch = [];

    while(ARRAY.length) {
        const a = ARRAY.pop();
        batch.push(fetch(`${base_url}/id=${a}`));

        if(batch.length >= MAX) {
            const res = await Promise.all(batch);
            console.log(res.map(r => r.json()));
        }
    }
}