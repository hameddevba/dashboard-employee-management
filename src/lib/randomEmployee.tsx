




//  export type Employees ={
//    name: string;
//    nni: string;
//    age: number;
//    phone: number;
//    email: string;
//    code: string;
//    id?: number | undefined;
//    lastName?: string | null | undefined;
//  }


export const generateRandomEmployee =  (count: number) => {
     const data= Array.from({ length: count }, (_, index) => ({
     name: `Name${index}`,
     nni: `${Math.floor(100000000 + Math.random() * 900000000)}`,
     age: Math.floor(10000000 + Math.random() * 90000000),
     phone: Math.floor(10 + Math.random() * 990),
     email: `email${index}@gmail.com`,
     code: `code${index}`,
     lastName: `LastName${index}`,
   }));

   return data
 };

// generateRandomEmployee(20);
 
// export const fetchPayments = (): Promise<Payment[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(generateRandomPayments(20));
//     }, 1000); // Simulating network delay
//   });
// };


