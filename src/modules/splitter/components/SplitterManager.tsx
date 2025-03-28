import React, { useState } from "react";
import { useSplitterStore } from "../store";
import { useSplitter } from "../hooks/useSplitter";
import { Recipient } from "../types";

export const SplitterManager: React.FC = () => {
  const {
    currentSplitter,
    setCurrentSplitter,
    addRecipient,
    removeRecipient,
    updateRecipientPercentage,
  } = useSplitterStore();

  const {
    createNewSplitter,
    useExistingSplitter,
    splitFunds,
    updateRecipients,
  } = useSplitter();

  const [newRecipientAddress, setNewRecipientAddress] = useState("");
  const [newRecipientPercentage, setNewRecipientPercentage] = useState("");
  const [vfsReference, setVfsReference] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddRecipient = async () => {
    if (!newRecipientAddress || !newRecipientPercentage) return;

    const recipient: Recipient = {
      address: newRecipientAddress,
      percentage: parseFloat(newRecipientPercentage),
    };

    addRecipient(recipient);

    if (currentSplitter) {
      setIsLoading(true);
      try {
        await updateRecipients([
          ...currentSplitter.config.recipients,
          recipient,
        ]);
      } catch (error) {
        console.error("Failed to update recipients:", error);
      } finally {
        setIsLoading(false);
      }
    }

    setNewRecipientAddress("");
    setNewRecipientPercentage("");
  };

  const handleCreateNew = async () => {
    setIsLoading(true);
    try {
      await createNewSplitter();
    } catch (error) {
      console.error("Failed to create splitter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseExisting = async () => {
    if (!vfsReference) return;

    setIsLoading(true);
    try {
      await useExistingSplitter(vfsReference);
    } catch (error) {
      console.error("Failed to use existing splitter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSplitFunds = async () => {
    if (!amount || !currentSplitter) return;

    setIsLoading(true);
    try {
      await splitFunds(amount);
      setAmount("");
    } catch (error) {
      console.error("Failed to split funds:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Splitter Manager</h2>

        {!currentSplitter ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Create New Splitter
              </h3>
              <button
                onClick={handleCreateNew}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? "Creating..." : "Create New Splitter"}
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Use Existing Splitter
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={vfsReference}
                  onChange={(e) => setVfsReference(e.target.value)}
                  placeholder="Enter VFS Reference"
                  className="border p-2 rounded flex-1"
                />
                <button
                  onClick={handleUseExisting}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Use Existing
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Recipients</h3>
              <div className="space-y-2">
                {currentSplitter.config.recipients.map((recipient) => (
                  <div
                    key={recipient.address}
                    className="flex items-center gap-2"
                  >
                    <span className="flex-1">{recipient.address}</span>
                    <input
                      type="number"
                      value={recipient.percentage}
                      onChange={(e) =>
                        updateRecipientPercentage(
                          recipient.address,
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-24 border p-1 rounded"
                    />
                    <span>%</span>
                    <button
                      onClick={() => removeRecipient(recipient.address)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Add New Recipient</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRecipientAddress}
                  onChange={(e) => setNewRecipientAddress(e.target.value)}
                  placeholder="Recipient Address"
                  className="border p-2 rounded flex-1"
                />
                <input
                  type="number"
                  value={newRecipientPercentage}
                  onChange={(e) => setNewRecipientPercentage(e.target.value)}
                  placeholder="Percentage"
                  className="border p-2 rounded w-32"
                />
                <button
                  onClick={handleAddRecipient}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={() => setCurrentSplitter(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Clear Splitter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
