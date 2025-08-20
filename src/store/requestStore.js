import {create }from "zustand";

export const useRequestStore = create((set) => ({
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
  setFormField: (field, value) =>
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
