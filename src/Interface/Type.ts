export interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: number
    photoURL?: string
}

export interface Expense {
    id: string;
    date: any;
    category: string;
    amount: number;
    type: "income" | "expense";
    [key: string]: any;
}