import axios from "axios";

export async function GetTOTPBindLinkAsync(account : string){
    var urlBase = "localhost:6030"

    const url = "http://" + urlBase + "/GetTOTPToken";
    const host = urlBase;

    var data = JSON.stringify({
        "account": account
     });

    var config = {
        method: "post",
        url: url,
        headers: {
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            "Content-Type": "application/json",
            Accept: "*/*",
            Host: host,
            Connection: "keep-alive",
        },
        data: data,
    };

    return axios(config);
}

// function base64Encode(input: string) {
//     const formmat = 'base64';

//     const b = new Buffer(input);

//     return b.toString(formmat);
//   }
  