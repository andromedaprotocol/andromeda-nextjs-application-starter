"use client";

import { useState } from "react";
import { Button } from "app";
import { Input } from "./input";
import { useAndromedaStore } from "@/zustand/andromeda";

const SplitterTransaction = () => {
  const [recipients, setRecipients] = useState([{ address: "", amount: "" }]);
  const { keplr, isConnected, userAddress, executeContract } =
    useAndromedaStore();
  const contractAddress = "andromeda_contract_address_here"; // Replace with actual contract address

  const handleAddRecipient = () => {
    setRecipients([...recipients, { address: "", amount: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field as "address" | "amount"] = value;
    setRecipients(updatedRecipients);
  };

  const handleSplitFunds = async () => {
    if (!isConnected || !keplr) {
      alert("Please connect your wallet first.");
      return;
    }

    // Validate inputs
    for (const { address, amount } of recipients) {
      if (
        !address ||
        !amount ||
        isNaN(parseFloat(amount)) ||
        parseFloat(amount) <= 0
      ) {
        alert("Please enter valid recipient details.");
        return;
      }
    }

    if (!executeContract) {
      alert("Contract execution function is not available.");
      return;
    }

    try {
      const msg = {
        sender: userAddress,
        recipients: recipients.map(({ address, amount }) => ({
          address,
          amount: (parseFloat(amount) * 1_000_000).toString(), // Convert to micro-denom
        })),
      };

      await executeContract(keplr, contractAddress, msg);
      alert("Transaction successful!");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please check your input and try again.");
    }
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Splitter Transaction</h2>
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
      <Button onClick={handleSplitFunds} className="w-full">
        Split Funds
      </Button>
    </div>
  );
};

export default SplitterTransaction;
