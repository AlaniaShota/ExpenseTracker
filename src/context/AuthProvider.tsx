import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  User,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Expense, UserDetails } from "../Interface/Type";
import { auth, db, storage } from "../components/firebase";
interface AuthContextType {
  user: User | null;
  userDetails: UserDetails | null;
  expenses: Expense[] | null;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[] | null>>;
  updateUserDetails: (
    firstName: string,
    lastName: string,
    avatar?: File | null
  ) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
          const expensesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Expense[];
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

  const updateUserDetails = async (
    firstName: string,
    lastName: string,
    avatar?: File
  ) => {
    if (user) {
      const updates: Partial<UserDetails> = { firstName, lastName };
  
      if (avatar) {
        try {
          const avatarURL = await uploadAvatar(avatar);
          updates.photoURL = avatarURL;
        } catch (error) {
          alert("Error uploading avatar");
          return;
        }
      }
  
      try {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
          photoURL: updates.photoURL || user.photoURL,
        });

        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, updates);

        setUserDetails((prevDetails) => ({
          ...prevDetails,
          ...updates,
        }) as UserDetails);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile");
      }
    }
  };
  

  const uploadAvatar = async (avatar: File): Promise<string> => {
    try {
      const imgRef = ref(storage, `avatars/${user.uid}_${Date.now()}_${avatar.name}`);
      await uploadBytes(imgRef, avatar);
      return await getDownloadURL(imgRef);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw new Error("Error uploading avatar");
    }
  };

  const updateUserPassword = async (password: string) => {
    if (user) {
      await updatePassword(user, password);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails,
        expenses,
        setExpenses,
        updateUserDetails,
        updateUserPassword,
      }}
    >
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
