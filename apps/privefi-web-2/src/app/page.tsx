'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            PrivéFi Portal
          </h1>
          <p className="text-xl text-slate-300 mb-12">
            The Prestige Layer of Real-World Yield
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Investor Portal */}
          <Link href="/investor" className="group">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Investor Portal</h2>
                <p className="text-blue-100 mb-6">
                  Access your portfolio, get TestUSD from faucet, invest in vaults, and track distributions
                </p>
                <div className="text-sm text-blue-200">
                  • Faucet Access<br/>
                  • Portfolio Management<br/>
                  • Distribution History<br/>
                  • Statement Downloads
                </div>
              </div>
            </div>
          </Link>

          {/* Admin Portal */}
          <Link href="/admin" className="group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Admin Portal</h2>
                <p className="text-purple-100 mb-6">
                  Manage vaults, upload documents, process distributions, and publish reports
                </p>
                <div className="text-sm text-purple-200">
                  • Vault Configuration<br/>
                  • Document Management<br/>
                  • Distribution Processing<br/>
                  • Report Publishing
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-400 mb-4">
            Running in <span className="font-mono bg-slate-800 px-2 py-1 rounded">mock</span> mode
          </p>
          <div className="flex justify-center space-x-6 text-sm text-slate-500">
            <span>• Zero external keys required</span>
            <span>• Full offline demo</span>
            <span>• Transparent verification</span>
          </div>
        </div>
      </div>
    </div>
  )
}