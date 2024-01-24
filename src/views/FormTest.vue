<template>
    <div>
        <input type="file" @change="getFile($event, 'file_thumb')">
        <button @click="submitForm($event)">Submit</button>
    </div>
    <div class="mt-4">
        <div class="row">
            <div class="col-6 wrap">{{ fileString }}</div>
            <div class="col-6 wrap">{{ body }}</div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { EncryptAES } from '@/services/CryptoService.js';

const fileString = ref("");
const body = ref("");

let fileBuffer;

const accessId = "c8bef148-9dbd-40ee-84a7-71dcdf418a57";
const accessToken = "30098290-0a51-45ff-aad1-1bf92c3507c3";

function getFile(event, input_file_name) {
    const file = event.target.files[0]
    GetFileBase64(file).then(result => {
        fileString.value = result;
    }).catch(error => {
        console.log(error);
    });
};
function submitForm(event) {
    const content = createContent(fileString.value);
    const encryptedContent = EncryptAES(
        JSON.stringify(content),
        accessToken
    );
    const newBodyRaw = {
        accessId: accessId,
        content: encryptedContent,
    };
    body.value = newBodyRaw;

    const newBody = {
        mode: "raw",    
        raw: JSON.stringify(newBodyRaw),
        generateMode: "normal",
        type: "application/json"
    }

    var config = {
        method: 'post',
        url: 'http://192.168.40.189:6000/External',
        headers: { 
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
            'Content-Type': 'application/json', 
            'Accept': '*/*', 
            'Host': '192.168.40.189:6000', 
            'Connection': 'keep-alive'
        },
        data : newBodyRaw
        };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}


function GetFileBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = error => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

function createContent(fileString) {
    const form = {
        fileString: fileString
    }
    let data = form;

    let httpMethod = "POST";
    const timeStamp = Math.floor(new Date().getTime() / 1000) + getRandomCharacter("lower", 4);

    return {
        method: "ImportUserAndTag",
        httpMethod: httpMethod,
        data: data,
        timeStamp: timeStamp
    };
}


function getRandomCharacter(type, length = 1) {
    var character = "";
    if (type === "lower") {
        for (let i = 0; i < length; i++) {
            character += String.fromCharCode(
                Math.floor(Math.random() * 26) + "a".charCodeAt(0)
            );
        }
    }
    if (type === "upper") {
        for (let i = 0; i < length; i++) {
            character += String.fromCharCode(
                Math.floor(Math.random() * 26) + "A".charCodeAt(0)
            );
        }
    }
    return character;
}


</script>
<style scoped>

</style>
