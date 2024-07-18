import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { UserDetails, Expense } from "../../Interface/Type";
import EditForm from "../../components/EditForm";
import { auth, db } from "../../components/firebase";
import AddCard from "./component/AddCard";
import ExpenseList from "./component/ExpenseList";
import Modal from "react-modal";
import { Input } from "react-select/animated";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import "./style/index.scss";
Modal.setAppElement("#root");

const List = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchExpenses = async (userId: string) => {
    try {
      const q = query(
        collection(db, "expenses"),
        where("userId", "==", userId)
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchExpenses(user.uid);
        fetchUserData(user);
      } else {
        setExpenses([]);
        setLoading(false);
        setUserDetails(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (user: FirebaseUser) => {
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data() as UserDetails);
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("User is not logged in");
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      if (auth.currentUser) {
        fetchExpenses(auth.currentUser.uid);
        toast.error("Expense is deleted", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error deleting expense: ", error);
    }
  };

  const editExpense = (expense: Expense) => {
    setCurrentExpense(expense);
    setShowEditForm(true);
  };

  const updateExpenses = () => {
    if (auth.currentUser) {
      fetchExpenses(auth.currentUser.uid);
      toast.success("Expense is update", {
        position: "bottom-right",
      });
    }
    setShowEditForm(false);
  };

  return (
    <>
      <h2 className="list-page-title">Transaction</h2>

      {userDetails ? (
        <div className="list-content">
          {auth.currentUser && (
            <div className="expense-add-content">
              <button
                onClick={() => setIsModalOpen(true)}
                className="expense-add add expense hover-border-5"
              >
                <AiOutlinePlus color="#fff" size={30} />
              </button>
            </div>
          )}
          {showEditForm && currentExpense ? (
            <EditForm
              expenses={currentExpense}
              onUpdate={updateExpenses}
              onCancel={() => setShowEditForm(false)}
            />
          ) : (
            <ExpenseList
              expenses={expenses}
              loading={loading}
              onDelete={deleteExpense}
              onEdit={editExpense}
            />
          )}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="+"
          >
            <AddCard
              onAddExpense={() => {
                fetchExpenses(auth.currentUser!.uid);
                setIsModalOpen(false);
              }}
            />
          </Modal>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default List;
