"use client";

import { useState } from "react";
import { Button } from "app";
import { useAndromedaStore } from "@/zustand/andromeda";
import { Input } from "@/components/ui/input";

const SplitFunds = () => {
  const [recipients, setRecipients] = useState([{ address: "", amount: "" }]);
  const { keplr, isConnected } = useAndromedaStore();

  const handleAddRecipient = () => {
    setRecipients([...recipients, { address: "", amount: "" }]);
  };

  const handleChange = (
    index: number,
    field: "address" | "amount",
    value: string
  ) => {
    const updatedRecipients = [...recipients];
    if (updatedRecipients[index]) {
      updatedRecipients[index][field] = value;
      setRecipients(updatedRecipients);
    }
  };

  const handleSplitFunds = async () => {
    if (!isConnected || !keplr) {
      alert("Please connect your wallet first.");
      return;
    }

    console.log("Splitting funds:", recipients);
    // TODO: Implement fund splitting logic with Andromeda
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Split Funds</h2>
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
      <Button onClick={handleAddRecipient} className="mb-4">
        + Add Recipient
      </Button>
      <Button onClick={handleSplitFunds} className="w-full">
        Split Funds
      </Button>
    </div>
  );
};

export default SplitFunds;
