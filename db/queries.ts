"use server"
import { eq } from 'drizzle-orm';
import { db } from './db'
import { employeeTable, InsertEmployee, SelectEmployee } from './schema'

export async function createEmployee(data: InsertEmployee) {
   try {
      await db.insert(employeeTable).values(data).onConflictDoNothing();
   } catch (error) {
      console.error("Failed to create employee:", error);
      throw new Error("Failed to create employee");
   }
}

export async function getAllEmployees(): Promise<Array<SelectEmployee>> {
   try {
      return await db.select().from(employeeTable).orderBy(employeeTable.id);
   } catch (error) {
      console.error("Failed to retrieve employees:", error);
      throw new Error("Failed to retrieve employees");
   }
}

export async function getEmployeeById(id: SelectEmployee['id']): Promise<Array<SelectEmployee>> {
  return db.select().from(employeeTable).where(eq(employeeTable.id, id));
}

export async function updateEmployee(id: SelectEmployee['id'], data: Partial<Omit<SelectEmployee, 'id'>>) {
   await db.update(employeeTable).set(data).where(eq(employeeTable.id, id));
 }
 
export async function deleteEmployee(id: SelectEmployee['id']) {
   await db.delete(employeeTable).where(eq(employeeTable.id, id));
}

export async function checkBySelected(type: string, value: any) {
   try {
      let result;
      switch (type) {
         case "email":
            [result] = await db
               .select({ email: employeeTable.email })
               .from(employeeTable)
               .where(eq(employeeTable.email, value));
            return result?.email ?? null;

         case "nni":
            [result] = await db
               .select({ nni: employeeTable.nni })
               .from(employeeTable)
               .where(eq(employeeTable.nni, value));
            return result?.nni ?? null;

         case "code":
            [result] = await db
               .select({ code: employeeTable.code })
               .from(employeeTable)
               .where(eq(employeeTable.code, value));
            return result?.code ?? null;

         default:
            throw new Error("Invalid type provided");
      }
   } catch (error) {
      console.error(`Database query failed for type: ${type}, value: ${value}`, error);
      return null;
   }
}


