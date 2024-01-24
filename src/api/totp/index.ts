import axiosInstance from "@/plugins/axios"

import { type GetTOTPTokenResult } from "@models/totp/GetTOTPTokenResult";
import { type GetTOTPTokenRequest } from "@models/totp/GetTOTPTokenRequest";
import type { BindTOTPRequest } from "@/models/totp/BindTOTPRequest";
import type { BindTOTPResult } from "@/models/totp/BindTOTPResult";

async function GetTOTPToken (data: GetTOTPTokenRequest): Promise<GetTOTPTokenResult> {
    const response = await axiosInstance.post<GetTOTPTokenResult>('/GetTOTPToken', data);

    return response.data;
}

async function BindTOTP(data: BindTOTPRequest) : Promise<BindTOTPResult> {
    const response = await axiosInstance.post<BindTOTPResult>('/BindTOTP', data);

    return response.data;
}

// export { GetTOTPToken, AddTOTPToken }
export default { GetTOTPToken, BindTOTP }
