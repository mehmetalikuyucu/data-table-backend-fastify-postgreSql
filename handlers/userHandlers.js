import { connectPostgres } from '../connectors/postgres.js'
import { uid } from 'uid'
//get
export const getAllUsers = async (request, response) => {
  const db = connectPostgres()
  const users = await db.any('SELECT * FROM users')
  response.send(users)
}

//get
export const getUser = async (request, response) => {
  const db = connectPostgres()
  const { email, password } = request.params
  const user = await db.oneOrNone(
    `SELECT * FROM USERS WHERE email = $[email]`,
    {
      email
    }
  )
  if (!user) {
    return response.send({
      error: 'user not found'
    })
  }
  if (password !== user.password) {
    return response.send({
      error: 'incorrect password'
    })
  }

  return user
}

//post
export const addUser = async (request, response) => {
  const db = connectPostgres()
  const user_id = uid()
  const { email, password, firstname, lastname, secondary_email, gsm } =
    request.body
  const user = await db.query(
    `INSERT INTO USERS (user_id,email, password,secondary_email, gsm, firstname,lastname, status) VALUES ($[user_id],$[email],$[password],$[secondary_email],$[gsm],$[firstname],$[lastname],$[status])`,
    {
      user_id,
      email,
      password,
      secondary_email,
      gsm,
      firstname,
      lastname,
      status: 'ACTIVE'
    }
  )
  return user
}

//delete
export const deleteUser = async (request, response) => {
  const db = connectPostgres()
  const { id } = request.params
  const user = await db.query('DELETE FROM USERS WHERE user_id =$[id]', { id })
  return user
}

//Put
export const updateUser = async (request, response) => {
  const db = connectPostgres()
  const { id } = request.params
  const { email, password, firstname, lastname, status } = request.body
  const user = await db.query(
    `UPDATE USERS SET email = $[email], password = $[password], firstname = $[firstname], lastname = $[lastname], status=$[status] WHERE user_id = $[id]`,
    { email, password, firstname, lastname, status, id }
  )
  return user
}

//get user_roles
export const getUserRoles = async (request, response) => {
  const db = connectPostgres()
  const query = 'SELECT * FROM user_roles'
  const userRoles = await db.any(query)
  return userRoles
}

export const getUserRolesById = async (request, response) => {
  const db = connectPostgres()
    const { user_id } = request.params
  const query = `SELECT * FROM user_roles WHERE user_id=$[user_id]`
  const result = await db.one(query, { user_id })
  return result
}

//post user_roles
export const addUserRoles = async (request, response) => {
  const db = connectPostgres()
  const { user_id, role_id } = request.body
  const query =
    'INSERT INTO user_roles (user_id, role_id) VALUES ($[user_id], $[role_id]) RETURNING user_role_id, created_at, updated_at'
  const result = await db.one(query, { user_id, role_id })
  return result
}

//get user_id Permissions
export const getPermissionsByUserId = async (request, response) => {
  const db = connectPostgres()
  const { user_id } = request.params
  const query =
    '	SELECT  rp.permission_id FROM user_roles ur INNER JOIN role_permissions rp ON rp.role_id = ur.role_id WHERE ur.user_id =$[user_id];'
  const result = await db.any(query, { user_id})
  return result
}


