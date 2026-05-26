import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../services/api";

import BudgetForm from "../../components/forms/BudgetForm";

import BudgetCard from "../../components/cards/BudgetCard";

const Budgets = () => {
  const [budgets, setBudgets] =
    useState([]);

  const fetchBudgets = async () => {
    try {

      const response =
        await API.get(
          "/budget/insights"
        );

      setBudgets(
        response.data.insights
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleCreateBudget =
    async (data) => {
      try {

        await API.post(
          "/budget",
          data
        );

        toast.success(
          "Budget Created"
        );

        fetchBudgets();

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );
      }
    };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Budget Tracking
        </h1>

        <BudgetForm
          onSubmit={
            handleCreateBudget
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map(
            (item, index) => (
              <BudgetCard
                key={index}
                item={item}
              />
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Budgets;