const TransactionTable = ({
  transactions,
  onDelete,
  onEdit,
}) => {
  
  if (!transactions.length) {
  return (
    <div className="bg-white p-10 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-slate-500">
        No Transactions Found
      </h2>
    </div>
  );
}
  return (
    <div className="bg-white  rounded-xl shadow-md overflow-x-auto">
      
      <table className="bg-white dark:bg-slate-800 w-full">
        <thead className="
          bg-slate-100
          dark:bg-slate-700
          text-gray-700
          dark:text-gray-200
          "
        >          <tr>
            <th className="p-4 text-left">
              Type
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr
              key={item._id}
              className="border-b"
            >
              <td className="p-4 capitalize">
                {item.type}
              </td>

              <td className="p-4">
                ₹ {item.amount}
              </td>

              <td className="p-4">
                {item.category || "-"}
              </td>

              <td className="p-4">
                {new Date(
                  item.date
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;