import CryptoJS from "crypto-js";
//util.js
//获取当前utc时间戳
function GetUTCDate() {
    let d1 = new Date();
    let d2 = new Date(
        d1.getUTCFullYear(),
        d1.getUTCMonth(),
        d1.getUTCDate(),
        d1.getUTCHours(),
        d1.getUTCMinutes(),
        d1.getUTCSeconds()
    );
    return d2;
}

export function EncryptAES(content, key) {

    key = key.replace(/-/g, "");
    const gbKey = CryptoJS.enc.Utf8.parse(key.substr(0, 16));
    // 将内容转换为字节数组
    const plainBytes = CryptoJS.enc.Utf8.parse(content);
    // 创建AES加密器
    const aesEncryptor = CryptoJS.AES.encrypt(plainBytes, gbKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    // 获取加密后的字节数组并转换为Base64字符串
    const encryptedText = aesEncryptor.toString();
    return encryptedText;
}

export async function GenerateAesKey() {
    console.log("GenerateAesKey_1()");
    const date = new Date();
    //const date = GetUTCDate();

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const input = date.getFullYear().toString() + "SdWA!sh92@c" + month + day + hours; //SdWA!sh92@c 为一段固定的密钥

    const textEncoder = new TextEncoder();
    const utf8Bytes = textEncoder.encode(input);

    const hashBuffer = await crypto.subtle.digest("SHA-256", utf8Bytes);
    // 将 ArrayBuffer 的内容复制到 Uint8Array
    const originalArray = new Uint8Array(hashBuffer);
    // 创建一个新的 Uint8Array 来存储反转后的数据
    const reversedArray = new Uint8Array(originalArray.length);
    // 反转 Uint8Array 的内容
    for (let i = 0; i < originalArray.length; i++) {
        reversedArray[i] = originalArray[originalArray.length - 1 - i];
    }
    console.log(reversedArray);
    // 将反转后的 Uint8Array 转换回 ArrayBuffer
    const reversedBuffer = reversedArray.buffer;
    const aesKeyBuffer = reversedBuffer.slice(0, 16);
    const aesKeyBase64 = btoa(
        String.fromCharCode(...new Uint8Array(aesKeyBuffer))
    );
    // console.log(aesKeyBase64, new Buffer(String.fromCharCode(...new Uint8Array(aesKeyBuffer))).toString('base64'), String.fromCharCode(...new Uint8Array(aesKeyBuffer)));
    return { aesKeyBase64, input };
}

export function GenerateAesKey2() {
    //const crypto = require("crypto");
    console.log("GenerateAesKey_2()");
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);
    const hours = date.getHours().toString().padStart(2, 0);
    const input = date.getFullYear().toString() + "SdWA!sh92@c" + month + day + hours;

    const utf8Bytes = CryptoJS.enc.Utf8.parse(input); 
    const hashBuffer = CryptoJS.SHA256(utf8Bytes);

    const originalArray = ConvertWordArrayToUint8Array(hashBuffer);
    //const originalArray = new Uint8Array(hashBytes);
    // 创建一个新的 Uint8Array 来存储反转后的数据
    const reversedArray = new Uint8Array(originalArray.length);
    //console.log(reversedArray);
    // 反转 Uint8Array 的内容
    for (let i = 0; i < originalArray.length; i++) {
        reversedArray[i] = originalArray[originalArray.length - 1 - i];
    }
    console.log(reversedArray);
    // 将反转后的 Uint8Array 转换回 ArrayBuffer
    const reversedBuffer = reversedArray.buffer;
    const aesKeyBuffer = reversedBuffer.slice(0, 16);
    const aesKeyBase64 = btoa(
        String.fromCharCode(...new Uint8Array(aesKeyBuffer))
    );
    // console.log(aesKeyBase64, new Buffer(String.fromCharCode(...new Uint8Array(aesKeyBuffer))).toString('base64'), String.fromCharCode(...new Uint8Array(aesKeyBuffer)));
    return aesKeyBase64;
}

function generateRSAKeys() {
    // 生成RSA密钥对
    const rsa = new JSEncrypt();
    const keypair = rsa.getKey();
    // 获取公钥和私钥
    let publicKey = keypair.getPublicKey();
    let privateKey = keypair.getPrivateKey();
    publicKey = publicKey.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "")
    privateKey = privateKey.replace("-----BEGIN RSA PRIVATE KEY-----", "").replace("-----END RSA PRIVATE KEY-----", "")
    return { publicKey, privateKey }
}

export function DecryptAes(content, key) {
    key = key.replace(/-/g, "");

    const gbKey = CryptoJS.enc.Utf8.parse(key.substr(0, 16));
    // 将Base64字符串转换为字节数组
    const ciphertext = CryptoJS.enc.Base64.parse(content);
    // 创建AES解密器
    const aesDecryptor = CryptoJS.AES.decrypt(
        {
            ciphertext: ciphertext,
        },
        gbKey,
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    // 将解密后的字节数组转换为UTF-8字符串
    const decryptedText = aesDecryptor.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

function ConvertWordArrayToUint8Array(wordArray) {
    var len = wordArray.words.length,
        u8_array = new Uint8Array(len << 2),
        offset = 0, word, i
    ;
    for (i=0; i<len; i++) {
        word = wordArray.words[i];
        u8_array[offset++] = word >> 24;
        u8_array[offset++] = (word >> 16) & 0xff;
        u8_array[offset++] = (word >> 8) & 0xff;
        u8_array[offset++] = word & 0xff;
    }
    return u8_array;
}
