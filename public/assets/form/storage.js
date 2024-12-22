export default class Ls {
    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static load(key, fallback = "{}") {
        return JSON.parse(localStorage.getItem(key) || fallback);
    }
}
