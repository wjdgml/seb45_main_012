import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSignUpModal: false,
  showDeleteModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleSignUpModal: (state) => {
      state.showSignUpModal = !state.showSignUpModal;
    },
    toggleDeleteModal: (state) => {
      state.showDeleteModal = !state.showDeleteModal;
    },
  },
});

export const { toggleSignUpModal, toggleDeleteModal } = modalSlice.actions;

export const selectshowSignUpModal = (state) => state.modal.showSignUpModal;
export const selectshowDeleteModal = (state) => state.modal.showDeleteModal;

export default modalSlice.reducer;