import Fastify from 'fastify'
import cors from '@fastify/cors'
import { addUser, addUserRoles, deleteUser, getAllUsers, getPermissionsByUserId, getUser, getUserRoles, getUserRolesById, updateUser } from './handlers/userHandlers.js'
import { getRoles } from './handlers/rolesHandler.js'
import { getRolePermissions, getRolePermissionsById } from './handlers/rolePermissionHandler.js'
const fastify = Fastify({
  logger: true
})

// user Routes
fastify.get('/users', getAllUsers)
fastify.get('/user/:email/:password', getUser)
fastify.post('/user', addUser)
fastify.put('/user/update/:id', updateUser)
fastify.delete('/user/delete/:id', deleteUser)
fastify.get('/user/permissions/:user_id',getPermissionsByUserId)

//roles routes
fastify.get('/roles', getRoles)

//roles_permissions routes
fastify.get('/roles_permissions',getRolePermissions)
fastify.get('/roles_permissions/:role_id',getRolePermissionsById)

//user_roles routes
fastify.get('/user_roles', getUserRoles)
fastify.get('/user_roles/:user_id', getUserRolesById)
fastify.post('/user_roles',addUserRoles)


//Access - Control - Allow - Origin
fastify.register(cors, {
  cors:true
})


// Run the server!
fastify.listen({ port: 4000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
