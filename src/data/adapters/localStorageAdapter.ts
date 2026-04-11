import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, StateStorage } from "zustand/middleware";

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  getJson<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  setItem(key: string, value: string): Promise<void>;
  setJson<T>(key: string, value: T): Promise<void>;
}

export class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string) {
    return AsyncStorage.getItem(key);
  }

  async getJson<T>(key: string) {
    const value = await this.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  }

  setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  }

  setJson<T>(key: string, value: T) {
    return this.setItem(key, JSON.stringify(value));
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
