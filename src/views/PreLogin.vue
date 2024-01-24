<script setup>
import { GenerateAesKey, DecryptAes } from '@/services/CryptoService.js';
import { PreLogin1 } from '@/services/LoginService';

const props = defineProps(['url'])

const data = ref("");
const key = ref("")
const input = ref("")
const content = ref("");

(async () => {
    var response = await PreLogin1(props.url);
    console.log(response.data.data);
    data.value = response.data.data;

    var keyAndInput = await GenerateAesKey();
    
    //var ketString = "kYfs6kYz82OIS/lYePefYg=="
    
    key.value = keyAndInput.aesKeyBase64
    input.value = keyAndInput.input;
    const decryptedContent = DecryptAes(response.data.data, keyAndInput.aesKeyBase64);
    content.value = decryptedContent;

    console.log("已解密结果");
})();
</script>

<template>
    <div class="col-6">
        <h2>{{ props.url }}/PreLogin1</h2>
        <div>
            <h2>用于生成加密密钥的字符串:</h2>
            <div>{{ input }}</div>
            <h2>加密用的密钥:</h2>
            <div>{{ key }}</div>
        </div>
        <h1>--------</h1>
        <div>
            <h2>返回密文: </h2>
            <div class="overflow-hidden">{{ data }}</div>
        </div>
        <div>
            <h2>解密后的原文: </h2>
            <div class="overflow-hidden">{{ content }}</div>
        </div>
    </div>
</template>

<style scoped>
.overflow-hidden{
 overflow: hidden;
}
</style>
