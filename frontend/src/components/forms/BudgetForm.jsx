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
      onSubmit={handleSubmit(
        submitHandler
      )}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Category"
          {...register("category")}
          className="p-3 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Limit"
          {...register("limit")}
          className="p-3 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Month"
          {...register("month")}
          className="p-3 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Year"
          {...register("year")}
          className="p-3 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Create Budget
      </button>
    </form>
  );
};

export default BudgetForm;