export interface UserDetails {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string
    photoURL?: string
}

export interface Expense {
    id: string;
    date:  Date | string;
    category: string;
    amount: number;
    type: "income" | "expense";
    [key: string]: string | number | Date;
}