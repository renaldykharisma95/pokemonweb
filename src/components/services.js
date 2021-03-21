import BaseService from "../resources/base-services/BaseService";
import axiosInstance from "../resources/base-services/BaseConnection";

export default class Services extends BaseService{

    async GetPokemonList(page, offset){
        return await this.get(`${axiosInstance.defaults.baseURL}/pokemon?limit=${page}&offset=${offset}`);
    }

    async GetPokemonCriteria(url){
        return await this.get(`${url}`);
    }

}