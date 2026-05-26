import Transaction from "../models/Transaction.js";

export const getAnalytics =
  async (req, res) => {
    try {

      const userId =
        req.user._id;

      const summary =
        await Transaction.aggregate([
          {
            $match: {
              user: userId,
            },
          },

          {
            $group: {
              _id: "$type",

              total: {
                $sum: "$amount",
              },
            },
          },
        ]);

      let totalIncome = 0;
      let totalExpense = 0;

      summary.forEach((item) => {

        if (
          item._id === "income"
        ) {
          totalIncome =
            item.total;
        }

        if (
          item._id === "expense"
        ) {
          totalExpense =
            item.total;
        }
      });

      const balance =
        totalIncome -
        totalExpense;

      res.status(200).json({
        success: true,

        analytics: {
          totalIncome,
          totalExpense,
          balance,
        },
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const getMonthlyAnalytics =
  async (req, res) => {

    try {

      const monthlyData =
        await Transaction.aggregate([

          {
            $match: {
              user: req.user._id,
            },
          },

          {
            $group: {

              _id: {
                month: {
                  $month: "$date",
                },

                year: {
                  $year: "$date",
                },

                type: "$type",
              },

              total: {
                $sum: "$amount",
              },
            },
          },

          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },
        ]);

      res.status(200).json({
        success: true,
        monthlyData,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const getCategoryAnalytics =
  async (req, res) => {

    try {

      const categoryData =
        await Transaction.aggregate([

          {
            $match: {
              user: req.user._id,
              type: "expense",
            },
          },

          {
            $group: {

              _id: "$category",

              total: {
                $sum: "$amount",
              },
            },
          },

          {
            $sort: {
              total: -1,
            },
          },
        ]);

      res.status(200).json({
        success: true,
        categoryData,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };