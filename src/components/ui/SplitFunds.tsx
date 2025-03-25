"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAndromedaStore } from "@/zustand/andromeda";
import { Input } from "@/components/ui/input";
import { useSplitter } from "@/modules/splitter/hooks/useSplitter";
import { FundSelector } from "@/modules/splitter/components/FundSelector";
import { Recipient } from "@/modules/splitter/types";

const SplitFunds = () => {
  const { keplr, isConnected } = useAndromedaStore();
  const {
    createNewSplitter,
    useExistingSplitter,
    splitFunds,
    updateRecipients,
  } = useSplitter();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [newRecipientAddress, setNewRecipientAddress] = useState("");
  const [newRecipientPercentage, setNewRecipientPercentage] = useState("");
  const [vfsReference, setVfsReference] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddRecipient = () => {
    if (!newRecipientAddress || !newRecipientPercentage) return;

    const percentage = parseFloat(newRecipientPercentage);
    if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
      setError("Percentage must be between 0 and 100");
      return;
    }

    const newRecipient: Recipient = {
      address: newRecipientAddress,
      percentage,
    };

    setRecipients([...recipients, newRecipient]);
    setNewRecipientAddress("");
    setNewRecipientPercentage("");
    setError(null);
  };

  const handleRemoveRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const handleCreateNew = async () => {
    if (!isConnected || !keplr) {
      setError("Please connect your wallet first.");
      return;
    }

    if (recipients.length === 0) {
      setError("Please add at least one recipient");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await createNewSplitter();
      await updateRecipients(recipients);
      setRecipients([]);
    } catch (err) {
      setError("Failed to create splitter");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseExisting = async () => {
    if (!isConnected || !keplr) {
      setError("Please connect your wallet first.");
      return;
    }

    if (!vfsReference) {
      setError("Please enter a VFS reference");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await useExistingSplitter(vfsReference);
    } catch (err) {
      setError("Failed to load existing splitter");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSplitFunds = async () => {
    if (!isConnected || !keplr) {
      setError("Please connect your wallet first.");
      return;
    }

    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await splitFunds(amount);
      setAmount("");
    } catch (err) {
      setError("Failed to split funds");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-16">
      <div className="p-6 bg-card rounded-lg shadow-md space-y-6 max-w-2xl w-full">
        <h2 className="text-xl font-bold text-center mb-4">Split Funds</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Create New Splitter</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newRecipientAddress}
                  onChange={(e) => setNewRecipientAddress(e.target.value)}
                  placeholder="Recipient Address"
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={newRecipientPercentage}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      value === "" ||
                      (parseFloat(value) >= 0 && parseFloat(value) <= 100)
                    ) {
                      setNewRecipientPercentage(value);
                    }
                  }}
                  placeholder="Percentage"
                  className="w-32"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <Button onClick={handleAddRecipient}>Add Recipient</Button>
              </div>

              <div className="space-y-2">
                {recipients.map((recipient, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1">{recipient.address}</span>
                    <span>{recipient.percentage}%</span>
                    <Button
                      onClick={() => handleRemoveRecipient(index)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleCreateNew}
                disabled={isLoading || recipients.length === 0}
                className="w-full"
              >
                {isLoading ? "Creating..." : "Create New Splitter"}
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Use Existing Splitter
            </h3>
            <div className="flex gap-2">
              <Input
                type="text"
                value={vfsReference}
                onChange={(e) => setVfsReference(e.target.value)}
                placeholder="Enter VFS Reference"
                className="flex-1"
              />
              <Button onClick={handleUseExisting} disabled={isLoading}>
                {isLoading ? "Loading..." : "Use Existing"}
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Split Funds</h3>
            <div className="space-y-2">
              <FundSelector
                value={amount}
                onChange={setAmount}
                disabled={isLoading}
              />
              <Button
                onClick={handleSplitFunds}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Splitting..." : "Split Funds"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitFunds;
