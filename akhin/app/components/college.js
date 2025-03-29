import React, { useState } from 'react'

const College = ({json, setCollege}) => {
  const [activeCollege, setActiveCollege] = useState(null);

  return (
    <div className='RoadMap bg-gradient-to-r from-teal-500/20 via-blue-200 to-white flex flex-col items-center bg-white justify-start p-6 w-full h-screen absolute overflow-y-auto'>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      {/* Main Content Container */}
      <div className='w-full max-w-7xl relative z-10'>
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <h1 className="text-[40px] font-bold bg-gradient-to-r from-red-900 via-blue-800 to-teal-700 text-transparent bg-clip-text">
            Elite Educational Institutions
          </h1>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mt-4"></div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {json?.Topcolleges?.map((college, index) => (
            <div 
              key={index}
              className="group relative"
              onMouseEnter={() => setActiveCollege(index)}
              onMouseLeave={() => setActiveCollege(null)}
            >
              {/* College Card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,255,0.1)] overflow-hidden">
                {/* Background Accent */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* College Number */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>

                {/* College Content */}
                <div className="ml-8 mt-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {college.collegeName}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{college.location}</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Ranking</div>
                      <div className="text-lg font-semibold text-blue-600">#{index + 1}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Placement</div>
                      <div className="text-lg font-semibold text-teal-600">95%+</div>
                    </div>
                  </div>
                </div>

                {/* Hover Details */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/95 to-teal-500/95 rounded-2xl p-6 transform transition-all duration-300 ${
                  activeCollege === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                }`}>
                  <div className="h-full flex flex-col justify-center text-white">
                    <h4 className="text-xl font-bold mb-4">Key Highlights</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Top-tier Faculty
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Industry Partnerships
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Research Excellence
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Average Package', value: '12 LPA', icon: '💼' },
              { label: 'Top Companies', value: '100+', icon: '🏢' },
              { label: 'Success Rate', value: '95%', icon: '📈' },
              { label: 'Global Alumni', value: '10K+', icon: '🌍' }
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button 
            onClick={() => setCollege(false)}
            className="flex items-center justify-center w-[150px] h-[50px] rounded-[30px] border border-blue-500 bg-gradient-to-t from-[#D8D9DB] via-white to-[#FDFDFD] text-gray-600 font-semibold text-sm shadow-sm transition-all duration-200 ease-in-out hover:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_3px_3px_#CECFD1] active:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] focus:shadow-[0px_4px_3px_1px_#FCFCFC,0px_6px_8px_#D6D7D9,0px_-4px_4px_#CECFD1,0px_-6px_4px_#FEFEFE,inset_0px_0px_5px_3px_#999,inset_0px_0px_30px_#aaa] outline-none"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default College