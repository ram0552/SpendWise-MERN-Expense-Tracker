import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import SummaryCard from "../../components/cards/SummaryCard";

import ExpenseChart from "../../components/charts/ExpenseChart";

import API from "../../services/api";

import MonthlyChart from "../../components/charts/MonthlyChart";

const Dashboard = () => {
  const [analytics, setAnalytics] =
    useState(null);
  const [monthlyData,setMonthlyData] =
  useState([]);

  const [transactions,
    setTransactions] =
    useState([]);

  const fetchData = async () => {
    try {
      const analyticsResponse =
        await API.get("/analytics");

      const transactionResponse =
        await API.get("/transactions");
      

      setAnalytics(
        analyticsResponse.data
          .analytics
      );

      setTransactions(
        transactionResponse.data
          .transactions
      );
      const monthlyResponse =
              await API.get(
                "/analytics/monthly"
                );

      setMonthlyData(
              monthlyResponse.data
            .monthlyData
          );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Financial Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Income"
            amount={
              analytics?.totalIncome || 0
            }
            color="text-green-500"
          />

          <SummaryCard
            title="Total Expense"
            amount={
              analytics?.totalExpense || 0
            }
            color="text-red-500"
          />

          <SummaryCard
            title="Balance"
            amount={
              analytics?.balance || 0
            }
            color="text-indigo-500"
          />
        </div>

        <ExpenseChart
          transactions={
            transactions
          }
        />
        <MonthlyChart
          data={monthlyData}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;