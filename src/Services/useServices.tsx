import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export interface UseServices{
    readonly getPackages: () => AxiosResponse<any>;
    readonly postPackage: (packageTitle: string,courierName: string) => void;
    readonly deletePackage: (packageId: number) => void;
    readonly useQuery: () => URLSearchParams;
    readonly getCouriers: (func: any,createOptions:any) => AxiosResponse<any>;
    readonly editPackage: (username: string, password: string, latitude: number, longitude: number ,goodfunc: any, badfunc: any) => void;
    readonly login: (username: string, password: string,goodfunc: any, badfunc: any) => void;
    prevState: null;
}



const base = "http://cd115fabfecd.ngrok.io/"
// const base = "http://localhost:3000/";
const packagesURL = base + "packages";
const couriersURL = base + "couriers";
const editPackagesURL = base + "editpackages";
const loginURL = base + "login";


const headers = {
  'Content-Type': 'text/plain'
};

const hdr = {
  headers: {"Access-Control-Allow-Origin": "*"}
}


export const useServices = () => {
    var resp: any;

    const history = useHistory();


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
        axios.post(packagesURL, null,  {
          params: {
            "title": packageTitle,
            "cid": courierID,
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

      const requestOptions = {
        method: 'DELETE'
      };

      fetch(packagesURL + "/"+ packageId, requestOptions).then((response) => {
        return response.json();
      }).then((response) => {
          console.log(response);
          goodfunc();
          refreshListFunc();
        }, (error) => {
          console.log(error);
          badfunc();
        });
      
    }





    async function editPackage(packageId: number, packageTitle:string, courierID: number,email: string,goodfunc: any, badfunc:any){
      // sa fie metoda post la /editpackages
      // 

      //query params
      // id: unIdPacket care il dau de la ListItem
      // "title": packageTitle,
      //       "cid": courierID,
      //       "email": email,
      //       "state": "pending"
      axios.post(editPackagesURL, null,  {
        params: {
          "id": packageId,
          "title": packageTitle,
          "cid": courierID,
          "email": email,
          "state": "pending"
        }})
        .then((response) => {
          console.log(response);
          goodfunc();
        }, (error) => {
          console.log(error);
          badfunc();
        });
    }

    async function login(username: string, password: string, latitude: number, longitude: number ,goodfunc: any, badfunc: any, loginfunc: any){
      console.log(latitude +    "    " + longitude)
      // localStorage.setItem('User', "loggedin");
      
      axios.post(loginURL, null,  {
        params: {
          "username": username,
          "password": password,
          "latitude": latitude,
          "longitude": longitude

        }})
        .then((response) => {
          console.log(response);
          let result = response.data;
          if(result.status === "failure"){
            badfunc();
          }else{
            goodfunc();
            localStorage.setItem('User', "loggedin");
            loginfunc();
            history.push("/");
          }
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
        editPackage,
        useQuery,
        getCouriers,
        login
    };
}

export default useServices;