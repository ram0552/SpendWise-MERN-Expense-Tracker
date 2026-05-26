const BudgetCard = ({
  item,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {item.category}
        </h2>

        {item.exceeded ? (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
            Exceeded
          </span>
        ) : (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            Safe
          </span>
        )}
      </div>

      <div className="space-y-2">
        <p>
          Budget:
          <strong>
            ₹ {item.limit}
          </strong>
        </p>

        <p>
          Spent:
          <strong>
            ₹ {item.spent}
          </strong>
        </p>

        <p>
          Remaining:
          <strong>
            ₹ {item.remaining}
          </strong>
        </p>
      </div>

      <div className="mt-4">
        <div className="w-full bg-slate-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${
              item.exceeded
                ? "bg-red-500"
                : "bg-indigo-500"
            }`}
            style={{
              width: `${item.percentage}%`,
            }}
          />
        </div>

        <p className="text-sm mt-2">
          {item.percentage}% Used
        </p>
      </div>
    </div>
  );
};

export default BudgetCard;