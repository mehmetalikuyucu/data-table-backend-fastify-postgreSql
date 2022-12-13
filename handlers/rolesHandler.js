import { connectPostgres } from "../connectors/postgres.js";

export const getRoles=async(request,response) => {
    const db = connectPostgres()
    const query = 'SELECT *FROM roles'
    const roles =await db.any(query)
    return roles

}


