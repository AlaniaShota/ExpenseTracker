export interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
}

export interface Expense {
    id: string;
    date: any;
    category: string;
    amount: number;
    type: "income" | "expense";
    // salary: number;
    // rent: number;
    // bonuses: number;
    // freelance: number
    [key: string]: any;
}