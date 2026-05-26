import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../services/api";

import TransactionForm from "../../components/forms/TransactionForm";

import TransactionTable from "../../components/tables/TransactionTable";

import { CSVLink } from "react-csv";


const Transactions = () => {
  const [transactions, setTransactions] =
    useState([]);

  const [editingTransaction,
    setEditingTransaction] =
    useState(null);

  const [search, setSearch] =
    useState("");

    const [filters, setFilters] =
    useState({
      startDate: "",
      endDate: "",
      type: "",
    });

    const [loading, setLoading] =
  useState(false);

  const fetchTransactions =
  async () => {

    try {
      setLoading(true);

      const query =
        new URLSearchParams(
          filters
        ).toString();

      const response =
        await API.get(
          `/transactions?${query}`
        );

      setTransactions(
        response.data.transactions
      );


    } catch (error) {

      console.log(error);
    }
    finally {

      setLoading(false);
    }
  };

    useEffect(() => {
      fetchTransactions();
    }, [filters]);


  const handleSubmit = async (data) => {
  try {

    const payload = {
      type: data.type,
      amount: Number(data.amount),
      category: data.category,
      paymentMethod:
        data.paymentMethod,
      date: data.date,
      description:
        data.description,
    };

    if (editingTransaction) {

      await API.put(
        `/transactions/${editingTransaction._id}`,
        payload
      );

      toast.success(
        "Transaction Updated"
      );

      setEditingTransaction(null);

    } else {

      await API.post(
        "/transactions",
        payload
      );

      toast.success(
        "Transaction Added"
      );
    }

    fetchTransactions();

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Operation Failed"
    );
  }
};

  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/transactions/${id}`
      );

      toast.success(
        "Transaction Deleted"
      );

      fetchTransactions();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const filteredTransactions =
  transactions.filter((item) =>
    (item.category || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Transactions
        </h1>

        <TransactionForm
          onSubmit={handleSubmit}
          initialData={
            editingTransaction
          }
          isEditing={
            !!editingTransaction
          }
        />

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-3 border rounded-lg"
        />
        <div className="bg-white p-6 rounded-xl shadow-md">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <input
      type="date"
      value={filters.startDate}
      onChange={(e) =>
        setFilters({
          ...filters,
          startDate:
            e.target.value,
        })
      }
      className="p-3 border rounded-lg"
    />

    <input
      type="date"
      value={filters.endDate}
      onChange={(e) =>
        setFilters({
          ...filters,
          endDate:
            e.target.value,
        })
      }
      className="p-3 border rounded-lg"
    />

    <select
      value={filters.type}
      onChange={(e) =>
        setFilters({
          ...filters,
          type:
            e.target.value,
        })
      }
      className="p-3 border rounded-lg"
    >
      <option value="">
        All Types
      </option>

      <option value="income">
        Income
      </option>

      <option value="expense">
        Expense
      </option>
    </select>
  </div>
</div>
<div className="flex justify-end">
  <CSVLink
    data={transactions}
    filename="transactions-report.csv"
    className="bg-green-600 text-white px-6 py-3 rounded-lg"
  >
    Export CSV
  </CSVLink>
</div>

        <TransactionTable
          transactions={
            filteredTransactions
          }
          onDelete={handleDelete}
          onEdit={
            setEditingTransaction
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default Transactions;