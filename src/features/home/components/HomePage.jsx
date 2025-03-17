import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  fetchDashboardData,
  selectDashboardData,
  selectDashboardStatus,
  selectDashboardError
} from '../homeSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// Helper functions for formatting numbers and handling charts
const formatters = {
  // Format number to include thousands separator
  number: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },

  // Format currency with Rp prefix
  currency: (amount) => {
    return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
};

// Custom tooltip components
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
      <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600">
          {`${payload[0].name}: ${formatters.number(payload[0].value)}`}
        </p>
      </div>
  );
};

const PaymentTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
      <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
        <p className="font-medium">{label}</p>
        <p className="text-green-600">
          {`Jumlah: ${formatters.number(payload[0].value)} transaksi`}
        </p>
      </div>
  );
};

function HomePage() {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);
  const status = useSelector(selectDashboardStatus);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboardData());
    }
  }, [status, dispatch]);

  // Show loading state
  if (status === 'loading') {
    return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
    );
  }

  // Show error state
  if (status === 'failed') {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
    );
  }

  // If no data is available yet, return null
  if (!dashboardData) return null;

  // Destructure data for easier access
  const {
    trafficSummary,
    vehicleTypes,
    trafficByGate,
    paymentData,
    shiftData,
    ruasData } = dashboardData;
  const isTrafficUp = trafficSummary.percentageChange > 0;

  return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Lalu Lintas</h1>

        {/* Traffic Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Total Lalu Lintas</h2>
              <div className="flex items-end">
                <div className="text-3xl font-bold text-gray-900 mr-3">
                  {formatters.number(trafficSummary.todayTotal)}
                </div>
                <div className={`flex items-center ${isTrafficUp ? 'text-green-500' : 'text-red-500'} text-sm font-medium mb-1`}>
                  {isTrafficUp ? (
                      <FiChevronUp className="h-4 w-4 mr-1" />
                  ) : (
                      <FiChevronDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(trafficSummary.percentageChange).toFixed(2)}% dari kemarin
                </div>
              </div>
              <div className="text-gray-500 text-sm mt-1">
                Kemarin: {formatters.number(trafficSummary.yesterdayTotal)}
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={trafficSummary.weeklyData.map((value, index) => ({
                      name: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][index],
                      traffic: value
                    }))}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                      type="monotone"
                      dataKey="traffic"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorTraffic)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Traffic by Gate */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Lalu Lintas per Gerbang</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={trafficByGate}
                    margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                      dataKey="gate"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                  />
                  <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}k`;
                        }
                        return value;
                      }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Jumlah" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Methods Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Jumlah Pembayaran</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={paymentData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                      dataKey="method"
                      tick={{ fontSize: 12 }}
                  />
                  <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}k`;
                        }
                        return value;
                      }}
                  />
                  <Tooltip content={<PaymentTooltip />} />
                  <Bar
                      dataKey="transactions"
                      name="Jumlah"
                      fill="#10b981" // Green color for payment data
                      radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Shift Distribution (renamed from Traffic by Vehicle Type) */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Jumlah Shift</h2>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="w-60 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={shiftData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                    >
                      {shiftData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 md:mt-0 md:ml-8">
                <div className="grid grid-cols-1 gap-3">
                  {shiftData.map((shift, index) => (
                      <div key={index} className="flex items-center">
                        <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: shift.color }}
                        />
                        <span className="text-gray-700">{shift.name}: <b>{shift.value}%</b></span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* NEW: Ruas Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Distribusi per Ruas</h2>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="w-60 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={ruasData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                    >
                      {ruasData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 md:mt-0 md:ml-8">
                <div className="grid grid-cols-1 gap-3">
                  {ruasData.map((ruas, index) => (
                      <div key={index} className="flex items-center">
                        <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: ruas.color }}
                        />
                        <span className="text-gray-700">{ruas.name}: <b>{ruas.value}%</b></span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default HomePage;