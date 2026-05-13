// // import { HiOutlineMenuAlt2, HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';
// // import { useAuth } from '../../context/AuthContext';

// // export default function DashboardHeader({ role, onToggleSidebar, onMobileMenu }) {
// //   const { user } = useAuth();

// //   const greetings = {
// //     farmer:   'Manage your harvest & crops',
// //     provider: 'Manage your services & bids',
// //     buyer:    'Discover fresh crops & deals',
// //     admin:    'Platform overview & management',
// //   };

// //   return (
// //     <header className="h-16 bg-white border-b border-gray-100 flex items-center gap-4 px-4 md:px-6 flex-shrink-0">
// //       {/* Sidebar toggle */}
      
// //       <button
// //         onClick={onToggleSidebar}
// //         className="hidden md:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
// //       >
// //         <HiOutlineMenuAlt2 size={20} />
// //       </button>
// //       <button
// //         onClick={onMobileMenu}
// //         className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
// //       >
// //         <HiOutlineMenuAlt2 size={20} />
// //       </button>

// //       {/* Greeting */}
// //       <div className="flex-1 min-w-0">
// //         <p className="text-xs text-gray-400 hidden sm:block">{greetings[role]}</p>
// //         <h2 className="font-display font-semibold text-gray-800 text-base leading-tight truncate">
// //           Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
// //         </h2>
// //       </div>

// //       {/* Search */}
// //       <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
// //         <HiOutlineSearch className="text-gray-400" />
// //         <input
// //           placeholder="Quick search..."
// //           className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
// //         />
// //       </div>


// // <div
// //   id="google_translate_element"
// //   style={{
// //     width: '220px',
// //     minHeight: '40px',
// //     border: '2px solid red',
// //   }}
// // ></div>
// //       {/* Notifications */}
// //       <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
// //         <HiOutlineBell size={20} />
// //         <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
// //       </button>

// //       {/* Avatar */}
// //       <div className="w-9 h-9 bg-forest-600 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
// //         <span className="text-white text-sm font-bold">
// //           {user?.name?.[0]?.toUpperCase() || 'U'}
// //         </span>
// //       </div>
// //     </header>
// //   );
// // }


// import { useEffect } from 'react';
// import { HiOutlineMenuAlt2, HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';
// import { useAuth } from '../../context/AuthContext';

// export default function DashboardHeader({ role, onToggleSidebar, onMobileMenu }) {
//   const { user } = useAuth();

//   const greetings = {
//     farmer: 'Manage your harvest & crops',
//     provider: 'Manage your services & bids',
//     buyer: 'Discover fresh crops & deals',
//     admin: 'Platform overview & management',
//   };

//   useEffect(() => {
//     window.googleTranslateElementInit = () => {
//       if (window.google?.translate) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,hi,mr,ta,te,bn,gu,pa,kn,ml',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           'google_translate_element'
//         );
//       }
//     };

//     const existingScript = document.querySelector(
//       'script[src*="translate.google.com"]'
//     );

//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.src =
//         'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       document.body.appendChild(script);
//     } else {
//       window.googleTranslateElementInit();
//     }
//   }, []);

//   return (
//     <header className="h-16 bg-white border-b border-gray-100 flex items-center gap-4 px-4 md:px-6 flex-shrink-0">
//       <button
//         onClick={onToggleSidebar}
//         className="hidden md:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//       >
//         <HiOutlineMenuAlt2 size={20} />
//       </button>

//       <button
//         onClick={onMobileMenu}
//         className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//       >
//         <HiOutlineMenuAlt2 size={20} />
//       </button>

//       <div className="flex-1 min-w-0">
//         <p className="text-xs text-gray-400 hidden sm:block">
//           {greetings[role]}
//         </p>

//         <h2 className="font-display font-semibold text-gray-800 text-base leading-tight truncate">
//           Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
//         </h2>
//       </div>

//       <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
//         <HiOutlineSearch className="text-gray-400" />

//         <input
//           placeholder="Quick search..."
//           className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
//         />
//       </div>

//       <div
//         id="google_translate_element"
//         className="hidden md:flex items-center"
//       ></div>

//       <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
//         <HiOutlineBell size={20} />
//         <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
//       </button>

//       <div className="w-9 h-9 bg-forest-600 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
//         <span className="text-white text-sm font-bold">
//           {user?.name?.[0]?.toUpperCase() || 'U'}
//         </span>
//       </div>
//     </header>
//   );
// }


// import { useEffect, useState } from 'react';
// import {
//   HiOutlineMenuAlt2,
//   HiOutlineBell,
//   HiOutlineSearch,
// } from 'react-icons/hi';
// import { useAuth } from '../../context/AuthContext';

// export default function DashboardHeader({
//   role,
//   onToggleSidebar,
//   onMobileMenu,
// }) {
//   const { user } = useAuth();

//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] =
//     useState(false);

//   const greetings = {
//     farmer: 'Manage your harvest & crops',
//     provider: 'Manage your services & bids',
//     buyer: 'Discover fresh crops & deals',
//     admin: 'Platform overview & management',
//   };

//   /* GOOGLE TRANSLATE */
//   useEffect(() => {
//     window.googleTranslateElementInit = () => {
//       if (window.google?.translate) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages:
//               'en,hi,mr,ta,te,bn,gu,pa,kn,ml',
//             layout:
//               window.google.translate.TranslateElement
//                 .InlineLayout.SIMPLE,
//           },
//           'google_translate_element'
//         );
//       }
//     };

//     const existingScript = document.querySelector(
//       'script[src*="translate.google.com"]'
//     );

//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.src =
//         'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       document.body.appendChild(script);
//     } else {
//       window.googleTranslateElementInit();
//     }
//   }, []);

//   /* FETCH NOTIFICATIONS */
//   const fetchNotifications = async () => {
//     try {
//       const res = await fetch(
//         'http://localhost:5000/api/notifications'
//       );

//       const data = await res.json();

//       if (data.success) {
//         setNotifications(data.notifications);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   /* MARK READ */
//   const markAsRead = async (id) => {
//     try {
//       await fetch(
//         `http://localhost:5000/api/notifications/read/${id}`,
//         {
//           method: 'PUT',
//         }
//       );

//       fetchNotifications();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const unreadCount = notifications.filter(
//     (n) => !n.isRead
//   ).length;

//   return (
//     <header className="h-16 bg-white border-b border-gray-100 flex items-center gap-4 px-4 md:px-6 flex-shrink-0 relative">
//       {/* Sidebar toggle */}
//       <button
//         onClick={onToggleSidebar}
//         className="hidden md:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//       >
//         <HiOutlineMenuAlt2 size={20} />
//       </button>

//       <button
//         onClick={onMobileMenu}
//         className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//       >
//         <HiOutlineMenuAlt2 size={20} />
//       </button>

//       {/* Greeting */}
//       <div className="flex-1 min-w-0">
//         <p className="text-xs text-gray-400 hidden sm:block">
//           {greetings[role]}
//         </p>

//         <h2 className="font-display font-semibold text-gray-800 text-base leading-tight truncate">
//           Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
//         </h2>
//       </div>

//       {/* Search */}
//       <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
//         <HiOutlineSearch className="text-gray-400" />
//         <input
//           placeholder="Quick search..."
//           className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
//         />
//       </div>

//       {/* Translate */}
//       <div
//         id="google_translate_element"
//         className="hidden md:flex items-center"
//       ></div>

//       {/* Notifications */}
//       <div className="relative">
//         <button
//           onClick={() =>
//             setShowNotifications(!showNotifications)
//           }
//           className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
//         >
//           <HiOutlineBell size={20} />

//           {unreadCount > 0 && (
//             <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
//               {unreadCount}
//             </span>
//           )}
//         </button>

//         {showNotifications && (
//           <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 z-50 max-h-96 overflow-y-auto">
//             <h3 className="font-semibold mb-3">
//               Notifications
//             </h3>

//             {notifications.length === 0 ? (
//               <p className="text-sm text-gray-500">
//                 No notifications
//               </p>
//             ) : (
//               notifications.map((n) => (
//                 <div
//                   key={n._id}
//                   onClick={() => markAsRead(n._id)}
//                   className={`p-3 rounded-lg mb-2 cursor-pointer ${
//                     n.isRead
//                       ? 'bg-gray-50'
//                       : 'bg-green-50'
//                   }`}
//                 >
//                   <p className="font-medium">
//                     {n.title}
//                   </p>

//                   <p className="text-sm text-gray-600">
//                     {n.message}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {/* Avatar */}
//       <div className="w-9 h-9 bg-forest-600 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
//         <span className="text-white text-sm font-bold">
//           {user?.name?.[0]?.toUpperCase() || 'U'}
//         </span>
//       </div>
//     </header>
//   );
// }

import { useEffect, useState } from 'react';
import {
  HiOutlineMenuAlt2,
  HiOutlineBell,
  HiOutlineSearch,
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHeader({
  role,
  onToggleSidebar,
  onMobileMenu,
}) {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] =
    useState(false);

  const greetings = {
    farmer: 'Manage your harvest & crops',
    provider: 'Manage your services & bids',
    buyer: 'Discover fresh crops & deals',
    admin: 'Platform overview & management',
  };

  /* GOOGLE TRANSLATE */
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages:
              'en,hi,mr,ta,te,bn,gu,pa,kn,ml',
            layout:
              window.google.translate.TranslateElement
                .InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      }
    };

    const existingScript = document.querySelector(
      'script[src*="translate.google.com"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.googleTranslateElementInit();
    }
  }, []);

  /* FETCH NOTIFICATIONS */
  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        'http://localhost:5000/api/notifications'
      );

      const data = await res.json();

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* MARK READ */
  const markAsRead = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/notifications/read/${id}`,
        {
          method: 'PUT',
        }
      );

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center gap-4 px-4 md:px-6 flex-shrink-0 relative">
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="hidden md:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <HiOutlineMenuAlt2 size={20} />
      </button>

      <button
        onClick={onMobileMenu}
        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <HiOutlineMenuAlt2 size={20} />
      </button>

      {/* Greeting */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 hidden sm:block">
          {greetings[role]}
        </p>

        <h2 className="font-display font-semibold text-gray-800 text-base leading-tight truncate">
          Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
        </h2>
      </div>

      {/* Search */}
      <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
        <HiOutlineSearch className="text-gray-400" />
        <input
          placeholder="Quick search..."
          className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
        />
      </div>

      {/* Translate */}
      <div
        id="google_translate_element"
        className="hidden md:flex items-center"
      ></div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() =>
            setShowNotifications(!showNotifications)
          }
          className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <HiOutlineBell size={20} />

          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 z-50 max-h-96 overflow-y-auto">
            <h3 className="font-semibold mb-3">
              Notifications
            </h3>

            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => markAsRead(n._id)}
                  className={`p-3 rounded-lg mb-2 cursor-pointer ${
                    n.isRead
                      ? 'bg-gray-50'
                      : 'bg-green-50'
                  }`}
                >
                  <p className="font-medium">
                    {n.title}
                  </p>

                  <p className="text-sm text-gray-600">
                    {n.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 bg-forest-600 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
        <span className="text-white text-sm font-bold">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </span>
      </div>
    </header>
  );
}