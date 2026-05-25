export type CertItem = {
    ai: string;
    caname: string;
    certserial: string;
    dnsname: string;
    id: string;
    sertsbj: string;
    severity: string;
    vulnInfo: string;
};

export type CertItemTmp = {
    ai: string;
    displayname: string;
    enabled: boolean;
    id: string;
    sertauth: string[];
    severity: string;
    templatename: string;
};
