import { connectPostgres } from "../connectors/postgres.js";

export const getRolePermissions = async(request,response) => {
    const db = connectPostgres()
    const query = 'SELECT * FROM role_permissions'
    const rolePermissions =await db.any(query)
    return rolePermissions

}
export const getRolePermissionsById = async (request, response) => {
  const db = connectPostgres()
  const { role_id } = request.params
  const query = 'SELECT * FROM role_permissions WHERE role_id=$[role_id]'
  const roles = await db.any(query, { role_id })
  return roles
}
