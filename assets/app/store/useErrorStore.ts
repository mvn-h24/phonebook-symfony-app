import { defineStore } from "pinia";

export interface StoreError {
  id: number;
  message: string;
}

export interface ErrorStoreActions {
  addError(message: string, cleanTimeout?: number): void;
}

export interface ErrorsStore {
  errorsList: Array<StoreError>;
}

export const errorStoreToken = "error store";
export const useErrorStore = defineStore<
  string,
  ErrorsStore,
  any,
  ErrorStoreActions
>(errorStoreToken, {
  state: (): ErrorsStore => ({
    errorsList: [],
  }),
  actions: {
    addError(message: string, cleanTimeout?: number) {
      const id = Math.random();
      this.errorsList.push({ id, message });
      if (cleanTimeout) {
        setTimeout(() => {
          this.errorsList = this.errorsList.filter((el) => el.id !== id);
        }, cleanTimeout);
      }
    },
  },
});
