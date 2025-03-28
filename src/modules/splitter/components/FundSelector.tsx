import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAndromedaStore } from "@/zustand/andromeda";

interface FundSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const FundSelector: React.FC<FundSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [microAmount, setMicroAmount] = useState("");
  const [macroAmount, setMacroAmount] = useState("");
  const { chainId } = useAndromedaStore();
  const [denom, setDenom] = useState("uandr"); // Default to micro ANDR

  useEffect(() => {
    // Convert from micro to macro when micro amount changes
    if (microAmount) {
      const macro = (parseFloat(microAmount) / 1000000).toString();
      setMacroAmount(macro);
      onChange(microAmount);
    }
  }, [microAmount, onChange]);

  useEffect(() => {
    // Convert from macro to micro when macro amount changes
    if (macroAmount) {
      const micro = (parseFloat(macroAmount) * 1000000).toString();
      setMicroAmount(micro);
      onChange(micro);
    }
  }, [macroAmount, onChange]);

  const handleMicroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      setMicroAmount(newValue);
    }
  };

  const handleMacroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      setMacroAmount(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Amount (AND)</label>
          <Input
            type="text"
            value={macroAmount}
            onChange={handleMacroChange}
            placeholder="Enter amount in AND"
            disabled={disabled}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">
            Amount (uAND)
          </label>
          <Input
            type="text"
            value={microAmount}
            onChange={handleMicroChange}
            placeholder="Enter amount in uAND"
            disabled={disabled}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{denom}</Badge>
        <span className="text-sm text-gray-500">1 AND = 1,000,000 uAND</span>
      </div>
    </div>
  );
};
