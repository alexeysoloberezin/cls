import ApiRoutes from "../utils/apiRoutes";
import type { AttackItem } from "./attack/attackTypes";
import type { CertItem, CertItemTmp } from "./cert/certTypes";
import type { DCItem } from "./dc/dcTypes";
import type { FileVulnItem } from "./filev/filevTypes";
import type { GroupVulnItem } from "./gr3pr/gr3prTypes";
import type { KerberosItem } from "./krb/krbTypes";
import type { ScanvulnItem } from "./scanvuln/scanvTypes";
import { type Ref } from "vue";
export type ApiResponseMessage = {
    code: number,
    message: string
}

type WithCount<K extends string, T extends any[]> = {
    [P in K]: T;
} & {
    count: number;
};

export type AttackResponse = WithCount<'attack', AttackItem[]>;
export type CertResponse = {
    certvulnCa: CertItem[],
    certvulnTmp: CertItemTmp[],
    countCa: number,
    countTmp: number
};
export type DCResponse = WithCount<'dchost', DCItem[]>;
export type FileVulnResponse = WithCount<'filevuln', FileVulnItem[]>;
export type GroupVulnResponse = WithCount<'groupvuln', GroupVulnItem[]>;
export type ScanVulnResponse = WithCount<'scanvuln', ScanvulnItem[]>;
export type KerberosResponse = WithCount<'users', KerberosItem[]>;
export type UserResponses = WithCount<'users', any[]>;
export type CheckResponse = WithCount<'check', any[]>;

export type ApiRouteMap = {
    attack: AttackResponse;
    certvuln: CertResponse;
    dchost: DCResponse;
    filevuln: FileVulnResponse;
    groupvuln: GroupVulnResponse;
    scanvuln: ScanVulnResponse;
    kerberos: KerberosResponse;
    agents: any;
    logAttack: any;
    anyltUsers: any;
    check: CheckResponse;
    accounts: any;
    dbDefects: any;
    dbActions: any;
    hosts: any;
    users: UserResponses;
};

export type ApiRouteMapKey = keyof ApiRouteMap | 'certvulnCa' | 'certvulnTmp';

export const ApiRoutesMap = {
    attack: ApiRoutes.attack,
    certvuln: ApiRoutes.certvuln,
    dchost: ApiRoutes.dchost,
    filevuln: ApiRoutes.filevuln,
    groupvuln: ApiRoutes.groupvuln,
    scanvuln: ApiRoutes.scanvuln,
    kerberos: ApiRoutes.kerberos,
    logAttack: ApiRoutes.logAttack,
    check: ApiRoutes.check,
    anyltUsers: ApiRoutes.anyltUsers,
    accounts: ApiRoutes.accounts,
    agents: ApiRoutes.agents,
    dbDefects: ApiRoutes.dbDefects,
    dbActions: ApiRoutes.dbActions,
    hosts: ApiRoutes.hosts,
    users: ApiRoutes.users
} as const;

export type TableRouteKey = keyof typeof ApiRoutesMap;
export type TableRouteValue = typeof ApiRoutesMap[TableRouteKey];

export type UseTableProps<K extends TableRouteKey> = {
    apiRoute: typeof ApiRoutesMap[K];
    attackId?: string
    isGetRequest?: boolean
    apiGetKey?: string
    countKey?: 'countCa' | 'countTmp' | 'count',
    sort: Ref<{type: 'ASC' | 'DESC', key: string}>
    search: Ref<string>
    dataKey?: ApiRouteMapKey
};
