export const loadState = () => {
    try {
        const store = localStorage.getItem('state');
        if (store === null) {
            return undefined;
        }
        return JSON.parse(store);
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const store = JSON.stringify(state);
        localStorage.setItem('state', store)
    } catch (err) {
        // console.log("err", err)
    }

}