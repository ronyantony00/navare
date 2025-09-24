// 'use client';
// // DashboardSwiper.jsx
// // Install required packages: npm install swiper

// import React, { useRef, useState } from 'react';
// import { Autoplay } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';

// const DashboardSwiper = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
//   const swiperRef = useRef(null);

//   // Feature data
//   const features = [
//     {
//       icon: '💧',
//       title: 'Oil Water Levels',
//       value: 'Normal',
//       desc: 'System operating within normal parameters',
//       color: 'border-orange-500 shadow-orange-500/30',
//     },
//     {
//       icon: '📦',
//       title: 'Available Per Group',
//       value: '137',
//       desc: 'Units available for immediate dispatch',
//       color: 'border-green-500 shadow-green-500/30',
//     },
//     {
//       icon: '📊',
//       title: 'Rig of Container',
//       value: '$16,265',
//       desc: 'Current market valuation',
//       color: 'border-blue-500 shadow-blue-500/30',
//     },
//     {
//       icon: '🌡️',
//       title: 'Temperature Average',
//       value: '23°C',
//       desc: 'Optimal temperature maintained',
//       color: 'border-purple-500 shadow-purple-500/30',
//     },
//     {
//       icon: '🌍',
//       title: 'Active Priority',
//       value: '12 Regions',
//       desc: 'Global coverage expanding',
//       color: 'border-teal-500 shadow-teal-500/30',
//     },
//   ];

//   const handleCardClick = (index) => {
//     setActiveIndex(index);
//     if (swiperRef.current) {
//       swiperRef.current.slideTo(index);
//       swiperRef.current.autoplay.stop();
//       setIsAutoplayPaused(true);
//     }
//   };

//   const handleMouseEnter = (index) => {
//     setActiveIndex(index); // Set the active index to the hovered card
//     if (swiperRef.current) {
//       swiperRef.current.slideTo(index); // Slide to the corresponding feature
//       swiperRef.current.autoplay.stop();
//       setIsAutoplayPaused(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (swiperRef.current && swiperRef.current.autoplay) {
//       swiperRef.current.autoplay.start();
//       setIsAutoplayPaused(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8 bg-slate-900 min-h-screen">
//       <h1 className="text-3xl font-semibold text-white mb-8">Container Monitoring Dashboard</h1>

//       {/* Swiper Component */}
//       <div className="w-full h-80 bg-slate-800 rounded-xl mb-8 overflow-hidden relative">
//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={0}
//           slidesPerView={1}
//           loop={true}
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
//           onSwiper={(swiper) => {
//             swiperRef.current = swiper;
//           }}
//           className="w-full h-full"
//         >
//           {features.map((feature, index) => (
//             <SwiperSlide key={index} className="flex items-center justify-center">
//               <div className="text-center p-8">
//                 <div className="text-6xl mb-4 opacity-30">{feature.icon}</div>
//                 <h2 className="text-3xl font-semibold text-white mb-2">{feature.title}</h2>
//                 <p className="text-5xl font-bold text-white mb-2">{feature.value}</p>
//                 <p className="text-xl text-slate-400">{feature.desc}</p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Autoplay Status Indicator */}
//         {isAutoplayPaused && (
//           <div className="absolute top-4 right-4 bg-slate-700 px-3 py-1 rounded-full">
//             <span className="text-xs text-slate-300">Autoplay paused</span>
//           </div>
//         )}
//       </div>

//       {/* Feature Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
//         {features.map((feature, index) => (
//           <div
//             key={index}
//             className={`
//               bg-slate-800 border-2 rounded-lg p-6 cursor-pointer transition-all duration-300
//               ${activeIndex === index
//                 ? `${feature.color} scale-105 shadow-lg`
//                 : 'border-slate-700 hover:border-blue-500'
//               }
//             `}
//             onClick={() => handleCardClick(index)}
//             onMouseEnter={() => handleMouseEnter(index)} // Pass index to select the card
//             onMouseLeave={handleMouseLeave}
//           >
//             <div className="text-3xl mb-2">{feature.icon}</div>
//             <h3 className="text-sm text-slate-400 mb-1">{feature.title}</h3>
//             <p className="text-2xl font-semibold text-white mb-2">{feature.value}</p>
//             <p className="text-xs text-slate-500">{feature.desc}</p>
//           </div>
//         ))}
//       </div>

//       {/* Resume Autoplay Button */}
//       {isAutoplayPaused && (
//         <div className="flex justify-center mb-4">
//           <button
//             onClick={() => {
//               if (swiperRef.current && swiperRef.current.autoplay) {
//                 swiperRef.current.autoplay.start();
//                 setIsAutoplayPaused(false);
//               }
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
//           >
//             Resume Autoplay
//           </button>
//         </div>
//       )}

//       {/* Bottom Navigation */}
//       <div className="bg-slate-800 rounded-lg p-4">
//         <div className="flex justify-around">
//           <div className="flex flex-col items-center p-2 cursor-pointer hover:opacity-80 transition-opacity">
//             <span className="text-2xl mb-1">📊</span>
//             <span className="text-xs text-slate-400">Dashboards</span>
//           </div>
//           <div className="flex flex-col items-center p-2 cursor-pointer hover:opacity-80 transition-opacity">
//             <span className="text-2xl mb-1">📦</span>
//             <span className="text-xs text-slate-400">Shipments</span>
//           </div>
//           <div className="flex flex-col items-center p-2 cursor-pointer hover:opacity-80 transition-opacity">
//             <span className="text-2xl mb-1">🚨</span>
//             <span className="text-xs text-slate-400">D&D Alarms</span>
//           </div>
//           <div className="flex flex-col items-center p-2 cursor-pointer hover:opacity-80 transition-opacity">
//             <span className="text-2xl mb-1">🚂</span>
//             <span className="text-xs text-slate-400">Rail Tracking</span>
//           </div>
//           <div className="flex flex-col items-center p-2 cursor-pointer hover:opacity-80 transition-opacity">
//             <span className="text-2xl mb-1">🌍</span>
//             <span className="text-xs text-slate-400">Global Map</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardSwiper;
