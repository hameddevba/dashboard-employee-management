
export type Payment = {
   id: string
   name:string,
   lastName:string,
   NNI:number,
   phone:number,
   amount: number
   status: "pending" | "processing" | "success" | "failed"
   email: string
 }

const statuses: Payment['status'][] = ["pending", "processing", "success", "failed"];

export const generateRandomPayments = (count: number): Payment[] => {
   return Array.from({ length: count }, (_, index) => ({
     id: `id${index.toString().padStart(2, '0')}${Math.random().toString(36).substr(2, 5)}`,
     name: `Name${index}`,
     lastName: `LastName${index}`,
     NNI: Math.floor(100000000 + Math.random() * 900000000),
     phone: Math.floor(10000000 + Math.random() * 90000000),
     amount: Math.floor(10 + Math.random() * 990),
     status: statuses[Math.floor(Math.random() * statuses.length)],
     email: `user${index+1}@example.com`,
   }));
 };


export const fetchPayments = (): Promise<Payment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateRandomPayments(20));
    }, 1000); // Simulating network delay
  });
};