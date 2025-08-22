import { create } from "zustand";

interface FormData {
  title: string;
  description: string;
  category: string;
  service: string;
  paymentType: string;
  budget: string;
  engagementType: string;
  deadline: string;
  location: string;
}

interface RequestStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  formData: FormData;
  setFormField: (field: keyof FormData, value: string) => void;
  resetForm: () => void;
}

export const useRequestStore = create<RequestStore>((set) => ({
  // Modal open/close state
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // Form data state
  formData: {
    title: "",
    description: "",
    category: "",
    service: "",
    paymentType: "",
    budget: "",
    engagementType: "",
    deadline: "",
    location: "",
  },

  // Update form data field
  setFormField: (field: keyof FormData, value: string) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  // Reset form data
  resetForm: () =>
    set({
      formData: {
        title: "",
        description: "",
        category: "",
        service: "",
        paymentType: "",
        budget: "",
        engagementType: "",
        deadline: "",
        location: "",
      },
    }),
}));
