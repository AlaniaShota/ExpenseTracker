export interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
}

export interface Expense {
    id: string;
    date: { seconds: number, nanoseconds: number };
    category: string;
    amount: number;
    type: string;
    salary: number;
    rent: number;
    bonuses: number;
    freelance: number
    [key: string]: any;
}