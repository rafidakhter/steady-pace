import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageAdapter } from "./types";

export class AsyncStorageAdapter implements StorageAdapter {
  getItem(key: string) {
    return AsyncStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  }

  removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  }
}
