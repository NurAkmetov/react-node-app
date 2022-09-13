import {makeAutoObservable} from "mobx";

class NetworkStore {
    isLoading: boolean;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }
}

export default NetworkStore