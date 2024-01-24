import axios from "axios";

export async function PreLogin1(urlBase: string) {

    const url = "http://" + urlBase + "/PreLogin1";
    const host = urlBase;
    // if (mode == 0) {
    //     url = "http://localhost:7001/PreLogin1";
    //     host = "localhost:7001";
    // } else if (mode == 1) {
    //     url = "http://133.0.109.189:29964/PreLogin1";
    //     host = "133.0.109.189:29964";
    // }

    var config = {
        method: "post",
        url: url,
        //url: url2,
        headers: {
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            "Content-Type": "application/json",
            Accept: "*/*",
            Host: host,
            Connection: "keep-alive",
        },
        data: "",
    };

    return axios(config);
}
