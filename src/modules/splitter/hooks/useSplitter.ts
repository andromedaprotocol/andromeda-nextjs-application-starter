import { useCallback } from 'react';
import { useSplitterStore } from '../store';
import { SplitterService } from '../service';
import { useAndromedaStore } from '@/zustand/andromeda';

export const useSplitter = () => {
  const { currentSplitter, setCurrentSplitter } = useSplitterStore();
  const { client, accounts } = useAndromedaStore();
  const address = accounts[0]?.address;
  const splitterService = new SplitterService(client!);

  const createNewSplitter = useCallback(async () => {
    if (!address) throw new Error('Wallet not connected');
    
    const splitter = await splitterService.createSplitter({
      recipients: [],
      owner: address,
    });
    
    setCurrentSplitter(splitter);
  }, [address, client, setCurrentSplitter]);

  const useExistingSplitter = useCallback(async (vfsReference: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    const splitter = await splitterService.useExistingSplitter(vfsReference);
    setCurrentSplitter(splitter);
  }, [address, client, setCurrentSplitter]);

  const splitFunds = useCallback(async (amount: string) => {
    if (!currentSplitter) throw new Error('No splitter selected');
    
    await splitterService.splitFunds(currentSplitter.address, amount);
  }, [currentSplitter, client]);

  const updateRecipients = useCallback(async (recipients: any[]) => {
    if (!currentSplitter) throw new Error('No splitter selected');
    
    await splitterService.updateRecipients(currentSplitter.address, recipients);
  }, [currentSplitter, client]);

  return {
    createNewSplitter,
    useExistingSplitter,
    splitFunds,
    updateRecipients,
  };
}; 