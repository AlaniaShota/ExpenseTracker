import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth, db } from "../components/firebase";
import { User } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { UserDetails, Expense } from "../Interface/Type";

interface AuthContextType {
  user: User | null;
  userDetails: UserDetails | null;
  expenses: Expense[] | null;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[] | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [expenses, setExpenses] = useState<Expense[] | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data() as UserDetails);
          } else {
            console.log("No such document!");
            setUserDetails(null);
          }

          // Fetch expenses
          const q = query(
            collection(db, "expenses"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const expensesList = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              date: data.date,
              category: data.category,
              amount: data.amount,
              type: data.type,
              ...data,
            } as Expense;
          });
          setExpenses(expensesList);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setUserDetails(null);
          setExpenses(null);
        }
      } else {
        setUserDetails(null);
        setExpenses(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userDetails, expenses, setExpenses }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
