import { useForm } from "react-hook-form";

const BudgetForm = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      limit: Number(data.limit),
      month: Number(data.month),
      year: Number(data.year),
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="
        bg-white
        dark:bg-slate-800
        p-6
        rounded-xl
        shadow-md
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <input
          type="text"
          placeholder="Category"
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
        />

        <input
          type="number"
          placeholder="Limit"
          {...register("limit")}
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
          {...register("month")}
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
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select
          {...register("year")}
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
          <option value="">Select Year</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>

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
        Create Budget
      </button>
    </form>
  );
};

export default BudgetForm;