import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AuditLog_Key {
  id: UUIDString;
  __typename?: 'AuditLog_Key';
}

export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}

export interface CreateAuditLogVariables {
  action: string;
}

export interface CreateMembershipData {
  membership_insert: Membership_Key;
}

export interface CreateMembershipVariables {
  orgId: UUIDString;
}

export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}

export interface CreatePreferenceData {
  preference_insert: Preference_Key;
}

export interface CreatePreferenceVariables {
  theme: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface DeleteAuditLogData {
  auditLog_delete?: AuditLog_Key | null;
}

export interface DeleteAuditLogVariables {
  id: UUIDString;
}

export interface DeleteMembershipData {
  membership_delete?: Membership_Key | null;
}

export interface DeleteMembershipVariables {
  id: UUIDString;
}

export interface DeleteOrganizationData {
  organization_delete?: Organization_Key | null;
}

export interface DeleteOrganizationVariables {
  id: UUIDString;
}

export interface DeletePreferenceData {
  preference_delete?: Preference_Key | null;
}

export interface DeletePreferenceVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface GetAuditLogData {
  auditLog?: {
    action: string;
    timestamp: TimestampString;
  };
}

export interface GetAuditLogVariables {
  id: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    displayName: string;
    email: string;
  };
}

export interface GetMembershipData {
  membership?: {
    role: string;
    organization: {
      name: string;
    };
  };
}

export interface GetMembershipVariables {
  id: UUIDString;
}

export interface GetMyPreferenceData {
  preference?: {
    theme: string;
    emailNotifications: boolean;
  };
}

export interface GetOrganizationData {
  organization?: {
    name: string;
    description?: string | null;
  };
}

export interface GetOrganizationVariables {
  id: UUIDString;
}

export interface ListMembershipsData {
  memberships: ({
    organization: {
      name: string;
    };
  })[];
}

export interface ListMyAuditLogsData {
  auditLogs: ({
    action: string;
    timestamp: TimestampString;
  })[];
}

export interface ListOrganizationsData {
  organizations: ({
    name: string;
  })[];
}

export interface ListPreferencesData {
  preferences: ({
    theme: string;
    language?: string | null;
  })[];
}

export interface ListUsersData {
  users: ({
    displayName: string;
  })[];
}

export interface Membership_Key {
  id: UUIDString;
  __typename?: 'Membership_Key';
}

export interface Organization_Key {
  id: UUIDString;
  __typename?: 'Organization_Key';
}

export interface Preference_Key {
  id: UUIDString;
  __typename?: 'Preference_Key';
}

export interface UpdateMembershipData {
  membership_update?: Membership_Key | null;
}

export interface UpdateMembershipVariables {
  id: UUIDString;
  role: string;
}

export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
}

export interface UpdateOrganizationVariables {
  id: UUIDString;
  name?: string | null;
}

export interface UpdatePreferenceData {
  preference_update?: Preference_Key | null;
}

export interface UpdatePreferenceVariables {
  id: UUIDString;
  theme?: string | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(): MutationPromise<UpdateUserData, undefined>;
export function updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateOrganizationData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateOrganizationData, undefined>;
  operationName: string;
}
export const createOrganizationRef: CreateOrganizationRef;

export function createOrganization(): MutationPromise<CreateOrganizationData, undefined>;
export function createOrganization(dc: DataConnect): MutationPromise<CreateOrganizationData, undefined>;

interface GetOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  operationName: string;
}
export const getOrganizationRef: GetOrganizationRef;

export function getOrganization(vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;
export function getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface UpdateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  operationName: string;
}
export const updateOrganizationRef: UpdateOrganizationRef;

export function updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;
export function updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface DeleteOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrganizationVariables): MutationRef<DeleteOrganizationData, DeleteOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOrganizationVariables): MutationRef<DeleteOrganizationData, DeleteOrganizationVariables>;
  operationName: string;
}
export const deleteOrganizationRef: DeleteOrganizationRef;

export function deleteOrganization(vars: DeleteOrganizationVariables): MutationPromise<DeleteOrganizationData, DeleteOrganizationVariables>;
export function deleteOrganization(dc: DataConnect, vars: DeleteOrganizationVariables): MutationPromise<DeleteOrganizationData, DeleteOrganizationVariables>;

interface ListOrganizationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationsData, undefined>;
  operationName: string;
}
export const listOrganizationsRef: ListOrganizationsRef;

export function listOrganizations(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;
export function listOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface CreateMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMembershipVariables): MutationRef<CreateMembershipData, CreateMembershipVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMembershipVariables): MutationRef<CreateMembershipData, CreateMembershipVariables>;
  operationName: string;
}
export const createMembershipRef: CreateMembershipRef;

export function createMembership(vars: CreateMembershipVariables): MutationPromise<CreateMembershipData, CreateMembershipVariables>;
export function createMembership(dc: DataConnect, vars: CreateMembershipVariables): MutationPromise<CreateMembershipData, CreateMembershipVariables>;

interface GetMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMembershipVariables): QueryRef<GetMembershipData, GetMembershipVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMembershipVariables): QueryRef<GetMembershipData, GetMembershipVariables>;
  operationName: string;
}
export const getMembershipRef: GetMembershipRef;

export function getMembership(vars: GetMembershipVariables, options?: ExecuteQueryOptions): QueryPromise<GetMembershipData, GetMembershipVariables>;
export function getMembership(dc: DataConnect, vars: GetMembershipVariables, options?: ExecuteQueryOptions): QueryPromise<GetMembershipData, GetMembershipVariables>;

interface UpdateMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMembershipVariables): MutationRef<UpdateMembershipData, UpdateMembershipVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMembershipVariables): MutationRef<UpdateMembershipData, UpdateMembershipVariables>;
  operationName: string;
}
export const updateMembershipRef: UpdateMembershipRef;

export function updateMembership(vars: UpdateMembershipVariables): MutationPromise<UpdateMembershipData, UpdateMembershipVariables>;
export function updateMembership(dc: DataConnect, vars: UpdateMembershipVariables): MutationPromise<UpdateMembershipData, UpdateMembershipVariables>;

interface DeleteMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMembershipVariables): MutationRef<DeleteMembershipData, DeleteMembershipVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMembershipVariables): MutationRef<DeleteMembershipData, DeleteMembershipVariables>;
  operationName: string;
}
export const deleteMembershipRef: DeleteMembershipRef;

export function deleteMembership(vars: DeleteMembershipVariables): MutationPromise<DeleteMembershipData, DeleteMembershipVariables>;
export function deleteMembership(dc: DataConnect, vars: DeleteMembershipVariables): MutationPromise<DeleteMembershipData, DeleteMembershipVariables>;

interface ListMembershipsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMembershipsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMembershipsData, undefined>;
  operationName: string;
}
export const listMembershipsRef: ListMembershipsRef;

export function listMemberships(options?: ExecuteQueryOptions): QueryPromise<ListMembershipsData, undefined>;
export function listMemberships(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMembershipsData, undefined>;

interface CreateAuditLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
  operationName: string;
}
export const createAuditLogRef: CreateAuditLogRef;

export function createAuditLog(vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;
export function createAuditLog(dc: DataConnect, vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface GetAuditLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAuditLogVariables): QueryRef<GetAuditLogData, GetAuditLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAuditLogVariables): QueryRef<GetAuditLogData, GetAuditLogVariables>;
  operationName: string;
}
export const getAuditLogRef: GetAuditLogRef;

export function getAuditLog(vars: GetAuditLogVariables, options?: ExecuteQueryOptions): QueryPromise<GetAuditLogData, GetAuditLogVariables>;
export function getAuditLog(dc: DataConnect, vars: GetAuditLogVariables, options?: ExecuteQueryOptions): QueryPromise<GetAuditLogData, GetAuditLogVariables>;

interface DeleteAuditLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAuditLogVariables): MutationRef<DeleteAuditLogData, DeleteAuditLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAuditLogVariables): MutationRef<DeleteAuditLogData, DeleteAuditLogVariables>;
  operationName: string;
}
export const deleteAuditLogRef: DeleteAuditLogRef;

export function deleteAuditLog(vars: DeleteAuditLogVariables): MutationPromise<DeleteAuditLogData, DeleteAuditLogVariables>;
export function deleteAuditLog(dc: DataConnect, vars: DeleteAuditLogVariables): MutationPromise<DeleteAuditLogData, DeleteAuditLogVariables>;

interface ListMyAuditLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAuditLogsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyAuditLogsData, undefined>;
  operationName: string;
}
export const listMyAuditLogsRef: ListMyAuditLogsRef;

export function listMyAuditLogs(options?: ExecuteQueryOptions): QueryPromise<ListMyAuditLogsData, undefined>;
export function listMyAuditLogs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyAuditLogsData, undefined>;

interface CreatePreferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePreferenceVariables): MutationRef<CreatePreferenceData, CreatePreferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePreferenceVariables): MutationRef<CreatePreferenceData, CreatePreferenceVariables>;
  operationName: string;
}
export const createPreferenceRef: CreatePreferenceRef;

export function createPreference(vars: CreatePreferenceVariables): MutationPromise<CreatePreferenceData, CreatePreferenceVariables>;
export function createPreference(dc: DataConnect, vars: CreatePreferenceVariables): MutationPromise<CreatePreferenceData, CreatePreferenceVariables>;

interface GetMyPreferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyPreferenceData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyPreferenceData, undefined>;
  operationName: string;
}
export const getMyPreferenceRef: GetMyPreferenceRef;

export function getMyPreference(options?: ExecuteQueryOptions): QueryPromise<GetMyPreferenceData, undefined>;
export function getMyPreference(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyPreferenceData, undefined>;

interface UpdatePreferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePreferenceVariables): MutationRef<UpdatePreferenceData, UpdatePreferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePreferenceVariables): MutationRef<UpdatePreferenceData, UpdatePreferenceVariables>;
  operationName: string;
}
export const updatePreferenceRef: UpdatePreferenceRef;

export function updatePreference(vars: UpdatePreferenceVariables): MutationPromise<UpdatePreferenceData, UpdatePreferenceVariables>;
export function updatePreference(dc: DataConnect, vars: UpdatePreferenceVariables): MutationPromise<UpdatePreferenceData, UpdatePreferenceVariables>;

interface DeletePreferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePreferenceVariables): MutationRef<DeletePreferenceData, DeletePreferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePreferenceVariables): MutationRef<DeletePreferenceData, DeletePreferenceVariables>;
  operationName: string;
}
export const deletePreferenceRef: DeletePreferenceRef;

export function deletePreference(vars: DeletePreferenceVariables): MutationPromise<DeletePreferenceData, DeletePreferenceVariables>;
export function deletePreference(dc: DataConnect, vars: DeletePreferenceVariables): MutationPromise<DeletePreferenceData, DeletePreferenceVariables>;

interface ListPreferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPreferencesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPreferencesData, undefined>;
  operationName: string;
}
export const listPreferencesRef: ListPreferencesRef;

export function listPreferences(options?: ExecuteQueryOptions): QueryPromise<ListPreferencesData, undefined>;
export function listPreferences(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPreferencesData, undefined>;

