export interface TOTP {
    label?: string;
    type: "totp";
    secret: string;
    issuer?: string;
    algorithm?: string;
    digits?: number;
    period?: number;
  }
  