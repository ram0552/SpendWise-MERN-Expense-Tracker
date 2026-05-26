import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

export const createBudget = async (
  req,
  res
) => {
  try {
    const budget = await Budget.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBudgets = async (
  req,
  res
) => {
  try {
    const budgets = await Budget.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      budgets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBudgetInsights =
  async (req, res) => {

    try {

      const budgets =
        await Budget.find({
          user: req.user._id,
        });

      const transactions =
        await Transaction.find({
          user: req.user._id,
          type: "expense",
        });

      const insights =
        budgets.map((budget) => {

          const spent =
            transactions

              .filter((t) => {

                const date =
                  new Date(t.date);

                return (

                  t.category
                    .toLowerCase() ===
                  budget.category
                    .toLowerCase()

                  &&

                  date.getMonth() + 1 ===
                  budget.month

                  &&

                  date.getFullYear() ===
                  budget.year

                );
              })

              .reduce(
                (acc, item) =>
                  acc + item.amount,
                0
              );

          const remaining =
            budget.limit - spent;

          const exceeded =
            spent > budget.limit;

          const percentage =
            Math.min(
              (
                spent /
                budget.limit
              ) * 100,
              100
            );

          return {

            category:
              budget.category,

            limit:
              budget.limit,

            spent,

            remaining,

            exceeded,

            percentage:
              percentage.toFixed(1),

          };
        });

      res.status(200).json({
        success: true,
        insights,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };