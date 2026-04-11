import { createJSONStorage, StateStorage } from "zustand/middleware";

import { AsyncStorageAdapter } from "./async-storage-adapter";
import { StorageAdapter } from "./types";

const storageAdapter: StorageAdapter = new AsyncStorageAdapter();

const zustandStorage: StateStorage = {
  getItem: (name) => storageAdapter.getItem(name),
  setItem: (name, value) => storageAdapter.setItem(name, value),
  removeItem: (name) => storageAdapter.removeItem(name)
};

export const appStorage = storageAdapter;
export const createPersistStorage = () => createJSONStorage(() => zustandStorage);
