/**
 * HOW TO ADD NEW API SLICES
 * 
 * This is a scalable Redux structure. Follow these steps to add new slices for other APIs:
 */

/**
 * STEP 1: Create API thunks in your API file
 * Example: src/layout_admin/todos/TodosAPI.js
 * 
 * import { createAsyncThunk } from '@reduxjs/toolkit';
 * import { apiClient } from '../../config/client/ApiClient.js';
 * 
 * export const fetchTodos = createAsyncThunk(
 *   'todos/fetchTodos',
 *   async (_, { rejectWithValue }) => {
 *     try {
 *       const response = await apiClient.get('/api/todos');
 *       return response.data;
 *     } catch (error) {
 *       return rejectWithValue(error.response?.data || error.message);
 *     }
 *   }
 * );
 * 
 * export const createTodo = createAsyncThunk(
 *   'todos/createTodo',
 *   async (todoData, { rejectWithValue }) => {
 *     try {
 *       const response = await apiClient.post('/api/todos', todoData);
 *       return response.data;
 *     } catch (error) {
 *       return rejectWithValue(error.response?.data || error.message);
 *     }
 *   }
 * );
 */

/**
 * STEP 2: Create a Redux slice
 * Create file: src/redux/slices/todosSlice.js
 * 
 * import { createSlice } from '@reduxjs/toolkit';
 * import { fetchTodos, createTodo } from '../../layout_admin/todos/TodosAPI';
 * 
 * const initialState = {
 *   fetch: {
 *     data: [],
 *     loading: false,
 *     error: null,
 *   },
 *   create: {
 *     data: null,
 *     loading: false,
 *     error: null,
 *   },
 * };
 * 
 * const todosSlice = createSlice({
 *   name: 'todos',
 *   initialState,
 *   extraReducers: (builder) => {
 *     // Fetch handlers
 *     builder
 *       .addCase(fetchTodos.pending, (state) => {
 *         state.fetch.loading = true;
 *         state.fetch.error = null;
 *       })
 *       .addCase(fetchTodos.fulfilled, (state, action) => {
 *         state.fetch.loading = false;
 *         state.fetch.data = action.payload;
 *         state.fetch.error = null;
 *       })
 *       .addCase(fetchTodos.rejected, (state, action) => {
 *         state.fetch.loading = false;
 *         state.fetch.error = action.payload || action.error.message;
 *       })
 *       // Create handlers
 *       .addCase(createTodo.pending, (state) => {
 *         state.create.loading = true;
 *         state.create.error = null;
 *       })
 *       .addCase(createTodo.fulfilled, (state, action) => {
 *         state.create.loading = false;
 *         state.create.data = action.payload;
 *         state.create.error = null;
 *       })
 *       .addCase(createTodo.rejected, (state, action) => {
 *         state.create.loading = false;
 *         state.create.error = action.payload || action.error.message;
 *       });
 *   },
 * });
 * 
 * export default todosSlice.reducer;
 */

/**
 * STEP 3: Import and add to store
 * Update src/store.js:
 * 
 * import { configureStore } from '@reduxjs/toolkit';
 * import authenticationReducer from './redux/slices/authenticationSlice';
 * import userManagementReducer from './redux/slices/userManagementSlice';
 * import todosReducer from './redux/slices/todosSlice';  // ADD THIS
 * 
 * export const store = configureStore({
 *   reducer: {
 *     authentication: authenticationReducer,
 *     userManagement: userManagementReducer,
 *     todos: todosReducer,  // ADD THIS
 *   },
 * });
 */

/**
 * STEP 4: Use in components
 * 
 * import { useDispatch, useSelector } from 'react-redux';
 * import { fetchTodos, createTodo } from '../layout_admin/todos/TodosAPI';
 * 
 * function TodosComponent() {
 *   const dispatch = useDispatch();
 *   const { fetch, create } = useSelector(state => state.todos);
 * 
 *   useEffect(() => {
 *     dispatch(fetchTodos());
 *   }, [dispatch]);
 * 
 *   const handleCreate = async () => {
 *     const response = await dispatch(createTodo({ title: 'New Todo' }));
 *     if (response.type.endsWith('/fulfilled')) {
 *       console.log('Todo created:', response.payload);
 *     }
 *   };
 * 
 *   return (
 *     <div>
 *       {fetch.loading && <p>Loading...</p>}
 *       {fetch.error && <p style={{color: 'red'}}>Error: {fetch.error}</p>}
 *       <ul>
 *         {fetch.data.map(todo => <li key={todo.id}>{todo.title}</li>)}
 *       </ul>
 *       <button onClick={handleCreate} disabled={create.loading}>
 *         {create.loading ? 'Creating...' : 'Create Todo'}
 *       </button>
 *     </div>
 *   );
 * }
 */
