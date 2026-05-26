import { useEffect } from "react";

import { useForm } from "react-hook-form";

const TransactionForm = ({
  onSubmit,
  initialData,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
  if (initialData) {
    reset({
      type: initialData.type,
      amount: initialData.amount,
      category: initialData.category,
      paymentMethod:
        initialData.paymentMethod,
      date: initialData.date
        ? initialData.date.split("T")[0]
        : "",
      description:
        initialData.description,
    });
  }
}, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          {...register("type")}
          className="p-3 border rounded-lg"
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          {...register("amount")}
          className="p-3 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Category"
          {...register("category")}
          className="p-3 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Payment Method"
          {...register("paymentMethod")}
          className="p-3 border rounded-lg"
        />

        <input
          type="date"
          {...register("date")}
          className="p-3 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Description"
          {...register("description")}
          className="p-3 border rounded-lg md:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        {isEditing
          ? "Update Transaction"
          : "Save Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;