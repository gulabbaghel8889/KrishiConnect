import { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { HiOutlineCloud, HiOutlineSun, HiOutlineCloudDownload, HiOutlineLocationMarker } from 'react-icons/hi';

const API_KEY = '67cf11c5d928aa2b40d50a1b046e38a7';

export default function WeatherChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [cityName, setCityName] = useState('Fetching location...');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon, citySearch = null) => {
      try {
        setLoading(true);
        let url = '';
        if (citySearch) {
          url = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&units=metric&appid=${API_KEY}`;
        } else {
          url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        }

        const res = await axios.get(url);
        
        // Filter to get roughly one data point per day (midday)
        const dailyData = res.data.list.filter((item, index) => index % 8 === 0).map(item => ({
          day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round(item.main.temp),
          humidity: item.main.humidity,
          desc: item.weather[0].main,
        }));

        setData(dailyData);
        setCurrent(res.data.list[0]);
        setCityName(res.data.city.name);
        setLoading(false);
      } catch (error) {
        console.error('Weather fetch error:', error);
        setErrorMsg('Failed to load weather data');
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.warn('Geolocation denied or failed:', err);
            // Fallback to a default city if location denied
            fetchWeather(null, null, 'Indore');
          }
        );
      } else {
        // Fallback for browsers that don't support Geolocation
        fetchWeather(null, null, 'Indore');
      }
    };

    getLocation();
  }, []);

  if (loading) return (
    <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-2xl animate-pulse">
      <div className="text-gray-400 flex flex-col items-center gap-2">
        <HiOutlineCloudDownload className="text-3xl animate-bounce" />
        <p className="text-xs font-medium">Pinpointing your farm...</p>
      </div>
    </div>
  );

  if (errorMsg) return (
    <div className="h-[200px] flex items-center justify-center bg-red-50 rounded-2xl border border-red-100">
      <p className="text-sm text-red-500 font-medium">{errorMsg}</p>
    </div>
  );

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-gray-900">Your Local Weather</h3>
          <p className="text-xs text-forest-600 font-semibold flex items-center gap-1 mt-1">
            <HiOutlineLocationMarker className="text-forest-500" /> {cityName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-display font-black text-gray-900">{Math.round(current?.main?.temp)}°C</p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
             <HiOutlineSun className="text-yellow-500" />
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{current?.weather[0]?.description}</p>
          </div>
        </div>
      </div>

      <div className="h-[180px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="weatherGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }} 
              dy={10}
            />
            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
              labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
              itemStyle={{ fontSize: '12px', color: '#16a34a' }}
              formatter={(v) => [`${v}°C`, 'Temp']}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#16a34a" 
              strokeWidth={3} 
              fill="url(#weatherGrad)" 
              dot={{ fill: '#fff', stroke: '#16a34a', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-gray-50">
        {data.map((d, i) => (
          <div key={i} className="text-center group hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-default">
            <p className="text-[10px] font-bold text-gray-400 uppercase">{d.day}</p>
            <p className="text-xs font-black text-gray-900 mt-0.5">{d.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
