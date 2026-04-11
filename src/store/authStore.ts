import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPersistStorage } from "@/data/adapters/localStorageAdapter";
import { User } from "@/domain/entities/User";

interface AuthRecord {
  email: string;
  id: string;
  name: string;
  password: string;
}

interface SignInInput {
  email: string;
  password: string;
}

interface SignUpInput extends SignInInput {
  name: string;
}

interface AuthStoreState {
  isAuthenticated: boolean;
  registeredUsers: Record<string, AuthRecord>;
  signIn: (input: SignInInput) => { ok: boolean; error?: string };
  signOut: () => void;
  signUp: (input: SignUpInput) => { ok: boolean; error?: string };
  user: User | null;
}

function toPublicUser(record: AuthRecord): User {
  return {
    email: record.email,
    id: record.id,
    name: record.name
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      registeredUsers: {},
      signIn: ({ email, password }) => {
        const normalizedEmail = normalizeEmail(email);
        const match = get().registeredUsers[normalizedEmail];

        if (!match || match.password !== password) {
          return { error: "Invalid email or password.", ok: false };
        }

        set({
          isAuthenticated: true,
          user: toPublicUser(match)
        });

        return { ok: true };
      },
      signOut: () => {
        set({
          isAuthenticated: false,
          user: null
        });
      },
      signUp: ({ email, name, password }) => {
        const normalizedEmail = normalizeEmail(email);

        if (get().registeredUsers[normalizedEmail]) {
          return { error: "An account with that email already exists.", ok: false };
        }

        const record: AuthRecord = {
          email: normalizedEmail,
          id: `user-${Date.now()}`,
          name: name.trim(),
          password
        };

        set((state) => ({
          isAuthenticated: true,
          registeredUsers: {
            ...state.registeredUsers,
            [normalizedEmail]: record
          },
          user: toPublicUser(record)
        }));

        return { ok: true };
      },
      user: null
    }),
    {
      name: "steady-pace-auth-store",
      storage: createPersistStorage()
    }
  )
);
