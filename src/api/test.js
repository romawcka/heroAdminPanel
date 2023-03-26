//1
import {createApi, fechBaseQuery} from '@reduxjs/toolkit/query/react';

//2
// export const apiSlice = createApi({
//   // настройка объекта
// })

//3
// export const apiSlice = createApi({
//   reducerPath: 'api'
// })

//4
// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'})
// })

//5
// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
//   endpoints: builder => ({
//     getHeroes: builder.query() // просто получить данные 
//   })
// })

//6
// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
//   endpoints: builder => ({
//     getHeroes: builder.query({    // просто получить данные 
//       query: () => '/heroes' //слеш нужен для адреса, чтобы получилось http://localhost:3001/heroes
//     }) 
//   })
// }) 

//7
export const {useGetHeroesQuery} = apiSlice;

//8
import { apiSlice } from '../api/apiSlice';

//9
// const store = configureStore({
//   reducer:  {heroes, filters, [apiSlice.reducerPath]: apiSlice},
//   middleware: getDefaultMiddleware => getDefaultMiddleware(),
//   devTools: process.env.NODE_ENV !== 'production',
// })
// export default store;

//10
const store = configureStore({
  reducer:  {heroes, filters, [apiSlice.reducerPath]: apiSlice.reducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})
export default store ;

//11
import { useGetHeroesQuery } from '../../api/apiSlice';

//12
const {
  // здесь возвращается объект с различными сущностями
} = useGetHeroesQuery();

const {
  // здесь возвращается объект с различными сущностями
  data: heroes = [], // полученные данные, запишутся в переменную heroes // 13 // 6
  // все состояния //14
  isFetching, // --> true, указывает, что выполняется последующие озапросы на сервер
  isLoading, // --> true, указывает, что впервые обращаемся к серверу за данными
  isSuccess, // --> true, указывает, что данные загрузилсь успешно
  isError, // --> true, указывает, что сущ-ет ошибка при общении с сервером
  isUninitialized, // --> true указывает, что запрос еще не происходил
  refetch, // --> функ ция ручного запроса при определенных обстоятельстах
  error // можно вывести / отпрвить куда-то
} = useGetHeroesQuery();


//20
request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
.then(res => console.log(res, 'The request is fine'))
.then(dispatch(heroCreated(newHero)))
.catch(err => console.log(err))


//21
const [createHero, {isLoading}] = useCreateHeroMutation();
// createHero - функция, вызвывающая мутацию
// {isLoading} - объект с данными о сосотоянии запроса

//22
request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
.then(res => console.log(res, 'The request is fine'))
.then(dispatch(heroCreated(newHero)))
.catch(err => console.log(err))
// на
createHero(newHero).unwrap();

//23
// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
//   tagTypes: ['Heroes'], //23
//   endpoints: builder => ({
//     getHeroes: builder.query({    // просто получить данные 
//       query: () => '/heroes', //слеш нужен для адреса, чтобы получилось http://localhost:3001/heroes
//       providesTags: ['Heroes'] // 24
//     }),
//     createHero: builder.mutation({ // создание персонажа //18
//       query: hero => ({
//         url: '/heroes', // где будет проводитсья мутация
//         method: 'POST', // какой метод будет ииспользоваться
//         body: hero // что вообще уйдет на сервер
//       }),
//       invalidatesTags: ['Heroes'] // 25
//     })
//   })
// });

//26
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
  tagTypes: ['Heroes'],
  endpoints: builder => ({
    getHeroes: builder.query({    // просто получить данные 
      query: () => '/heroes', //слеш нужен для адреса, чтобы получилось http://localhost:3001/heroes
      providesTags: ['Heroes'] // 
    }),
    createHero: builder.mutation({ // создание персонажа //18
      query: hero => ({
        url: '/heroes', // где будет проводитсья мутация
        method: 'POST', // какой метод будет использован
        body: hero // что вообще уйдет на сервер
      }),
      invalidatesTags: ['Heroes']
    }),
    deleteHero: builder.mutation({
      query: id => ({
        url: `/heroes/${id}`, // по которому будет отправлен запрос
        method: 'DELETE' //  какой метод будет использован
      })
    })
  })
});
