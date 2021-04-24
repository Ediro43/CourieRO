import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

export interface UseServices{
    readonly getPackages: () => AxiosResponse<any>;
    readonly postPackage: (packageTitle: string,courierName: string) => void;
    readonly deletePackage: (packageId: number) => void;
    readonly useQuery: () => URLSearchParams;
    readonly getCouriers: (func: any,createOptions:any) => AxiosResponse<any>;
    prevState: null;
}

const packagesURL = "http://localhost:3000/packages";
const couriersURL = "http://localhost:3000/couriers";

export const useServices = () => {
    var resp: any;
    async function getPackages(func: any){
        let rzt = axios.get(packagesURL)
            .then(res => {
                resp = res.data;
                console.log(resp)
                func(resp)
        })
      console.log("resp first")
      return rzt;
    }

    async function postPackage(packageTitle: string,courierID: string,email: string,goodfunc: any,noparamsfunc:any, badfunc: any){
      if(packageTitle !== "" && courierID !== ""){
        axios.post(packagesURL+"/", {
            "courier_id": courierID,
            "packageTitle": packageTitle,
            "email": email
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
          packagesURL + "/" + packageId
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

    function getCouriers(func: any,createOptions:any){
        let rzt = axios.get(couriersURL)
            .then(res => {
              console.log("axios get couriers:"+res.data)
                resp = res.data;
                console.log(resp)
                func(resp);
                createOptions(resp);
        })
      
      return rzt;
    }

    return {
        getPackages,
        postPackage,
        deletePackage,
        useQuery,
        getCouriers,
    };
}

export default useServices;