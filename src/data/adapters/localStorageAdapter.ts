import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, StateStorage } from "zustand/middleware";

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  setItem(key: string, value: string): Promise<void>;
}

export class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string) {
    return AsyncStorage.getItem(key);
  }

  removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  }

  setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  }
}

const storageAdapter = new LocalStorageAdapter();

export const zustandStorage: StateStorage = {
  getItem: (key) => storageAdapter.getItem(key),
  removeItem: (key) => storageAdapter.removeItem(key),
  setItem: (key, value) => storageAdapter.setItem(key, value)
};

export function createPersistStorage() {
  return createJSONStorage(() => zustandStorage);
}
