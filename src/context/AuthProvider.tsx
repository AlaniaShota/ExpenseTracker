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
  reauthenticateWithCredential,
  EmailAuthProvider,
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Expense, UserDetails } from "../Interface/Type";
import { auth, db, storage } from "../firebase";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  userDetails: UserDetails | null;
  expenses: Expense[] | null;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[] | null>>;
  updateUserDetails: (firstName: string, lastName: string) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
  updateUserPhone: (phone: string) => Promise<void>;
  updateUserPassword: (
    newPassword: string,
    currentPassword: string
  ) => Promise<void>;
  updateUserAvatar: (avatar: File) => Promise<void>;
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
            setUserDetails(null);
          }
          const q = query(
            collection(db, "expenses"),
            where("userId", "==", user.uid),
          );
          const querySnapshot = await getDocs(q);
          const expensesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Expense[];
          setExpenses(expensesList);
        } catch (error) {
          toast.error(`Error updating document:${error}`, {
            position: "bottom-right",
          });
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

  const updateUserDetails = async (firstName: string, lastName: string) => {
    if (user) {
      const updates: Partial<UserDetails> = { firstName, lastName };
      try {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });

        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, updates);

        setUserDetails(
          (prevDetails) =>
            ({
              ...prevDetails,
              ...updates,
            } as UserDetails),
        );
      } catch (error) {
        toast.error(`Error updating document:${error}`, {
          position: "bottom-right",
        });
        toast.error("Error updating profile", {
          position: "bottom-right",
        });
      }
    }
  };

  const updateUserAvatar = async (avatar: File) => {
    if (user) {
      try {
        const avatarURL = await uploadAvatar(avatar);
        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, { photoURL: avatarURL });
        setUserDetails(
          (prevDetails) =>
            ({
              ...prevDetails,
              photoURL: avatarURL,
            } as UserDetails),
        );
      } catch (error) {
        toast.error(`Error updating document:${error}`, {
          position: "bottom-right",
        });

        toast.error("Error updating avatar", {
          position: "bottom-right",
        });
      }
    }
  };

  const uploadAvatar = async (avatar: File): Promise<string> => {
    try {
      const imgRef = ref(
        storage,
        `avatars/${user!.uid}_${Date.now()}_${avatar.name}`,
      );
      await uploadBytes(imgRef, avatar);
      return await getDownloadURL(imgRef);
    } catch (error) {
      toast.error(`Error updating document:${error}`, {
        position: "bottom-right",
      });
      throw new Error("Error uploading avatar");
    }
  };

  const updateUserPassword = async (
    newPassword: string,
    currentPassword: string,
  ) => {
    if (user) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email!,
          currentPassword,
        );

        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      } catch (error) {
        if ((error as Error).message.includes("auth/requires-recent-login")) {
          toast.error(`Error updating document:${error}`, {
            position: "bottom-right",
          });
          throw new Error(
            `Error reauthenticating user: ${(error as Error).message}`,
          );
        } else {
          toast.error(`Error updating document:${error}`, {
            position: "bottom-right",
          });
          throw new Error(
            `Error updating password: ${(error as Error).message}`,
          );
        }
      }
    } else {
      throw new Error("No user is currently logged in");
    }
  };

  const updateUserEmail = async (email: string) => {
    if (user) {
      try {
        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, { email });
        setUserDetails(
          (prevDetails) =>
            ({
              ...prevDetails,
              email,
            } as UserDetails),
        );
      } catch (error) {
        toast.error(`Error updating document:${error}`, {
          position: "bottom-right",
        });
        toast.error("Error updating email", {
          position: "bottom-right",
        });
      }
    }
  };

  const updateUserPhone = async (phone: string) => {
    if (user) {
      try {
        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, { phone });
        setUserDetails(
          (prevDetails) =>
            ({
              ...prevDetails,
              phone,
            } as UserDetails),
        );
      } catch (error) {
        toast.error(`Error updating document:${error}`, {
          position: "bottom-right",
        });
      }
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
        updateUserEmail,
        updateUserPhone,
        updateUserPassword,
        updateUserAvatar,
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
