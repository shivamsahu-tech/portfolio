import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X, Sparkles, Code2, BookOpen, GitBranch, Trophy, Package } from 'lucide-react'

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('gen-ai')
  const [expandedProject, setExpandedProject] = useState(null)

  // Close modal when category changes
  useEffect(() => {
    setExpandedProject(null)
  }, [activeCategory])

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && expandedProject) {
        setExpandedProject(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [expandedProject])

  const categories = [
    { id: 'gen-ai', name: 'Gen AI Projects', icon: Sparkles },
    { id: 'other', name: 'Other Projects', icon: Code2 },
    { id: 'os', name: 'Open Source Contributions', icon: GitBranch },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'published-packages', name: 'Published Packages', icon: Package },
    { id: 'blogs', name: 'Blogs', icon: BookOpen },
  ]

  const projects = {
    'gen-ai': [
      {
        id: 'meeting-rag',
        title: 'Meeting RAG',
        intro: 'User uploads meeting documents, joins live meetings, and gets intelligent responses by searching through documents and web in real time.',
        cardHighlights: ['Multimodal Images', 'OCR Integration', 'STT Models Integration', 'Real Time Transcriptions'],
        github: 'https://github.com/shivamsahu-tech/meeting-rag',
        // deployed: 'https://meet-rag.vercel.app',
        techStack: ['NextJs', 'FastAPI', 'PostgreSQL', 'Prisma', 'Redis', 'Tailwind CSS', 'Cloudinary'],
        aiModels: ['Pixtral-12b', 'gemini-embedding-001', 'gemini-2.5-pro', 'ocr.space', 'deepgram nova mode'],
        details: `• Implemented two pipeline to process the files, first takes the docs, extract images and texts, store images on cloudinary and caption them using mistral pixtral 12b model, then chunk texts and store all in the pinecone vector database.
• In second pipelines, each pdf page sent for ocr with ocr.space api, and stored each page on cloudinary and embedding stored in the pinecone.
• Implemented realtime transcriptions with interim and final transcript using web socket connections to server and then websocket connection with deepgram api dual channel.
• Implement some agent that search question on user behalf, and user also can type the questions. Retrieval fetched vectors and data with cosine similarity, internally enhance user query, web search using serper api, and return the response to user, and user can see actual details in web search, llm reply and doc search format (actual page similar to user question).
• Also allowed email based authentications`,
        coolPoint: 'Realtime transcriptions is as similar as assembly ai playground.',
      },
      {
        id: 'code-rag',
        title: 'CodeRAG AI',
        intro: 'LLM-powered RAG system enabling developers to query GitHub codebases via natural language, for productivity improvement.',
        cardHighlights: ['Syntax Trees in Neo4j DB', 'Hybrid Retrieval System', 'Multi-language AST Parsing'],
        github: 'https://github.com/shivamsahu-tech/coderag-ai',
        deployed: 'https://code-rag.vercel.app',
        techStack: ['React', 'FastAPI', 'Tree-sitter', 'Qodoo Embeddings', 'Neo4j', 'Pinecone', 'Gemini API', 'GitHub API'],
        details: `• Engineered an LLM-powered Retrieval-Augmented Generation (RAG) system using Gemini API, Enabling developers to query GitHub codebases via natural language, for productivity improvement and faster developer onboarding.
• Developed automated ETL pipeline with FastAPI to clone repositories, parse multi-language source code using Tree-sitter language packs, extract Abstract Syntax Trees (ASTs), and generate 384-dimensional semantic embeddings via Qodoo transformer model.
• Architected hybrid retrieval system combining Pinecone vector database for dense semantic search using cosine similarity and Neo4j graph database for structural code traversal, enabling context-aware code discovery across function dependencies.
• Implemented multi-stage query optimization workflow: initial retrieval via top-k ranking algorithm (k=10), graph expansion through Neo4j Cypher queries, and response refinement using Gemini API with prompt engineering for hallucination reduction.
• Built interactive React frontend with real-time search, syntax-highlighted code visualization, and semantic relationship mapping, validated through A/B testing showing 60%+ improvement in relevance scores versus keyword-based search.`,
      },
      {
        id: 'mcp-circuit',
        title: 'MCP Circuit Designer',
        intro: 'AI-powered Model Context Protocol Server, Enabling LLMs to design, simulate, and validate electronic circuits from natural language input.',
        cardHighlights: ['AI-Powered Circuit Design', 'SPICE Simulation', 'Automated EDA Workflows'],
        github: 'https://github.com/shivamsahu-tech/circuit-designer-mcp.git',
        deployed: null,
        techStack: ['Python', 'MCP', 'ngspice', 'netlist', 'duckduckgo search', 'pymupdf4llm', 'LLMs', 'SPICE'],
        details: `• Built an AI-powered Model Context Protocol (MCP) server enabling LLMs to design, simulate, and validate electronic circuits directly from natural language input, automating circuit design workflows for EDA applications.
• Engineered specialized tools to extend LLM functionality with domain-specific reasoning: get_component_datasheet() to fetch and convert datasheets into Markdown for precise component specifications, and get_research_paper() to retrieve academic papers using PDF-to-text pipelines.
• Integrated ngspice simulation interface to auto-generate, run, and analyze SPICE netlists, enabling evaluation of frequency response, voltage levels, and current flow for circuit validation and optimization.
• Designed intelligent design loop workflow where the LLM interprets circuit requirements, selects suitable components, generates and simulates SPICE netlists, and iteratively optimizes performance for final documentation.
• Achieved 49% improvement in circuit design quality compared to baseline LLMs, measured across component accuracy, power efficiency, signal integrity, and reproducibility metrics.
• Delivered modular, extensible architecture supporting reuse across analog, RF, and digital domains, enabling scalable circuit design workflows for Electronic Design Automation applications.`,
      },
    ],
    'other': [
      {
        id: 'sharemap',
        title: 'ShareMap',
        intro: 'Real-time multi-user location sharing platform with secure room-based sessions, live map interaction, and WebSocket-based communication.',
        cardHighlights: ['Real-time Location Sharing', 'WebSocket Communication', 'A* Pathfinding'],
        github: 'https://github.com/shivamsahu-tech/sharemap',
        deployed: 'https://sharemap.vercel.app',
        techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.io', 'MapTiler API', 'React Leaflet', 'JWT', 'Crypto.js', 'A* Pathfinding'],
        details: `• Developed a scalable full-stack location-sharing application enabling real-time multi-user map interaction via secure room-based sessions using join codes and unique URLs, built on MERN stack architecture.
• Built interactive map interface with React Leaflet and MapTiler API, supporting both street and satellite layers, real-time markers, and live user messaging for enhanced collaboration experience.
• Implemented WebSocket-based communication using Socket.io to stream live geolocation updates, broadcast room events (join/leave), and enable in-room chat functionality with sub-second latency.
• Engineered secure user authentication and authorization system using JWT and Crypto.js, ensuring encrypted data transmission and private location visibility for user privacy protection.
• Integrated A* pathfinding algorithm to compute shortest routes between users by processing graph data from OpenStreetMap and rendering optimized paths dynamically on the map interface.
• Architected modular backend using Node.js, Express.js, and MongoDB Atlas to manage room creation, user sessions, geolocation data, and message broadcasting with RESTful API design patterns.
• Designed system to handle concurrent users with minimal latency and ensured performance consistency through efficient database querying, WebSocket state management, and optimized data indexing strategies.`,
      },
      {
        id: 'quickcapture',
        title: 'Multi-Feature Notes Application',
        intro: 'Secure cloud-enabled note-taking platform with rich text editing, OTP authentication, and cloud-based media management.',
        cardHighlights: ['Rich Text Editing', 'OTP Authentication', 'Cloudinary Integration', 'Razorpay Payments'],
        github: 'https://github.com/shivamsahu-tech/quickcapture',
        deployed: 'https://quick-capture.vercel.app',
        techStack: ['Next.js', 'PostgreSQL (Aiven)', 'TypeScript', 'Mailjet', 'Cloudinary', 'Razorpay', 'Quill', 'Tailwind CSS', 'JWT', 'bcryptjs'],
        details: `Developed a modern full-stack note-taking application with Next.js and TypeScript, featuring secure authentication, rich text editing, and cloud-based media management for scalable content creation and storage.
• Implemented custom OTP-based authentication workflow using Mailjet API for account creation, password reset, and recovery processes, ensuring secure email verification and seamless user onboarding experience.
• Integrated Cloudinary SDK to enable profile image uploads with automatic optimization and responsive transformations, providing scalable media storage and efficient content delivery for user accounts.
• Designed responsive masonry-style UI using Tailwind CSS with color-coded note categorization, implementing dynamic grid layouts and intuitive visual hierarchy for enhanced content organization and user experience.
• Integrated Quill rich text editor with autosave functionality, route-based rendering optimization, and advanced formatting support (lists, headers, code blocks, links) for seamless content creation workflows.
• Added contribution feature using Razorpay SDK (test mode) enabling users to support development via secure in-app donations, implementing payment gateway integration with transaction verification and status tracking.
• Engineered secure backend architecture with PostgreSQL (Aiven cloud), JWT-based authentication, and bcryptjs password hashing, ensuring robust data protection, session management, and compliance with security best practices`,
      },
    ],
    'os': [
      {
        id: 'shadcn-ui',
        title: 'shadcn/ui',
        intro: 'Merged PR improving documentation examples in Next.js shadcn website, fixing breaking UI issues.',
        github: 'https://github.com/shadcn-ui/ui/pull/8374',
        deployed: null,
        details: 'Contributed to shadcn/ui by improving documentation examples that were leading to breaking UI issues. The PR was successfully merged into the main repository.',
      },
    ],
    'achievements': [
      {
        id: 'guvi-hackathon',
        title: 'GUVI Hackathon Achievement',
        intro: 'Achieved top 10 position among 400+ teams in GUVI Hackathon.',
        cardHighlights: ['Top 10 Position', "Schedule Hunter"],
        github: null,
        deployed: 'https://schedule-hunter.netlify.app',
        details: `Scored top 10 position among 400+ teams in GUVI Hackathon.
Project: Schedule Hunter - A scheduling and management application.
Certificate URL: https://www.guvi.in/verify-certificate?id=6z791a7Pi874FY44M7`,
        certificateUrl: 'https://www.guvi.in/verify-certificate?id=6z791a7Pi874FY44M7',
      },
    ],
    'published-packages': [
      {
        id: 'redux-state-handler',
        title: 'redux-state-handler',
        intro: 'A Redux wrapper that helps use Redux library as an atomic library with getState(callback) and setState() methods.',
        github: null,
        deployed: 'https://www.npmjs.com/package/redux-state-handler',
        cardHighlights: ['Experimental', "Redux"],
        details: 'Published experimental npm package. A Redux wrapper that provides getState(callback) and setState() methods, internally using useSelector and useDispatcher for getting elements. This package helps developers use Redux as an atomic library.',
        note: 'Experimental package, not recommended for production integration.',
      },
    ],
    'blogs': [
      {
        id: 'blog-1',
        title: 'Coming Soon',
        intro: 'Blog posts will be available here soon.',
        github: null,
        deployed: null,
      },
    ],
  }

  const currentProjects = projects[activeCategory] || []

  return (
    <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-[1300px] mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About My Works:
        </motion.h2>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                }}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-nav-color to-accent-1 text-white shadow-lg shadow-nav-color/30'
                    : 'bg-[#FFFEF9] text-[#1a1a1a] border-2 border-[rgba(99,102,241,0.1)] hover:border-nav-color/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon size={18} />
                <span>{category.name}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-[#FFFEF9] rounded-2xl p-6 sm:p-8 border-2 border-[rgba(99,102,241,0.1)] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-nav-color/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[rgba(99,102,241,0.1)] hover:bg-nav-color hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.deployed && (
                      <a
                        href={project.deployed}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[rgba(99,102,241,0.1)] hover:bg-nav-color hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-[#4a4a4a] mb-4 text-sm sm:text-base leading-relaxed">{project.intro}</p>

                {/* Card Highlights */}
                {project.cardHighlights && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.cardHighlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-nav-color/10 to-accent-1/10 text-nav-color rounded-lg text-xs sm:text-sm font-medium border border-nav-color/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Details Button */}
                {(project.details || project.techStack || project.aiModels) && (
                  <button
                    onClick={() => setExpandedProject(project.id)}
                    className="w-full p-3 rounded-lg bg-gradient-to-r from-nav-color to-accent-1 text-white hover:shadow-lg transition-all duration-300 text-sm sm:text-base font-medium mt-4"
                  >
                    View Details
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Details Modal */}
        <AnimatePresence>
          {expandedProject && (() => {
            const project = projects[activeCategory]?.find(p => p.id === expandedProject)
            if (!project) return null

            return (
              <>
                {/* Backdrop */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000]"
                  onClick={() => setExpandedProject(null)}
                />

                {/* Modal Container */}
                <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4 pointer-events-none">
                  <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3, type: "spring", damping: 25 }}
                    className="w-full max-w-4xl max-h-[90vh] bg-[#FFFEF9] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[rgba(99,102,241,0.1)] bg-gradient-to-r from-nav-color/5 to-accent-1/5">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">{project.title}</h3>
                      <button
                        onClick={() => setExpandedProject(null)}
                        className="p-2 rounded-lg hover:bg-[rgba(99,102,241,0.1)] transition-colors"
                        aria-label="Close modal"
                      >
                        <X size={24} className="text-[#1a1a1a]" />
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {project.details && (
                        <div>
                          <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">Technical Description:</h4>
                          <p className="text-[#4a4a4a] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                            {project.details}
                          </p>
                        </div>
                      )}

                      {project.techStack && (
                        <div>
                          <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">Tech Stack:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-[rgba(99,102,241,0.1)] text-[#1a1a1a] rounded-lg text-sm font-medium border border-nav-color/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.aiModels && (
                        <div>
                          <h4 className="font-bold text-lg text-[#1a1a1a] mb-3">AI Models:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.aiModels.map((model, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-gradient-to-r from-accent-2/20 to-accent-3/20 text-[#1a1a1a] rounded-lg text-sm font-medium border border-accent-2/30"
                              >
                                {model}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.coolPoint && (
                        <div className="p-4 bg-gradient-to-r from-accent-3/10 to-accent-4/10 rounded-lg border border-accent-3/20">
                          <p className="text-base text-[#1a1a1a] font-medium">
                            <span className="font-bold">Cool Point:</span> {project.coolPoint}
                          </p>
                        </div>
                      )}

                      {project.certificateUrl && (
                        <div>
                          <a
                            href={project.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-4 to-accent-5 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                          >
                            <ExternalLink size={18} />
                            <span>View Certificate</span>
                          </a>
                        </div>
                      )}

                      {project.note && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800 italic">{project.note}</p>
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex gap-4 pt-4 border-t border-[rgba(99,102,241,0.1)]">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[rgba(99,102,241,0.1)] hover:bg-nav-color hover:text-white rounded-lg transition-all font-medium"
                          >
                            <Github size={18} />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.deployed && (
                          <a
                            href={project.deployed}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[rgba(99,102,241,0.1)] hover:bg-nav-color hover:text-white rounded-lg transition-all font-medium"
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )
          })()}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects