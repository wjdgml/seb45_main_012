import { createSlice } from '@reduxjs/toolkit';

// 초기상태 비워뒀습니다
const initialState = {
//   activeMenu: '전체글보기',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = menuSlice.actions;

export const selectActiveMenu = (state) => state.menu.activeMenu;

export default menuSlice.reducer;