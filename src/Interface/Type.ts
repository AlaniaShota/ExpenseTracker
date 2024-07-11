export interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
}

export interface Expense {
    id: string;
    date: { seconds: number };
    category: string;
    amount: number;
    type: string;
    [key: string]: any;
}