// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call - in a real app, this would be a fetch to your backend
const loginAPI = async (credentials) => {
    // This simulates an API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simple validation
            if (credentials.email === 'user@example.com' && credentials.password === 'password') {
                resolve({ user: { id: 1, name: 'User', email: credentials.email } });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1000);
    });
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await loginAPI(credentials);
            // Store user in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(response.user));
            return response.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Get user from localStorage on app startup
const getUserFromStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const initialState = {
    user: getUserFromStorage(),
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            window.location.href = "/login"
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {
    logout,
    clearError
} = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => !!state.auth.user;