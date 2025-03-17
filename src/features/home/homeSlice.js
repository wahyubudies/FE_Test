import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashboardData = createAsyncThunk(
    'home/fetchDashboardData',
    async (_, { rejectWithValue }) => {
        try {
            return {
                trafficSummary: {
                    todayTotal: 156789,
                    yesterdayTotal: 142567,
                    percentageChange: 9.97,
                    weeklyData: [124567, 131298, 138421, 132567, 140129, 142567, 156789]
                },
                vehicleTypes: [
                    { name: 'Golongan I', value: 53, color: '#3b82f6' },
                    { name: 'Golongan II', value: 17, color: '#10b981' },
                    { name: 'Golongan III', value: 12, color: '#f59e0b' },
                    { name: 'Golongan IV', value: 9, color: '#ef4444' },
                    { name: 'Golongan V', value: 9, color: '#8b5cf6' }
                ],
                trafficByGate: [
                    { gate: 'Gerbang 1', count: 45678 },
                    { gate: 'Gerbang 2', count: 38921 },
                    { gate: 'Gerbang 3', count: 32456 },
                    { gate: 'Gerbang 4', count: 39734 }
                ],
                trafficByHour: [
                    { hour: '00:00', count: 2145 },
                    { hour: '02:00', count: 1432 },
                    { hour: '04:00', count: 1789 },
                    { hour: '06:00', count: 5432 },
                    { hour: '08:00', count: 9765 },
                    { hour: '10:00', count: 8643 },
                    { hour: '12:00', count: 7432 },
                    { hour: '14:00', count: 8654 },
                    { hour: '16:00', count: 9876 },
                    { hour: '18:00', count: 10432 },
                    { hour: '20:00', count: 6543 },
                    { hour: '22:00', count: 3456 }
                ],
                paymentData: [
                    { method: "E-Toll", transactions: 1250, amount: 62500000 },
                    { method: "Cash", transactions: 750, amount: 37500000 },
                    { method: "FLO", transactions: 450, amount: 22500000 },
                    { method: "QR Code", transactions: 320, amount: 16000000 },
                    { method: "KTP", transactions: 180, amount: 9000000 },
                    { method: "Credit Card", transactions: 120, amount: 6000000 }
                ],
                shiftData: [
                    { name: 'Shift 1', value: 35, color: '#3b82f6' },
                    { name: 'Shift 2', value: 40, color: '#10b981' },
                    { name: 'Shift 3', value: 25, color: '#f59e0b' }
                ],
                ruasData: [
                    { name: 'Ruas 1', value: 20, color: '#ef4444' },
                    { name: 'Ruas 2', value: 30, color: '#8b5cf6' },
                    { name: 'Ruas 3', value: 25, color: '#ec4899' },
                    { name: 'Ruas 4', value: 25, color: '#f97316' }
                ],
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    profile: false,
    sidebarOpen: true,
    dashboardData: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
};

const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {
        openProfile: (state) => {
            state.profile = !state.profile;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dashboardData = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const {
    openProfile,
    toggleSidebar,
} = homeSlice.actions;

export default homeSlice.reducer;

// Selectors
export const selectProfileOpen = (state) => state.home.profile;
export const selectSidebarOpen = (state) => state.home.sidebarOpen;
export const selectDashboardData = (state) => state.home.dashboardData;
export const selectDashboardStatus = (state) => state.home.status;
export const selectDashboardError = (state) => state.home.error;