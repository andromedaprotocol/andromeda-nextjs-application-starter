"use client";

import { useState } from "react";
import { Button } from "app";
import { Input } from "./input";
import { useAndromedaStore } from "@/zustand/andromeda";

const FixedBillSplitter = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [recipients, setRecipients] = useState([{ address: "", amount: "" }]);
  const { keplr, isConnected } = useAndromedaStore();

  const handleAddRecipient = () => {
    setRecipients([...recipients, { address: "", amount: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field as "address" | "amount"] = value;
    setRecipients(updatedRecipients);
  };

  const handleSplitEqually = () => {
    if (!totalAmount || recipients.length === 0) return;
    const splitAmount = (parseFloat(totalAmount) / recipients.length).toFixed(
      2
    );
    const updatedRecipients = recipients.map((r) => ({
      ...r,
      amount: splitAmount,
    }));
    setRecipients(updatedRecipients);
  };

  const handleSplitFunds = async () => {
    if (!isConnected || !keplr) {
      alert("Please connect your wallet first.");
      return;
    }
    console.log("Splitting funds:", recipients);
    // TODO: Implement fund splitting logic with Andromeda contract
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Fixed Amount Bill Splitter</h2>
      <Input
        type="number"
        placeholder="Total Amount"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
        className="mb-4"
      />
      {recipients.map((recipient, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <Input
            type="text"
            placeholder="Recipient Address"
            value={recipient.address}
            onChange={(e) => handleChange(index, "address", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={recipient.amount}
            onChange={(e) => handleChange(index, "amount", e.target.value)}
          />
        </div>
      ))}
      <Button onClick={handleAddRecipient} className="mb-2">
        + Add Recipient
      </Button>
      <Button onClick={handleSplitEqually} className="mb-4">
        Split Equally
      </Button>
      <Button onClick={handleSplitFunds} className="w-full">
        Split Funds
      </Button>
    </div>
  );
};

export default FixedBillSplitter;
