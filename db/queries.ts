"use server"
import { db } from './db'
import { employeeTable, InsertEmployee } from './schema'

export async function createEmployee(data:InsertEmployee){
   await db.insert(employeeTable).values(data).onConflictDoNothing();
}