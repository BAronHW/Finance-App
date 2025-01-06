"use client";

import Link from "next/link";
import Header from "@//components/Header";
import { Button } from "@//components/ui/button";
import TestComp from "@//components/testComp";
import { BentoDemo } from "@//components/BentoDemo";
import { useParams } from "next/navigation";
import { TransactionsTable } from "@//components/transactionsTable";
import { useAuth } from "@//lib/Contexts/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS_BY_USER_ID } from "@//lib/GraphQL/Transaction";
import { columns } from "@//components/transactionsTableColumns";

export default function Home() {
  const params = useParams();
  const userId = Array.isArray(params?.userId) ? Number(params?.userId[0]) : Number(params?.userId);
  const auth = useAuth();
  const currentUser = auth.currentUser;

  const { data: data } = useQuery(GET_TRANSACTIONS_BY_USER_ID, {
    variables: {
      userId: userId
    }
  })

  const transactionData = data?.getTransactionsByUserId ?? [];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          name={currentUser?.displayName ?? ""}
          appMoto="Manage your student funds"
          accBal={10}
        />
      </div>
      <main className="flex-grow flex items-center justify-center flex-col gap-10 m-7">
        <div className="mt-6 space-y-4 text-center">
          <p className="text-lg">View your transactions below:</p>
          <TransactionsTable columns={columns} data={transactionData} />
        </div>
      </main>
    </div>
  );
}
