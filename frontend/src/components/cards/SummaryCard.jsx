
const SummaryCard = ({
  title,
  amount,
  color,
}) => {
  return (
    <div className="bg-whit dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h3 className="text-slate-500 mb-2">
        {title}
      </h3>

      <h1
        className={`text-3xl font-bold ${color}`}
      >
        ₹ {amount}
      </h1>
    </div>
  );
};

export default SummaryCard;