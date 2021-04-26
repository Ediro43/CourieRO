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

// const packagesURL = "http://localhost:3000/packages";
// const base = "http://aa7212262192.ngrok.io/"
const base = "http://localhost:3000/";
const packagesURL = base + "packages";
const couriersURL = base + "couriers";

const headers = {
  'Content-Type': 'text/plain'
};

const hdr = {
  headers: {"Access-Control-Allow-Origin": "*"}
}


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

    async function postPackage(packageTitle: string,courierID: number,email: string,goodfunc: any,noparamsfunc:any, badfunc: any){
      if(packageTitle !== "" && courierID !== -1){
        axios.post(packagesURL, null,  {params: {
            "cid": courierID,
            "title": packageTitle,
            "email": email,
            "state": "pending"
          }})
          .then((response) => {
            console.log(response);
            goodfunc();
          }, (error) => {
            console.log(error);
            badfunc();
          });}
      //   const requestOptions = {
      //     mode: 'no-cors',
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(
      //       {
      //             "cid": 1,
      //             "title": "hardcoded title",
      //             "email": "e@yahoo.com",
      //             "state": "pending"
      //           }
      //       )
      // };
      // fetch(packagesURL, {
      //       mode: 'no-cors',
      //       method: "post",
      //       headers: {
      //            "Content-Type": "application/json"
      //       },
      //       body: JSON.stringify(
      //         {
      //           "id": 25,
      //           "cid": 1,
      //           "title": "hardcoded title",
      //           "email": "e@yahoo.com",
      //           "state": "pending"
      //         }
      //       )
      //     })}
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