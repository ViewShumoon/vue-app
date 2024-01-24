import type { Result } from "@/models/Result";


export interface GetTOTPTokenResult extends Result {
    data: String;
}
