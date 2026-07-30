# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListUsers*](#listusers)
  - [*GetOrganization*](#getorganization)
  - [*ListOrganizations*](#listorganizations)
  - [*GetMembership*](#getmembership)
  - [*ListMemberships*](#listmemberships)
  - [*GetAuditLog*](#getauditlog)
  - [*ListMyAuditLogs*](#listmyauditlogs)
  - [*GetMyPreference*](#getmypreference)
  - [*ListPreferences*](#listpreferences)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateOrganization*](#createorganization)
  - [*UpdateOrganization*](#updateorganization)
  - [*DeleteOrganization*](#deleteorganization)
  - [*CreateMembership*](#createmembership)
  - [*UpdateMembership*](#updatemembership)
  - [*DeleteMembership*](#deletemembership)
  - [*CreateAuditLog*](#createauditlog)
  - [*DeleteAuditLog*](#deleteauditlog)
  - [*CreatePreference*](#createpreference)
  - [*UpdatePreference*](#updatepreference)
  - [*DeletePreference*](#deletepreference)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    displayName: string;
    email: string;
  };
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    displayName: string;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetOrganization
You can execute the `GetOrganization` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getOrganization(vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
}
export const getOrganizationRef: GetOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationRef {
  ...
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
}
export const getOrganizationRef: GetOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationRef:
```typescript
const name = getOrganizationRef.operationName;
console.log(name);
```

### Variables
The `GetOrganization` query requires an argument of type `GetOrganizationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganization` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationData {
  organization?: {
    name: string;
    description?: string | null;
  };
}
```
### Using `GetOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganization, GetOrganizationVariables } from '@dataconnect/generated';

// The `GetOrganization` query requires an argument of type `GetOrganizationVariables`:
const getOrganizationVars: GetOrganizationVariables = {
  id: ..., 
};

// Call the `getOrganization()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganization(getOrganizationVars);
// Variables can be defined inline as well.
const { data } = await getOrganization({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganization(dataConnect, getOrganizationVars);

console.log(data.organization);

// Or, you can use the `Promise` API.
getOrganization(getOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

### Using `GetOrganization`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationRef, GetOrganizationVariables } from '@dataconnect/generated';

// The `GetOrganization` query requires an argument of type `GetOrganizationVariables`:
const getOrganizationVars: GetOrganizationVariables = {
  id: ..., 
};

// Call the `getOrganizationRef()` function to get a reference to the query.
const ref = getOrganizationRef(getOrganizationVars);
// Variables can be defined inline as well.
const ref = getOrganizationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationRef(dataConnect, getOrganizationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organization);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

## ListOrganizations
You can execute the `ListOrganizations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listOrganizations(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface ListOrganizationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsData, undefined>;
}
export const listOrganizationsRef: ListOrganizationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface ListOrganizationsRef {
  ...
  (dc: DataConnect): QueryRef<ListOrganizationsData, undefined>;
}
export const listOrganizationsRef: ListOrganizationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganizationsRef:
```typescript
const name = listOrganizationsRef.operationName;
console.log(name);
```

### Variables
The `ListOrganizations` query has no variables.
### Return Type
Recall that executing the `ListOrganizations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganizationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrganizationsData {
  organizations: ({
    name: string;
  })[];
}
```
### Using `ListOrganizations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganizations } from '@dataconnect/generated';


// Call the `listOrganizations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganizations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganizations(dataConnect);

console.log(data.organizations);

// Or, you can use the `Promise` API.
listOrganizations().then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

### Using `ListOrganizations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganizationsRef } from '@dataconnect/generated';


// Call the `listOrganizationsRef()` function to get a reference to the query.
const ref = listOrganizationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganizationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

## GetMembership
You can execute the `GetMembership` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMembership(vars: GetMembershipVariables, options?: ExecuteQueryOptions): QueryPromise<GetMembershipData, GetMembershipVariables>;

interface GetMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMembershipVariables): QueryRef<GetMembershipData, GetMembershipVariables>;
}
export const getMembershipRef: GetMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMembership(dc: DataConnect, vars: GetMembershipVariables, options?: ExecuteQueryOptions): QueryPromise<GetMembershipData, GetMembershipVariables>;

interface GetMembershipRef {
  ...
  (dc: DataConnect, vars: GetMembershipVariables): QueryRef<GetMembershipData, GetMembershipVariables>;
}
export const getMembershipRef: GetMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMembershipRef:
```typescript
const name = getMembershipRef.operationName;
console.log(name);
```

### Variables
The `GetMembership` query requires an argument of type `GetMembershipVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMembershipVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMembership` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMembershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMembershipData {
  membership?: {
    role: string;
    organization: {
      name: string;
    };
  };
}
```
### Using `GetMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMembership, GetMembershipVariables } from '@dataconnect/generated';

// The `GetMembership` query requires an argument of type `GetMembershipVariables`:
const getMembershipVars: GetMembershipVariables = {
  id: ..., 
};

// Call the `getMembership()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMembership(getMembershipVars);
// Variables can be defined inline as well.
const { data } = await getMembership({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMembership(dataConnect, getMembershipVars);

console.log(data.membership);

// Or, you can use the `Promise` API.
getMembership(getMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.membership);
});
```

### Using `GetMembership`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMembershipRef, GetMembershipVariables } from '@dataconnect/generated';

// The `GetMembership` query requires an argument of type `GetMembershipVariables`:
const getMembershipVars: GetMembershipVariables = {
  id: ..., 
};

// Call the `getMembershipRef()` function to get a reference to the query.
const ref = getMembershipRef(getMembershipVars);
// Variables can be defined inline as well.
const ref = getMembershipRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMembershipRef(dataConnect, getMembershipVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.membership);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.membership);
});
```

## ListMemberships
You can execute the `ListMemberships` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMemberships(options?: ExecuteQueryOptions): QueryPromise<ListMembershipsData, undefined>;

interface ListMembershipsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMembershipsData, undefined>;
}
export const listMembershipsRef: ListMembershipsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMemberships(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMembershipsData, undefined>;

interface ListMembershipsRef {
  ...
  (dc: DataConnect): QueryRef<ListMembershipsData, undefined>;
}
export const listMembershipsRef: ListMembershipsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMembershipsRef:
```typescript
const name = listMembershipsRef.operationName;
console.log(name);
```

### Variables
The `ListMemberships` query has no variables.
### Return Type
Recall that executing the `ListMemberships` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMembershipsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMembershipsData {
  memberships: ({
    organization: {
      name: string;
    };
  })[];
}
```
### Using `ListMemberships`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMemberships } from '@dataconnect/generated';


// Call the `listMemberships()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMemberships();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMemberships(dataConnect);

console.log(data.memberships);

// Or, you can use the `Promise` API.
listMemberships().then((response) => {
  const data = response.data;
  console.log(data.memberships);
});
```

### Using `ListMemberships`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMembershipsRef } from '@dataconnect/generated';


// Call the `listMembershipsRef()` function to get a reference to the query.
const ref = listMembershipsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMembershipsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.memberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.memberships);
});
```

## GetAuditLog
You can execute the `GetAuditLog` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAuditLog(vars: GetAuditLogVariables, options?: ExecuteQueryOptions): QueryPromise<GetAuditLogData, GetAuditLogVariables>;

interface GetAuditLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAuditLogVariables): QueryRef<GetAuditLogData, GetAuditLogVariables>;
}
export const getAuditLogRef: GetAuditLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAuditLog(dc: DataConnect, vars: GetAuditLogVariables, options?: ExecuteQueryOptions): QueryPromise<GetAuditLogData, GetAuditLogVariables>;

interface GetAuditLogRef {
  ...
  (dc: DataConnect, vars: GetAuditLogVariables): QueryRef<GetAuditLogData, GetAuditLogVariables>;
}
export const getAuditLogRef: GetAuditLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAuditLogRef:
```typescript
const name = getAuditLogRef.operationName;
console.log(name);
```

### Variables
The `GetAuditLog` query requires an argument of type `GetAuditLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAuditLogVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAuditLog` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAuditLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAuditLogData {
  auditLog?: {
    action: string;
    timestamp: TimestampString;
  };
}
```
### Using `GetAuditLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAuditLog, GetAuditLogVariables } from '@dataconnect/generated';

// The `GetAuditLog` query requires an argument of type `GetAuditLogVariables`:
const getAuditLogVars: GetAuditLogVariables = {
  id: ..., 
};

// Call the `getAuditLog()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAuditLog(getAuditLogVars);
// Variables can be defined inline as well.
const { data } = await getAuditLog({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAuditLog(dataConnect, getAuditLogVars);

console.log(data.auditLog);

// Or, you can use the `Promise` API.
getAuditLog(getAuditLogVars).then((response) => {
  const data = response.data;
  console.log(data.auditLog);
});
```

### Using `GetAuditLog`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAuditLogRef, GetAuditLogVariables } from '@dataconnect/generated';

// The `GetAuditLog` query requires an argument of type `GetAuditLogVariables`:
const getAuditLogVars: GetAuditLogVariables = {
  id: ..., 
};

// Call the `getAuditLogRef()` function to get a reference to the query.
const ref = getAuditLogRef(getAuditLogVars);
// Variables can be defined inline as well.
const ref = getAuditLogRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAuditLogRef(dataConnect, getAuditLogVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLog);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLog);
});
```

## ListMyAuditLogs
You can execute the `ListMyAuditLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyAuditLogs(options?: ExecuteQueryOptions): QueryPromise<ListMyAuditLogsData, undefined>;

interface ListMyAuditLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAuditLogsData, undefined>;
}
export const listMyAuditLogsRef: ListMyAuditLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyAuditLogs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyAuditLogsData, undefined>;

interface ListMyAuditLogsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyAuditLogsData, undefined>;
}
export const listMyAuditLogsRef: ListMyAuditLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyAuditLogsRef:
```typescript
const name = listMyAuditLogsRef.operationName;
console.log(name);
```

### Variables
The `ListMyAuditLogs` query has no variables.
### Return Type
Recall that executing the `ListMyAuditLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyAuditLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyAuditLogsData {
  auditLogs: ({
    action: string;
    timestamp: TimestampString;
  })[];
}
```
### Using `ListMyAuditLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyAuditLogs } from '@dataconnect/generated';


// Call the `listMyAuditLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyAuditLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyAuditLogs(dataConnect);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
listMyAuditLogs().then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

### Using `ListMyAuditLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyAuditLogsRef } from '@dataconnect/generated';


// Call the `listMyAuditLogsRef()` function to get a reference to the query.
const ref = listMyAuditLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyAuditLogsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

## GetMyPreference
You can execute the `GetMyPreference` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyPreference(options?: ExecuteQueryOptions): QueryPromise<GetMyPreferenceData, undefined>;

interface GetMyPreferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyPreferenceData, undefined>;
}
export const getMyPreferenceRef: GetMyPreferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyPreference(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyPreferenceData, undefined>;

interface GetMyPreferenceRef {
  ...
  (dc: DataConnect): QueryRef<GetMyPreferenceData, undefined>;
}
export const getMyPreferenceRef: GetMyPreferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyPreferenceRef:
```typescript
const name = getMyPreferenceRef.operationName;
console.log(name);
```

### Variables
The `GetMyPreference` query has no variables.
### Return Type
Recall that executing the `GetMyPreference` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyPreferenceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyPreferenceData {
  preference?: {
    theme: string;
    emailNotifications: boolean;
  };
}
```
### Using `GetMyPreference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyPreference } from '@dataconnect/generated';


// Call the `getMyPreference()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyPreference();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyPreference(dataConnect);

console.log(data.preference);

// Or, you can use the `Promise` API.
getMyPreference().then((response) => {
  const data = response.data;
  console.log(data.preference);
});
```

### Using `GetMyPreference`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyPreferenceRef } from '@dataconnect/generated';


// Call the `getMyPreferenceRef()` function to get a reference to the query.
const ref = getMyPreferenceRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyPreferenceRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.preference);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.preference);
});
```

## ListPreferences
You can execute the `ListPreferences` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPreferences(options?: ExecuteQueryOptions): QueryPromise<ListPreferencesData, undefined>;

interface ListPreferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPreferencesData, undefined>;
}
export const listPreferencesRef: ListPreferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPreferences(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPreferencesData, undefined>;

interface ListPreferencesRef {
  ...
  (dc: DataConnect): QueryRef<ListPreferencesData, undefined>;
}
export const listPreferencesRef: ListPreferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPreferencesRef:
```typescript
const name = listPreferencesRef.operationName;
console.log(name);
```

### Variables
The `ListPreferences` query has no variables.
### Return Type
Recall that executing the `ListPreferences` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPreferencesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPreferencesData {
  preferences: ({
    theme: string;
    language?: string | null;
  })[];
}
```
### Using `ListPreferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPreferences } from '@dataconnect/generated';


// Call the `listPreferences()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPreferences();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPreferences(dataConnect);

console.log(data.preferences);

// Or, you can use the `Promise` API.
listPreferences().then((response) => {
  const data = response.data;
  console.log(data.preferences);
});
```

### Using `ListPreferences`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPreferencesRef } from '@dataconnect/generated';


// Call the `listPreferencesRef()` function to get a reference to the query.
const ref = listPreferencesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPreferencesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.preferences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.preferences);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has no variables.
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser } from '@dataconnect/generated';


// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser().then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef } from '@dataconnect/generated';


// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateOrganization
You can execute the `CreateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createOrganization(): MutationPromise<CreateOrganizationData, undefined>;

interface CreateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateOrganizationData, undefined>;
}
export const createOrganizationRef: CreateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrganization(dc: DataConnect): MutationPromise<CreateOrganizationData, undefined>;

interface CreateOrganizationRef {
  ...
  (dc: DataConnect): MutationRef<CreateOrganizationData, undefined>;
}
export const createOrganizationRef: CreateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrganizationRef:
```typescript
const name = createOrganizationRef.operationName;
console.log(name);
```

### Variables
The `CreateOrganization` mutation has no variables.
### Return Type
Recall that executing the `CreateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}
```
### Using `CreateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrganization } from '@dataconnect/generated';


// Call the `createOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrganization();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrganization(dataConnect);

console.log(data.organization_insert);

// Or, you can use the `Promise` API.
createOrganization().then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
});
```

### Using `CreateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrganizationRef } from '@dataconnect/generated';


// Call the `createOrganizationRef()` function to get a reference to the mutation.
const ref = createOrganizationRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrganizationRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
});
```

## UpdateOrganization
You can execute the `UpdateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface UpdateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
}
export const updateOrganizationRef: UpdateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface UpdateOrganizationRef {
  ...
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
}
export const updateOrganizationRef: UpdateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrganizationRef:
```typescript
const name = updateOrganizationRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrganizationVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
}
```
### Using `UpdateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrganization, UpdateOrganizationVariables } from '@dataconnect/generated';

// The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`:
const updateOrganizationVars: UpdateOrganizationVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrganization(updateOrganizationVars);
// Variables can be defined inline as well.
const { data } = await updateOrganization({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrganization(dataConnect, updateOrganizationVars);

console.log(data.organization_update);

// Or, you can use the `Promise` API.
updateOrganization(updateOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
});
```

### Using `UpdateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrganizationRef, UpdateOrganizationVariables } from '@dataconnect/generated';

// The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`:
const updateOrganizationVars: UpdateOrganizationVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateOrganizationRef()` function to get a reference to the mutation.
const ref = updateOrganizationRef(updateOrganizationVars);
// Variables can be defined inline as well.
const ref = updateOrganizationRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrganizationRef(dataConnect, updateOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
});
```

## DeleteOrganization
You can execute the `DeleteOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteOrganization(vars: DeleteOrganizationVariables): MutationPromise<DeleteOrganizationData, DeleteOrganizationVariables>;

interface DeleteOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrganizationVariables): MutationRef<DeleteOrganizationData, DeleteOrganizationVariables>;
}
export const deleteOrganizationRef: DeleteOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOrganization(dc: DataConnect, vars: DeleteOrganizationVariables): MutationPromise<DeleteOrganizationData, DeleteOrganizationVariables>;

interface DeleteOrganizationRef {
  ...
  (dc: DataConnect, vars: DeleteOrganizationVariables): MutationRef<DeleteOrganizationData, DeleteOrganizationVariables>;
}
export const deleteOrganizationRef: DeleteOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOrganizationRef:
```typescript
const name = deleteOrganizationRef.operationName;
console.log(name);
```

### Variables
The `DeleteOrganization` mutation requires an argument of type `DeleteOrganizationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOrganizationData {
  organization_delete?: Organization_Key | null;
}
```
### Using `DeleteOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOrganization, DeleteOrganizationVariables } from '@dataconnect/generated';

// The `DeleteOrganization` mutation requires an argument of type `DeleteOrganizationVariables`:
const deleteOrganizationVars: DeleteOrganizationVariables = {
  id: ..., 
};

// Call the `deleteOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOrganization(deleteOrganizationVars);
// Variables can be defined inline as well.
const { data } = await deleteOrganization({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOrganization(dataConnect, deleteOrganizationVars);

console.log(data.organization_delete);

// Or, you can use the `Promise` API.
deleteOrganization(deleteOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_delete);
});
```

### Using `DeleteOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOrganizationRef, DeleteOrganizationVariables } from '@dataconnect/generated';

// The `DeleteOrganization` mutation requires an argument of type `DeleteOrganizationVariables`:
const deleteOrganizationVars: DeleteOrganizationVariables = {
  id: ..., 
};

// Call the `deleteOrganizationRef()` function to get a reference to the mutation.
const ref = deleteOrganizationRef(deleteOrganizationVars);
// Variables can be defined inline as well.
const ref = deleteOrganizationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOrganizationRef(dataConnect, deleteOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_delete);
});
```

## CreateMembership
You can execute the `CreateMembership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMembership(vars: CreateMembershipVariables): MutationPromise<CreateMembershipData, CreateMembershipVariables>;

interface CreateMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMembershipVariables): MutationRef<CreateMembershipData, CreateMembershipVariables>;
}
export const createMembershipRef: CreateMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMembership(dc: DataConnect, vars: CreateMembershipVariables): MutationPromise<CreateMembershipData, CreateMembershipVariables>;

interface CreateMembershipRef {
  ...
  (dc: DataConnect, vars: CreateMembershipVariables): MutationRef<CreateMembershipData, CreateMembershipVariables>;
}
export const createMembershipRef: CreateMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMembershipRef:
```typescript
const name = createMembershipRef.operationName;
console.log(name);
```

### Variables
The `CreateMembership` mutation requires an argument of type `CreateMembershipVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMembershipVariables {
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateMembership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMembershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMembershipData {
  membership_insert: Membership_Key;
}
```
### Using `CreateMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMembership, CreateMembershipVariables } from '@dataconnect/generated';

// The `CreateMembership` mutation requires an argument of type `CreateMembershipVariables`:
const createMembershipVars: CreateMembershipVariables = {
  orgId: ..., 
};

// Call the `createMembership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMembership(createMembershipVars);
// Variables can be defined inline as well.
const { data } = await createMembership({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMembership(dataConnect, createMembershipVars);

console.log(data.membership_insert);

// Or, you can use the `Promise` API.
createMembership(createMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.membership_insert);
});
```

### Using `CreateMembership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMembershipRef, CreateMembershipVariables } from '@dataconnect/generated';

// The `CreateMembership` mutation requires an argument of type `CreateMembershipVariables`:
const createMembershipVars: CreateMembershipVariables = {
  orgId: ..., 
};

// Call the `createMembershipRef()` function to get a reference to the mutation.
const ref = createMembershipRef(createMembershipVars);
// Variables can be defined inline as well.
const ref = createMembershipRef({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMembershipRef(dataConnect, createMembershipVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.membership_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.membership_insert);
});
```

## UpdateMembership
You can execute the `UpdateMembership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMembership(vars: UpdateMembershipVariables): MutationPromise<UpdateMembershipData, UpdateMembershipVariables>;

interface UpdateMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMembershipVariables): MutationRef<UpdateMembershipData, UpdateMembershipVariables>;
}
export const updateMembershipRef: UpdateMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMembership(dc: DataConnect, vars: UpdateMembershipVariables): MutationPromise<UpdateMembershipData, UpdateMembershipVariables>;

interface UpdateMembershipRef {
  ...
  (dc: DataConnect, vars: UpdateMembershipVariables): MutationRef<UpdateMembershipData, UpdateMembershipVariables>;
}
export const updateMembershipRef: UpdateMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMembershipRef:
```typescript
const name = updateMembershipRef.operationName;
console.log(name);
```

### Variables
The `UpdateMembership` mutation requires an argument of type `UpdateMembershipVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMembershipVariables {
  id: UUIDString;
  role: string;
}
```
### Return Type
Recall that executing the `UpdateMembership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMembershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMembershipData {
  membership_update?: Membership_Key | null;
}
```
### Using `UpdateMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMembership, UpdateMembershipVariables } from '@dataconnect/generated';

// The `UpdateMembership` mutation requires an argument of type `UpdateMembershipVariables`:
const updateMembershipVars: UpdateMembershipVariables = {
  id: ..., 
  role: ..., 
};

// Call the `updateMembership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMembership(updateMembershipVars);
// Variables can be defined inline as well.
const { data } = await updateMembership({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMembership(dataConnect, updateMembershipVars);

console.log(data.membership_update);

// Or, you can use the `Promise` API.
updateMembership(updateMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.membership_update);
});
```

### Using `UpdateMembership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMembershipRef, UpdateMembershipVariables } from '@dataconnect/generated';

// The `UpdateMembership` mutation requires an argument of type `UpdateMembershipVariables`:
const updateMembershipVars: UpdateMembershipVariables = {
  id: ..., 
  role: ..., 
};

// Call the `updateMembershipRef()` function to get a reference to the mutation.
const ref = updateMembershipRef(updateMembershipVars);
// Variables can be defined inline as well.
const ref = updateMembershipRef({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMembershipRef(dataConnect, updateMembershipVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.membership_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.membership_update);
});
```

## DeleteMembership
You can execute the `DeleteMembership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMembership(vars: DeleteMembershipVariables): MutationPromise<DeleteMembershipData, DeleteMembershipVariables>;

interface DeleteMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMembershipVariables): MutationRef<DeleteMembershipData, DeleteMembershipVariables>;
}
export const deleteMembershipRef: DeleteMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMembership(dc: DataConnect, vars: DeleteMembershipVariables): MutationPromise<DeleteMembershipData, DeleteMembershipVariables>;

interface DeleteMembershipRef {
  ...
  (dc: DataConnect, vars: DeleteMembershipVariables): MutationRef<DeleteMembershipData, DeleteMembershipVariables>;
}
export const deleteMembershipRef: DeleteMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMembershipRef:
```typescript
const name = deleteMembershipRef.operationName;
console.log(name);
```

### Variables
The `DeleteMembership` mutation requires an argument of type `DeleteMembershipVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMembershipVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMembership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMembershipData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMembershipData {
  membership_delete?: Membership_Key | null;
}
```
### Using `DeleteMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMembership, DeleteMembershipVariables } from '@dataconnect/generated';

// The `DeleteMembership` mutation requires an argument of type `DeleteMembershipVariables`:
const deleteMembershipVars: DeleteMembershipVariables = {
  id: ..., 
};

// Call the `deleteMembership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMembership(deleteMembershipVars);
// Variables can be defined inline as well.
const { data } = await deleteMembership({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMembership(dataConnect, deleteMembershipVars);

console.log(data.membership_delete);

// Or, you can use the `Promise` API.
deleteMembership(deleteMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.membership_delete);
});
```

### Using `DeleteMembership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMembershipRef, DeleteMembershipVariables } from '@dataconnect/generated';

// The `DeleteMembership` mutation requires an argument of type `DeleteMembershipVariables`:
const deleteMembershipVars: DeleteMembershipVariables = {
  id: ..., 
};

// Call the `deleteMembershipRef()` function to get a reference to the mutation.
const ref = deleteMembershipRef(deleteMembershipVars);
// Variables can be defined inline as well.
const ref = deleteMembershipRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMembershipRef(dataConnect, deleteMembershipVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.membership_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.membership_delete);
});
```

## CreateAuditLog
You can execute the `CreateAuditLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAuditLog(vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface CreateAuditLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
}
export const createAuditLogRef: CreateAuditLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAuditLog(dc: DataConnect, vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface CreateAuditLogRef {
  ...
  (dc: DataConnect, vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
}
export const createAuditLogRef: CreateAuditLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAuditLogRef:
```typescript
const name = createAuditLogRef.operationName;
console.log(name);
```

### Variables
The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAuditLogVariables {
  action: string;
}
```
### Return Type
Recall that executing the `CreateAuditLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAuditLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}
```
### Using `CreateAuditLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAuditLog, CreateAuditLogVariables } from '@dataconnect/generated';

// The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`:
const createAuditLogVars: CreateAuditLogVariables = {
  action: ..., 
};

// Call the `createAuditLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAuditLog(createAuditLogVars);
// Variables can be defined inline as well.
const { data } = await createAuditLog({ action: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAuditLog(dataConnect, createAuditLogVars);

console.log(data.auditLog_insert);

// Or, you can use the `Promise` API.
createAuditLog(createAuditLogVars).then((response) => {
  const data = response.data;
  console.log(data.auditLog_insert);
});
```

### Using `CreateAuditLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAuditLogRef, CreateAuditLogVariables } from '@dataconnect/generated';

// The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`:
const createAuditLogVars: CreateAuditLogVariables = {
  action: ..., 
};

// Call the `createAuditLogRef()` function to get a reference to the mutation.
const ref = createAuditLogRef(createAuditLogVars);
// Variables can be defined inline as well.
const ref = createAuditLogRef({ action: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAuditLogRef(dataConnect, createAuditLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLog_insert);
});
```

## DeleteAuditLog
You can execute the `DeleteAuditLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAuditLog(vars: DeleteAuditLogVariables): MutationPromise<DeleteAuditLogData, DeleteAuditLogVariables>;

interface DeleteAuditLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAuditLogVariables): MutationRef<DeleteAuditLogData, DeleteAuditLogVariables>;
}
export const deleteAuditLogRef: DeleteAuditLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAuditLog(dc: DataConnect, vars: DeleteAuditLogVariables): MutationPromise<DeleteAuditLogData, DeleteAuditLogVariables>;

interface DeleteAuditLogRef {
  ...
  (dc: DataConnect, vars: DeleteAuditLogVariables): MutationRef<DeleteAuditLogData, DeleteAuditLogVariables>;
}
export const deleteAuditLogRef: DeleteAuditLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAuditLogRef:
```typescript
const name = deleteAuditLogRef.operationName;
console.log(name);
```

### Variables
The `DeleteAuditLog` mutation requires an argument of type `DeleteAuditLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAuditLogVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAuditLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAuditLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAuditLogData {
  auditLog_delete?: AuditLog_Key | null;
}
```
### Using `DeleteAuditLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAuditLog, DeleteAuditLogVariables } from '@dataconnect/generated';

// The `DeleteAuditLog` mutation requires an argument of type `DeleteAuditLogVariables`:
const deleteAuditLogVars: DeleteAuditLogVariables = {
  id: ..., 
};

// Call the `deleteAuditLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAuditLog(deleteAuditLogVars);
// Variables can be defined inline as well.
const { data } = await deleteAuditLog({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAuditLog(dataConnect, deleteAuditLogVars);

console.log(data.auditLog_delete);

// Or, you can use the `Promise` API.
deleteAuditLog(deleteAuditLogVars).then((response) => {
  const data = response.data;
  console.log(data.auditLog_delete);
});
```

### Using `DeleteAuditLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAuditLogRef, DeleteAuditLogVariables } from '@dataconnect/generated';

// The `DeleteAuditLog` mutation requires an argument of type `DeleteAuditLogVariables`:
const deleteAuditLogVars: DeleteAuditLogVariables = {
  id: ..., 
};

// Call the `deleteAuditLogRef()` function to get a reference to the mutation.
const ref = deleteAuditLogRef(deleteAuditLogVars);
// Variables can be defined inline as well.
const ref = deleteAuditLogRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAuditLogRef(dataConnect, deleteAuditLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditLog_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLog_delete);
});
```

## CreatePreference
You can execute the `CreatePreference` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPreference(vars: CreatePreferenceVariables): MutationPromise<CreatePreferenceData, CreatePreferenceVariables>;

interface CreatePreferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePreferenceVariables): MutationRef<CreatePreferenceData, CreatePreferenceVariables>;
}
export const createPreferenceRef: CreatePreferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPreference(dc: DataConnect, vars: CreatePreferenceVariables): MutationPromise<CreatePreferenceData, CreatePreferenceVariables>;

interface CreatePreferenceRef {
  ...
  (dc: DataConnect, vars: CreatePreferenceVariables): MutationRef<CreatePreferenceData, CreatePreferenceVariables>;
}
export const createPreferenceRef: CreatePreferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPreferenceRef:
```typescript
const name = createPreferenceRef.operationName;
console.log(name);
```

### Variables
The `CreatePreference` mutation requires an argument of type `CreatePreferenceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePreferenceVariables {
  theme: string;
}
```
### Return Type
Recall that executing the `CreatePreference` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePreferenceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePreferenceData {
  preference_insert: Preference_Key;
}
```
### Using `CreatePreference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPreference, CreatePreferenceVariables } from '@dataconnect/generated';

// The `CreatePreference` mutation requires an argument of type `CreatePreferenceVariables`:
const createPreferenceVars: CreatePreferenceVariables = {
  theme: ..., 
};

// Call the `createPreference()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPreference(createPreferenceVars);
// Variables can be defined inline as well.
const { data } = await createPreference({ theme: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPreference(dataConnect, createPreferenceVars);

console.log(data.preference_insert);

// Or, you can use the `Promise` API.
createPreference(createPreferenceVars).then((response) => {
  const data = response.data;
  console.log(data.preference_insert);
});
```

### Using `CreatePreference`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPreferenceRef, CreatePreferenceVariables } from '@dataconnect/generated';

// The `CreatePreference` mutation requires an argument of type `CreatePreferenceVariables`:
const createPreferenceVars: CreatePreferenceVariables = {
  theme: ..., 
};

// Call the `createPreferenceRef()` function to get a reference to the mutation.
const ref = createPreferenceRef(createPreferenceVars);
// Variables can be defined inline as well.
const ref = createPreferenceRef({ theme: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPreferenceRef(dataConnect, createPreferenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.preference_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.preference_insert);
});
```

## UpdatePreference
You can execute the `UpdatePreference` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePreference(vars: UpdatePreferenceVariables): MutationPromise<UpdatePreferenceData, UpdatePreferenceVariables>;

interface UpdatePreferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePreferenceVariables): MutationRef<UpdatePreferenceData, UpdatePreferenceVariables>;
}
export const updatePreferenceRef: UpdatePreferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePreference(dc: DataConnect, vars: UpdatePreferenceVariables): MutationPromise<UpdatePreferenceData, UpdatePreferenceVariables>;

interface UpdatePreferenceRef {
  ...
  (dc: DataConnect, vars: UpdatePreferenceVariables): MutationRef<UpdatePreferenceData, UpdatePreferenceVariables>;
}
export const updatePreferenceRef: UpdatePreferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePreferenceRef:
```typescript
const name = updatePreferenceRef.operationName;
console.log(name);
```

### Variables
The `UpdatePreference` mutation requires an argument of type `UpdatePreferenceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePreferenceVariables {
  id: UUIDString;
  theme?: string | null;
}
```
### Return Type
Recall that executing the `UpdatePreference` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePreferenceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePreferenceData {
  preference_update?: Preference_Key | null;
}
```
### Using `UpdatePreference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePreference, UpdatePreferenceVariables } from '@dataconnect/generated';

// The `UpdatePreference` mutation requires an argument of type `UpdatePreferenceVariables`:
const updatePreferenceVars: UpdatePreferenceVariables = {
  id: ..., 
  theme: ..., // optional
};

// Call the `updatePreference()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePreference(updatePreferenceVars);
// Variables can be defined inline as well.
const { data } = await updatePreference({ id: ..., theme: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePreference(dataConnect, updatePreferenceVars);

console.log(data.preference_update);

// Or, you can use the `Promise` API.
updatePreference(updatePreferenceVars).then((response) => {
  const data = response.data;
  console.log(data.preference_update);
});
```

### Using `UpdatePreference`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePreferenceRef, UpdatePreferenceVariables } from '@dataconnect/generated';

// The `UpdatePreference` mutation requires an argument of type `UpdatePreferenceVariables`:
const updatePreferenceVars: UpdatePreferenceVariables = {
  id: ..., 
  theme: ..., // optional
};

// Call the `updatePreferenceRef()` function to get a reference to the mutation.
const ref = updatePreferenceRef(updatePreferenceVars);
// Variables can be defined inline as well.
const ref = updatePreferenceRef({ id: ..., theme: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePreferenceRef(dataConnect, updatePreferenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.preference_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.preference_update);
});
```

## DeletePreference
You can execute the `DeletePreference` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePreference(vars: DeletePreferenceVariables): MutationPromise<DeletePreferenceData, DeletePreferenceVariables>;

interface DeletePreferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePreferenceVariables): MutationRef<DeletePreferenceData, DeletePreferenceVariables>;
}
export const deletePreferenceRef: DeletePreferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePreference(dc: DataConnect, vars: DeletePreferenceVariables): MutationPromise<DeletePreferenceData, DeletePreferenceVariables>;

interface DeletePreferenceRef {
  ...
  (dc: DataConnect, vars: DeletePreferenceVariables): MutationRef<DeletePreferenceData, DeletePreferenceVariables>;
}
export const deletePreferenceRef: DeletePreferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePreferenceRef:
```typescript
const name = deletePreferenceRef.operationName;
console.log(name);
```

### Variables
The `DeletePreference` mutation requires an argument of type `DeletePreferenceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePreferenceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePreference` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePreferenceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePreferenceData {
  preference_delete?: Preference_Key | null;
}
```
### Using `DeletePreference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePreference, DeletePreferenceVariables } from '@dataconnect/generated';

// The `DeletePreference` mutation requires an argument of type `DeletePreferenceVariables`:
const deletePreferenceVars: DeletePreferenceVariables = {
  id: ..., 
};

// Call the `deletePreference()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePreference(deletePreferenceVars);
// Variables can be defined inline as well.
const { data } = await deletePreference({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePreference(dataConnect, deletePreferenceVars);

console.log(data.preference_delete);

// Or, you can use the `Promise` API.
deletePreference(deletePreferenceVars).then((response) => {
  const data = response.data;
  console.log(data.preference_delete);
});
```

### Using `DeletePreference`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePreferenceRef, DeletePreferenceVariables } from '@dataconnect/generated';

// The `DeletePreference` mutation requires an argument of type `DeletePreferenceVariables`:
const deletePreferenceVars: DeletePreferenceVariables = {
  id: ..., 
};

// Call the `deletePreferenceRef()` function to get a reference to the mutation.
const ref = deletePreferenceRef(deletePreferenceVars);
// Variables can be defined inline as well.
const ref = deletePreferenceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePreferenceRef(dataConnect, deletePreferenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.preference_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.preference_delete);
});
```

