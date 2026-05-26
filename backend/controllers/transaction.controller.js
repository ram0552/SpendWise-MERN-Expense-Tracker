import Transaction from "../models/Transaction.js";

export const addTransaction = async (
  req,
  res
) => {
  try {
    const transaction =
      await Transaction.create({
        ...req.body,
        user: req.user._id,
      });

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTransactions =
  async (req, res) => {

    try {

      const {
        startDate,
        endDate,
        category,
        type,
      } = req.query;

      const filter = {
        user: req.user._id,
      };

      if (startDate && endDate) {

        filter.date = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      if (category) {
        filter.category = category;
      }

      if (type) {
        filter.type = type;
      }

      const transactions =
        await Transaction.find(filter)
          .sort({
            date: -1,
          });

      res.status(200).json({
        success: true,
        transactions,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateTransaction = async (
  req,
  res
) => {
  try {
    const transaction =
      await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    const allowedUpdates = {
  type: req.body.type,
  amount: req.body.amount,
  category: req.body.category,
  paymentMethod:
    req.body.paymentMethod,
  date: req.body.date,
  description:
    req.body.description,
};

const updatedTransaction =
  await Transaction.findByIdAndUpdate(
    req.params.id,
    allowedUpdates,
    {
      new: true,
    }
  );

    res.status(200).json({
      success: true,
      transaction: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTransaction = async (
  req,
  res
) => {
  try {
    const transaction =
      await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};