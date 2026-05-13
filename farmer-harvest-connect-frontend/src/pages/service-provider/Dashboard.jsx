import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import {
  HiOutlineTruck,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyRupee,
} from 'react-icons/hi';

import { Link } from 'react-router-dom';
import { StatCard, Badge } from '../../components/common/UI';

const AREA_DATA = [
  { month: 'Jan', income: 10000 },
  { month: 'Feb', income: 18000 },
  { month: 'Mar', income: 24000 },
  { month: 'Apr', income: 22000 },
  { month: 'May', income: 31000 },
  { month: 'Jun', income: 42000 },
  { month: 'Jul', income: 39000 },
  { month: 'Aug', income: 47000 },
];

const SERVICE_DATA = [
  { service: 'Truck', qty: 20 },
  { service: 'Labour', qty: 15 },
  { service: 'Tractor', qty: 12 },
  { service: 'Harvester', qty: 8 },
];

const REQUESTS = [
  {
    id: 1,
    farmer: 'Ramesh Patel',
    service: 'Truck Transport',
    price: '₹4,500/day',
    status: 'pending',
  },
  {
    id: 2,
    farmer: 'Suresh Yadav',
    service: 'Labour Service',
    price: '₹2,000/day',
    status: 'accepted',
  },
];

const BOOKINGS = [
  {
    id: 1,
    farmer: 'Rakesh Sharma',
    service: 'Truck Transport',
    date: '12 May 2026',
    status: 'confirmed',
  },
  {
    id: 2,
    farmer: 'Anil Verma',
    service: 'Harvester',
    date: '15 May 2026',
    status: 'completed',
  },
];

export default function ProviderDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={HiOutlineTruck}
          label="Active Services"
          value="6"
          change={10}
          color="earth"
        />

        <StatCard
          icon={HiOutlineDocumentText}
          label="Farmer Requests"
          value="14"
          change={8}
          color="blue"
        />

        <StatCard
          icon={HiOutlineCheckCircle}
          label="Bookings"
          value="9"
          change={4}
          color="forest"
        />

        <StatCard
          icon={HiOutlineCurrencyRupee}
          label="Total Earnings"
          value="₹2.6L"
          change={18}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Income */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Earnings Overview
            </h3>

            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              2026
            </span>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={AREA_DATA}>
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />

              <Tooltip
                formatter={(v) => [`₹${v.toLocaleString()}`, 'Income']}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                }}
              />

              <Area
                type="monotone"
                dataKey="income"
                stroke="#d97706"
                strokeWidth={2.5}
                fill="url(#earnGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Usage */}
        <div className="card">
          <h3 className="font-display font-bold text-gray-900 mb-4">
            Service Demand
          </h3>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SERVICE_DATA} layout="vertical">
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                dataKey="service"
                type="category"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                width={70}
              />

              <Tooltip />

              <Bar
                dataKey="qty"
                fill="#d97706"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Requests + Bookings */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Requests */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Farmer Requests
            </h3>

            <Link
              to="/provider/requests"
              className="text-earth-600 text-sm font-semibold hover:text-earth-800"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {REQUESTS.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {req.farmer}
                  </p>

                  <p className="text-xs text-gray-500">
                    {req.service} · {req.price}
                  </p>
                </div>

                <Badge
                  variant={
                    req.status === 'accepted'
                      ? 'green'
                      : 'yellow'
                  }
                >
                  {req.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Recent Bookings
            </h3>

            <Link
              to="/provider/bookings"
              className="text-earth-600 text-sm font-semibold hover:text-earth-800"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {BOOKINGS.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {booking.farmer}
                  </p>

                  <p className="text-xs text-gray-500">
                    {booking.service} · {booking.date}
                  </p>
                </div>

                <Badge
                  variant={
                    booking.status === 'completed'
                      ? 'green'
                      : 'blue'
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="font-display font-bold text-gray-900 mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: 'Post Service',
              to: '/provider/service',
              emoji: '🚚',
            },
            {
              label: 'Farmer Requests',
              to: '/provider/requests',
              emoji: '📋',
            },
            {
              label: 'Bookings',
              to: '/provider/bookings',
              emoji: '✅',
            },
            {
              label: 'Feedback',
              to: '/provider/feedback',
              emoji: '⭐',
            },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-earth-50 rounded-xl transition-colors text-center group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>

              <span className="text-xs font-semibold text-gray-700 group-hover:text-earth-700">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}