<template>
    <div class="row m-5">
        <div class="col-6">

            <n-form inline>
                <n-form-item label="账号">
                    <n-input  v-model:value="accountRef" type="text" placeholder="Account" clearable></n-input>
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" @click="onGetSubmit">获取 TOTP</n-button>
                </n-form-item>
            </n-form>
            <div class="qr-code">
                <qrcode-vue :value="qrCodeRef" :size="192"></qrcode-vue>
            </div>

        </div>
        <div class="col-6">

            <n-form inline>
                <n-form-item label="一次性密码">
                    <n-input  v-model:value="passwordRef" type="text" placeholder="X X X X X X"></n-input>
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" @click="onBindSubmit">绑定 TOTP</n-button>
                </n-form-item>
            </n-form>

        </div>
    </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';
import { TOTPAPI } from '@/api';
import { type GetTOTPTokenRequest } from '@models/totp/GetTOTPTokenRequest';
import type { BindTOTPRequest } from '@models/totp/BindTOTPRequest';
import type { DialogOptions } from 'naive-ui/es/dialog/src/DialogProvider';


const accountRef = ref("17720205191");
const qrCodeRef = ref("null");

(async () => {
    const account = "17720205191";
    await GetTOTPLinkAsnyc(account)
})();

const onGetSubmit = async () => {
    await GetTOTPLinkAsnyc(accountRef.value);
}



const passwordRef = ref("");

const onBindSubmit = async () => {
    const account = accountRef.value;
    const password = passwordRef.value;

    if (password.length != 6)
    {
        window.$message.error("密码长度不正确");
        return;
    }
    await BindTOTPAsync(account, password);
}

async function GetTOTPLinkAsnyc(account: String) {
    const request: GetTOTPTokenRequest = {
        account: account
    }

    try {
        const response = await TOTPAPI.GetTOTPToken(request);
        // console.log(response);
        const token = response.data;

        const link = `otpauth://totp/XYTQAdmin:${account}?secret=${token}&issuer=XYTQAdmin`
        qrCodeRef.value = link;
    }
    catch (error: any) {
        window.$message.error(error);
    }
    
}

async function BindTOTPAsync(account:String, code: String) {
    const request : BindTOTPRequest = {
        account: account,
        code: code
    }

    try {
        const response = await TOTPAPI.BindTOTP(request);
        //console.log(response);
        
        if (response.data == true)
        {
            const success: DialogOptions = {
                title: "绑定成功",
                positiveText: "Ok"
            }
            window.$dialog.success(success);
        } else {
            const fail: DialogOptions = {
                title: "绑定失败",
                positiveText: "Ok"
            }
            window.$dialog.error(fail);
        }
        

    } catch (error) {
        
    }

}

</script>

<style scoped>
.qr-code {
    background: #ffffff;
    padding: 1rem;
    border-radius: 1rem;
    display: inline-block;
}
</style>
@/models/totp/BindTOTPRequest
