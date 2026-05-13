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
  HiOutlineUsers,
  HiOutlineCurrencyRupee,
  HiOutlineExclamationCircle,
  HiOutlineCollection,
} from 'react-icons/hi';

import { Link } from 'react-router-dom';
import { StatCard, Badge } from '../../components/common/UI';

const AREA_DATA = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 62000 },
  { month: 'Mar', revenue: 58000 },
  { month: 'Apr', revenue: 79000 },
  { month: 'May', revenue: 91000 },
  { month: 'Jun', revenue: 110000 },
  { month: 'Jul', revenue: 98000 },
  { month: 'Aug', revenue: 125000 },
];

const USER_DATA = [
  { role: 'Farmers', count: 120 },
  { role: 'Buyers', count: 75 },
  { role: 'Providers', count: 40 },
];

const DISPUTES = [
  {
    id: 1,
    user: 'Ramesh Patel',
    issue: 'Payment dispute',
    status: 'open',
  },
  {
    id: 2,
    user: 'Amit Traders',
    issue: 'Delivery complaint',
    status: 'resolved',
  },
];

const LISTINGS = [
  {
    id: 1,
    crop: 'Wheat',
    owner: 'Ramesh Patel',
    status: 'active',
  },
  {
    id: 2,
    crop: 'Soybean',
    owner: 'Suresh Yadav',
    status: 'flagged',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={HiOutlineUsers}
          label="Total Users"
          value="235"
          change={14}
          color="purple"
        />

        <StatCard
          icon={HiOutlineCurrencyRupee}
          label="Revenue"
          value="₹12.8L"
          change={18}
          color="forest"
        />

        <StatCard
          icon={HiOutlineExclamationCircle}
          label="Open Disputes"
          value="6"
          change={-2}
          color="earth"
        />

        <StatCard
          icon={HiOutlineCollection}
          label="Listings"
          value="84"
          change={9}
          color="blue"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Platform Revenue
            </h3>

            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              2026
            </span>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={AREA_DATA}>
              <defs>
                <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#9333ea"
                strokeWidth={2.5}
                fill="url(#adminGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-gray-900 mb-4">
            User Distribution
          </h3>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={USER_DATA} layout="vertical">
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis
                dataKey="role"
                type="category"
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#9333ea" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Recent Disputes
            </h3>

            <Link
              to="/admin/disputes"
              className="text-purple-600 text-sm font-semibold"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {DISPUTES.map((dispute) => (
              <div
                key={dispute.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-sm">{dispute.user}</p>
                  <p className="text-xs text-gray-500">
                    {dispute.issue}
                  </p>
                </div>

                <Badge
                  variant={
                    dispute.status === 'resolved'
                      ? 'green'
                      : 'red'
                  }
                >
                  {dispute.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Active Listings
            </h3>

            <Link
              to="/admin/listings"
              className="text-purple-600 text-sm font-semibold"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {LISTINGS.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-sm">{listing.crop}</p>
                  <p className="text-xs text-gray-500">
                    {listing.owner}
                  </p>
                </div>

                <Badge
                  variant={
                    listing.status === 'active'
                      ? 'green'
                      : 'yellow'
                  }
                >
                  {listing.status}
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
              label: 'Users',
              to: '/admin/users',
              emoji: '👥',
            },
            {
              label: 'Transactions',
              to: '/admin/transactions',
              emoji: '💰',
            },
            {
              label: 'Disputes',
              to: '/admin/disputes',
              emoji: '⚠️',
            },
            {
              label: 'Listings',
              to: '/admin/listings',
              emoji: '📦',
            },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors text-center group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>

              <span className="text-xs font-semibold text-gray-700 group-hover:text-purple-700">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}