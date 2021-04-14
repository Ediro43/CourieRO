import axios, { AxiosResponse } from 'axios';
import React from 'react';

export interface UseServices{
    readonly getPackages: () => AxiosResponse<any>;
    readonly postPackage: (packageTitle: string,courierName: string) => void;
    prevState: null;
}

const baseURL = "http://localhost:3000/packages";

export const useServices = () => {
    var resp: any;
    async function getPackages(func: any){
        let rzt = axios.get(baseURL)
            .then(res => {
                resp = res.data;
                console.log(resp)
                func(resp)
        })
      console.log("resp first")
      return rzt;
    }

    async function postPackage(packageTitle: string,courierName: string){
        axios.post(baseURL+"/", {
            "courier_name": courierName,
            "packageTitle": packageTitle,
            "courier-id": "aaddds09"
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    }

    return {
        getPackages,
        postPackage,
    };
}

export default useServices;