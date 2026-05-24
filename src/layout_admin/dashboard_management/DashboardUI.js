
import React, { useRef, useState } from 'react';

function Dashboard(){

    return(
        <div className="px-4 pt-6">
          <div className="grid gap-4 xl:grid-cols-3 mb-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Tổng số sinh viên đăng ký</p>
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">120</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Tổng số đồ án đăng ký</p>
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">110</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Tổng só tệp tin đã tải lên</p>
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">330</p>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="flex min-h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">Top 5 kỳ học có số lượng sinh viên nhiều nhất</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { title: 'Kỳ hè 2026', value: '50', trend: '+2.5%', trendClass: 'text-emerald-600', subtitle: 'vs last month', icon: '📱' },
                    { title: 'Kỳ xuân 2026', value: '45', trend: '+12.5%', trendClass: 'text-emerald-600', subtitle: 'vs last month', icon: '💻' },
                    { title: 'Kỳ thu 2025', value: '30', trend: '-1.35%', trendClass: 'text-rose-600', subtitle: 'vs last month', icon: '⌚' },
                    { title: 'Kỳ thu 2024', value: '28', trend: '+12.5%', trendClass: 'text-emerald-600', subtitle: 'vs last month', icon: '📱' },
                    { title: 'Kỳ thu 2023', value: '25', trend: '-2%', trendClass: 'text-rose-600', subtitle: 'vs last month', icon: '🖥️' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex min-h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">Top 5 giáo viên hướng dẫn nhiều nhất năm</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { title: 'Nguyen Van A', value: '35', trend: '+2.5%', trendClass: 'text-emerald-600', subtitle: 'vs last month', icon: '📱' },
                    { title: 'Tran Van B', value: '28', trend: '+12.5%', trendClass: 'text-emerald-600', subtitle: 'vs last month', icon: '💻' },
                    { title: 'Vu Van C', value: '20', trend: '-1.35%', trendClass: 'text-rose-600', subtitle: 'vs last month', icon: '⌚' },
                    { title: 'Dinh Xuan D', value: '19', trend: '+12.5%', trendClass: 'text-emerald-600', subtitle: 'vs last month', icon: '📱' },
                    { title: 'Trinh Thi E', value: '15', trend: '-2%', trendClass: 'text-rose-600', subtitle: 'vs last month', icon: '🖥️' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  <span>2026</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}
export default Dashboard;