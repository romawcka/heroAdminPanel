// 1
import { createSlice } from "@reduxjs/toolkit";

// 2
// const heroesSlice = createSlice(
//  );

// 3
// const heroesSlice = createSlice({
//   name: 'heroes',
// });

//4
const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
}
// const heroesSlice = createSlice({
//   name: 'heroes',
//   initialState,
// });

// 5
// const heroesSlice = createSlice({
//   name: 'heroes',
//   initialState,
//   reducers: {
//     heroesFetching: state => {state.heroesLoadingStatus = 'loading'}
//     // heroesFetching - формируется actionCreator
//     // state => {...'loading'} - формируется действие, работающее напрямую со State
//   }
// });

//6
const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload
    },
    heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
    heroCreated: (state, action) => {state.heroes.push(action.payload)},
    heroDeleted: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)};
  }
});

// 7
const {actions, reducers} = heroesSlice;
// 8
export default reducers;
// 9
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted
} = actions;

