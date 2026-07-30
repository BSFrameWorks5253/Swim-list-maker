# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, getCurrentUser, updateUser, deleteUser, listUsers, createOrganization, getOrganization, updateOrganization, deleteOrganization, listOrganizations } from '@dataconnect/generated';


// Operation CreateUser: 
const { data } = await CreateUser(dataConnect);

// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation UpdateUser: 
const { data } = await UpdateUser(dataConnect);

// Operation DeleteUser: 
const { data } = await DeleteUser(dataConnect);

// Operation ListUsers: 
const { data } = await ListUsers(dataConnect);

// Operation CreateOrganization: 
const { data } = await CreateOrganization(dataConnect);

// Operation GetOrganization:  For variables, look at type GetOrganizationVars in ../index.d.ts
const { data } = await GetOrganization(dataConnect, getOrganizationVars);

// Operation UpdateOrganization:  For variables, look at type UpdateOrganizationVars in ../index.d.ts
const { data } = await UpdateOrganization(dataConnect, updateOrganizationVars);

// Operation DeleteOrganization:  For variables, look at type DeleteOrganizationVars in ../index.d.ts
const { data } = await DeleteOrganization(dataConnect, deleteOrganizationVars);

// Operation ListOrganizations: 
const { data } = await ListOrganizations(dataConnect);


```