import { SportKey } from "@/core/constants/sports";

export interface Sport {
  colorToken: string;
  icon: string;
  id: string;
  key: SportKey;
  name: string;
  unitPreference: "km" | "min" | "none";
}
