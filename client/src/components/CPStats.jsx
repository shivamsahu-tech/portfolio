import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Code2, Trophy, Target } from 'lucide-react'

const CPStats = () => {
  const [stats, setStats] = useState({
    leetcode: { solved: 0, total: 0, easy: 0, medium: 0, hard: 0, loading: true },
    codeforces: { rating: 0, problems: 0, maxRating: 0, rank: '', loading: true },
    codechef: { rating: 0, problems: 0, stars: '', maxRating: 0, loading: true },
    gfg: { solved: 0, total: 0, loading: true },
  })

  // Fetch LeetCode stats
  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/shsax`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.status === 'success') {
            setStats(prev => ({
              ...prev,
              leetcode: {
                solved: data.totalSolved || 0,
                total: data.totalQuestions || 3000,
                easy: data.easySolved || 0,
                medium: data.mediumSolved || 0,
                hard: data.hardSolved || 0,
                loading: false,
              },
            }))
            return
          }
        }
      } catch (error) {
        console.error('Error fetching LeetCode:', error)
      }
      
      try {
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/shsax`)
        if (response.ok) {
          const data = await response.json()
          if (data.totalSolved !== undefined) {
            setStats(prev => ({
              ...prev,
              leetcode: {
                solved: data.totalSolved || 0,
                total: data.totalQuestions || 3000,
                easy: data.easySolved || 0,
                medium: data.mediumSolved || 0,
                hard: data.hardSolved || 0,
                loading: false,
              },
            }))
            return
          }
        }
      } catch (error) {
        console.error('Error fetching LeetCode (alternative):', error)
      }
      
      setStats(prev => ({ ...prev, leetcode: { ...prev.leetcode, loading: false } }))
    }

    fetchLeetCode()
  }, [])

  // Fetch Codeforces stats
  useEffect(() => {
    const fetchCodeforces = async () => {
      try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=shivamsahu-tech`)
        if (response.ok) {
          const data = await response.json()
          if (data.status === 'OK' && data.result && data.result.length > 0) {
            const user = data.result[0]
            setStats(prev => ({
              ...prev,
              codeforces: {
                rating: user.rating || 0,
                maxRating: user.maxRating || 0,
                rank: user.rank || 'unrated',
                problems: 0,
                loading: false,
              },
            }))
          }
        }

        const subResponse = await fetch(`https://codeforces.com/api/user.status?handle=shivamsahu-tech`)
        if (subResponse.ok) {
          const subData = await subResponse.json()
          if (subData.status === 'OK') {
            const solvedSet = new Set()
            subData.result.forEach(sub => {
              if (sub.verdict === 'OK') {
                solvedSet.add(sub.problem.contestId + sub.problem.index)
              }
            })
            setStats(prev => ({
              ...prev,
              codeforces: {
                ...prev.codeforces,
                problems: solvedSet.size,
              },
            }))
          }
        }
      } catch (error) {
        console.error('Error fetching Codeforces:', error)
        setStats(prev => ({ ...prev, codeforces: { ...prev.codeforces, loading: false } }))
      }
    }

    fetchCodeforces()
  }, [])

  useEffect(() => {
    const fetchCodeChef = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/fetch-codechef/shsax`)
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          if (data.rating) {
            setStats(prev => ({
              ...prev,
              codechef: {
                rating: data.rating || 0,
                maxRating: data.highestRating || '',
                problems: data.totalSolved || "NA",
                loading: false,
              },
            }))
            return
          }
        }
      } catch (error) {
        console.error('Error fetching CodeChef:', error)
      }
    }

    fetchCodeChef()
  }, [])

  useEffect(() => {
    const fetchGFG = async () => {
      try {        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/fetch-gfg/shivamsft0t`)
        if (response.ok) {
          const data = await response.json()
          console.log("GFG : ", data)

          if (data) {
            setStats(prev => ({
              ...prev,
              gfg: {
                problems: data.problemsSolved || "NA",
                rating: data.contestRating || "NA",
                codingScore: data.codingScore || "NA",
                loading: false,
              },
            }))
            return
          }
        }
      } catch (error) {
        console.error('Error fetching GFG (fallback):', error)
      }
      
      setStats(prev => ({ ...prev, gfg: { ...prev.gfg, loading: false } }))
    }

    fetchGFG()
  }, [])

  const platforms = [
    {
      name: 'LeetCode',
      icon: Code2,
      color: '#FFA116',
      data: stats.leetcode,
      url: 'https://leetcode.com/shsax',
      details: [
        { label: 'Easy', value: stats.leetcode.easy },
        { label: 'Medium', value: stats.leetcode.medium },
        { label: 'Hard', value: stats.leetcode.hard },
      ],
    },
    {
      name: 'Codeforces',
      icon: Trophy,
      color: '#1F8ACB',
      data: { ...stats.codeforces, solved: stats.codeforces.problems },
      url: 'https://codeforces.com/profile/shivamsahu-tech',
      details: [
        { label: 'Rating', value: stats.codeforces.rating },
        { label: 'Max Rating', value: stats.codeforces.maxRating },
        { label: 'Rank', value: stats.codeforces.rank },
      ],
    },
    {
      name: 'CodeChef',
      icon: Target,
      color: '#5B4638',
      data: { ...stats.codechef, solved: stats.codechef.problems, total: 0 },
      url: 'https://www.codechef.com/users/shsax',
      details: [
        { label: 'Rating', value: stats.codechef.rating },
        { label: 'Max Rating', value: stats.codechef.maxRating},
        { label: 'Problems', value: stats.codechef.problems },
      ],
    },
    {
      name: 'GeeksforGeeks',
      icon: TrendingUp,
      color: '#2F8D46',
      data: { ...stats.codechef, solved: stats.gfg.problems, total: 0 },
      url: 'https://www.geeksforgeeks.org/user/shivamsft0t/',
      details: [
        { label: 'Rating', value: stats.gfg.rating },
        { label: 'Coding Score', value: stats.gfg.codingScore},
        { label: 'Problems', value: stats.gfg.problems },
      ],
    },
  ]

  return (
    <div className="w-full max-w-full p-6 bg-[#FFFEF9] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-[rgba(99,102,241,0.1)]">
      <motion.p
        className="text-sm text-[#4a4a4a] mb-3 text-center font-medium italic"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Not just vibe coding
      </motion.p>
      <motion.h3
        className="text-xl font-bold text-[#1a1a1a] mb-6 text-center font-mono"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Competitive Programming
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform, index) => {
          const Icon = platform.icon
          const { data } = platform
          const progress = data.total > 0 ? (data.solved || data.problems) / data.total : 0

          return (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-[#f8f9fa] to-[#FFFEF9] rounded-xl p-4 no-underline text-[#1a1a1a] border-2 border-[rgba(99,102,241,0.1)] transition-all duration-300 flex flex-col gap-3 relative overflow-hidden hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-nav-color to-accent-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              
              <div className="flex items-center gap-2 mb-1">
                <Icon size={24} color={platform.color} />
                <span className="text-sm font-semibold text-[#1a1a1a] font-mono">{platform.name}</span>
              </div>

              {data.loading ? (
                <div className="flex flex-col items-center justify-center gap-2 py-4 text-[#4a4a4a] text-sm">
                  <div className="w-6 h-6 border-[3px] border-[rgba(99,102,241,0.2)] border-t-nav-color rounded-full animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#1a1a1a] leading-none">
                      {platform.name === 'LeetCode' || platform.name === 'GeeksforGeeks'
                        ? (data.solved || "NA")
                        : platform.name === 'Codeforces'
                        ? (data.solved || data.problems || "NA")
                        : platform.name === 'CodeChef'
                        ? (data.problems || data.rating || "NA")
                        : (data.solved || data.rating || "NA")
                      }
                    </span>
                    {data.total > 0 && (
                      <span className="text-base text-[#4a4a4a] font-normal">/ {data.total}</span>
                    )}
                    {(platform.name === 'Codeforces' && data.total === 0 && (data.solved || data.problems)) && (
                      <span className="text-sm text-[#4a4a4a] font-normal ml-1"> problems</span>
                    )}
                    {(platform.name === 'CodeChef' && data.total === 0 && data.problems) && (
                      <span className="text-sm text-[#4a4a4a] font-normal ml-1"> solved</span>
                    )}
                  </div>

                  {data.total > 0 && progress > 0 && (
                    <div className="w-full h-1.5 bg-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden mt-2">
                      <motion.div
                        className="h-full rounded-[10px] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                        style={{ 
                          backgroundColor: platform.color,
                          width: `${Math.min(progress * 100, 100)}%` 
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress * 100, 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  )}

                  {platform.details.length > 0 && (
                    <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[rgba(0,0,0,0.1)]">
                      {platform.details.map((detail, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-[#4a4a4a] font-medium">{detail.label}:</span>
                          <span className="text-[#1a1a1a] font-semibold font-mono">{detail.value || 'N/A'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.a>
          )
        })}
      </div>
    </div>
  )
}

export default CPStats
