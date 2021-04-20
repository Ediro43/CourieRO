import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

export interface UseServices{
    readonly getPackages: () => AxiosResponse<any>;
    readonly postPackage: (packageTitle: string,courierName: string) => void;
    readonly deletePackage: (packageId: number) => void;
    readonly useQuery: () => URLSearchParams;
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

    async function postPackage(packageTitle: string,courierName: string,goodfunc: any,noparamsfunc:any, badfunc: any){
      if(packageTitle !== "" && courierName !== ""){
        axios.post(baseURL+"/", {
            "courier_name": courierName,
            "packageTitle": packageTitle,
            "courier-id": "aaddds09"
          })
          .then((response) => {
            console.log(response);
            goodfunc();
          }, (error) => {
            console.log(error);
            badfunc();
          });
        }
      else{
        noparamsfunc();
      }
    }

    async function deletePackage(packageId: number, refreshListFunc: any, goodfunc: any, badfunc: any){
        axios.delete(
          baseURL + "/" + packageId
        )
        .then((response) => {
          console.log(response);
          goodfunc();
          refreshListFunc();
        }, (error) => {
          console.log(error);
          badfunc();
        });
      
    }

    function useQuery() {
      return new URLSearchParams(useLocation().search);
    }

    return {
        getPackages,
        postPackage,
        deletePackage,
        useQuery
    };
}

export default useServices;