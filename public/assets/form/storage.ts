export default class Ls {
    static save(key: keyof CvType, value: ExperiencesType[] | HeaderType | CompetencesType | FormationsType[]) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static load(key: keyof CvType, fallback: string = "{}") {
        return JSON.parse(localStorage.getItem(key) || fallback);
    }
}
