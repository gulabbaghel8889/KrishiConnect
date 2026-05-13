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
  HiOutlineShoppingCart,
  HiOutlineViewGrid,
  HiOutlineChatAlt2,
  HiOutlineCurrencyRupee,
} from 'react-icons/hi';

import { Link } from 'react-router-dom';
import { StatCard, Badge } from '../../components/common/UI';

const AREA_DATA = [
  { month: 'Jan', spending: 25000 },
  { month: 'Feb', spending: 32000 },
  { month: 'Mar', spending: 28000 },
  { month: 'Apr', spending: 41000 },
  { month: 'May', spending: 36000 },
  { month: 'Jun', spending: 52000 },
  { month: 'Jul', spending: 47000 },
  { month: 'Aug', spending: 58000 },
];

const CROP_DATA = [
  { crop: 'Wheat', qty: 120 },
  { crop: 'Rice', qty: 90 },
  { crop: 'Soybean', qty: 70 },
  { crop: 'Corn', qty: 55 },
];

const ORDERS = [
  {
    id: 1,
    farmer: 'Ramesh Patel',
    crop: 'Wheat',
    price: '₹2,200/Qtl',
    status: 'delivered',
  },
  {
    id: 2,
    farmer: 'Suresh Yadav',
    crop: 'Soybean',
    price: '₹4,800/Qtl',
    status: 'processing',
  },
];

const CHATS = [
  {
    id: 1,
    farmer: 'Amit Verma',
    message: 'Crop ready for dispatch',
    status: 'new',
  },
  {
    id: 2,
    farmer: 'Rajesh Patel',
    message: 'Can negotiate quantity',
    status: 'read',
  },
];

export default function BuyerDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={HiOutlineViewGrid}
          label="Crop Listings"
          value="18"
          change={12}
          color="blue"
        />

        <StatCard
          icon={HiOutlineShoppingCart}
          label="Orders"
          value="9"
          change={7}
          color="forest"
        />

        <StatCard
          icon={HiOutlineChatAlt2}
          label="Chats"
          value="14"
          change={5}
          color="purple"
        />

        <StatCard
          icon={HiOutlineCurrencyRupee}
          label="Total Spending"
          value="₹5.4L"
          change={15}
          color="earth"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Spending Overview
            </h3>

            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              2026
            </span>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={AREA_DATA}>
              <defs>
                <linearGradient id="buyerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
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
                formatter={(v) => [`₹${v.toLocaleString()}`, 'Spending']}
              />

              <Area
                type="monotone"
                dataKey="spending"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="url(#buyerGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-gray-900 mb-4">
            Purchased Crops
          </h3>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CROP_DATA} layout="vertical">
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis
                dataKey="crop"
                type="category"
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip />
              <Bar dataKey="qty" fill="#2563eb" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders + Chats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Recent Orders
            </h3>

            <Link
              to="/buyer/orders"
              className="text-blue-600 text-sm font-semibold"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-sm">{order.farmer}</p>
                  <p className="text-xs text-gray-500">
                    {order.crop} · {order.price}
                  </p>
                </div>

                <Badge
                  variant={
                    order.status === 'delivered'
                      ? 'green'
                      : 'yellow'
                  }
                >
                  {order.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">
              Recent Chats
            </h3>

            <Link
              to="/buyer/chat"
              className="text-blue-600 text-sm font-semibold"
            >
              Open Chat
            </Link>
          </div>

          <div className="space-y-3">
            {CHATS.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-sm">{chat.farmer}</p>
                  <p className="text-xs text-gray-500">
                    {chat.message}
                  </p>
                </div>

                <Badge
                  variant={chat.status === 'new' ? 'blue' : 'gray'}
                >
                  {chat.status}
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
              label: 'Browse Crops',
              to: '/buyer/listings',
              emoji: '🌾',
            },
            {
              label: 'Chat Farmers',
              to: '/buyer/chat',
              emoji: '💬',
            },
            {
              label: 'Orders',
              to: '/buyer/orders',
              emoji: '🛒',
            },
            {
              label: 'Reviews',
              to: '/buyer/reviews',
              emoji: '⭐',
            },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors text-center group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>

              <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-700">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}