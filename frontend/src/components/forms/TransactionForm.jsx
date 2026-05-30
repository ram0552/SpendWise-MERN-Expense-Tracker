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
      className="
        bg-white
        dark:bg-slate-800
        p-6
        rounded-xl
        shadow-md
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <select
          {...register("type")}
          className="
            p-3
            border
            rounded-lg
            bg-white
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
          "
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
          className="
            p-3
            border
            rounded-lg
            bg-white
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
          "
        />

        <select
          {...register("category")}
          className="
            p-3
            border
            rounded-lg
            bg-white
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
          "
        >
          <option value="">
            Select Category
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Health">
            Health
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Salary">
            Salary
          </option>

          <option value="Freelance">
            Freelance
          </option>

          <option value="Investment">
            Investment
          </option>
        </select>

        <select
          {...register("paymentMethod")}
          className="
            p-3
            border
            rounded-lg
            bg-white
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
          "
        >
          <option value="">
            Payment Method
          </option>

          <option value="Cash">
            Cash
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="Card">
            Card
          </option>

          <option value="Bank Transfer">
            Bank Transfer
          </option>
        </select>

        <input
          type="date"
          {...register("date")}
          className="
            p-3
            border
            rounded-lg
            bg-white
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
          "
        />

        <input
          type="text"
          placeholder="Description"
          {...register("description")}
          className="
            p-3
            border
            rounded-lg
            md:col-span-2
            bg-white
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
          "
        />

      </div>

      <button
        type="submit"
        className="
          mt-5
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          px-6
          py-3
          rounded-lg
          transition
          duration-200
        "
      >
        {isEditing
          ? "Update Transaction"
          : "Save Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;