import Axios from 'axios';
import React from 'react';

export default class BaseService extends React.Component{

    async get(urls){
        let result = null;

        await Axios.get(encodeURI(urls))
        .then(response =>{
            let resp = response;
            result = {data: resp.data, status: resp.status}
        }).catch(err=>{
            result = {error: err}
        });
        return result;
    }

    async post(urls, param){
        let result = null

        await Axios.post(encodeURI(urls), param)
        .then(response =>{
            let reponseData = response.data;
            return result = {data: reponseData.data, message: reponseData.message, status: reponseData.status};
        })
        .catch((err) => {
            result = err
        })
        return result;
    }

    async put(urls, param){
        let result = null

        await Axios.put(encodeURI(urls), param)
        .then(response =>{
            return result = {data: response.data, message: response.message, status: response.status};
        })
        .catch((err) => {
            result = err
        })
        return result;
    }

    async delete(urls){
        let result = null

        await Axios.delete(encodeURI(urls))
        .then(response =>{
            let reponseData = response.data;
            return result = {data: reponseData.data, message: reponseData.message, status: reponseData.status};
        })
        .catch((err) => {
            result = err
        })
        return result;
    }
}
