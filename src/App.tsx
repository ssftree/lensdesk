import { type CSSProperties, useMemo, useState } from 'react'
import {
  Archive,
  AtSign,
  Bookmark,
  ChevronDown,
  Circle,
  ClipboardList,
  Command,
  Compass,
  FileText,
  Filter,
  FolderOpen,
  Inbox,
  Layers3,
  Link,
  MessageSquareText,
  MoreHorizontal,
  PanelRight,
  Paperclip,
  Plus,
  Search,
  Send,
  Sparkles,
  Tag,
  Target,
  Users,
} from 'lucide-react'
import './App.css'

type Account = {
  id: string
  handle: string
  name: string
  audience: string
  lens: string
  tone: string
  avoid: string
  pillars: string[]
  accent: string
}

type Project = {
  id: string
  accountId: string
  name: string
  count: number
  accent: string
  question: string
  decision: string
  nextMove: string
}

type Evidence = {
  id: string
  projectId: string
  type: 'link' | 'quote' | 'screenshot' | 'note'
  platform: string
  source: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  image?: string
}

type InsightTab = 'themes' | 'tensions' | 'memo'

type InsightContent = {
  themes: Array<[string, number]>
  tensions: Array<[string, number]>
  memo: Array<[string, string]>
}

const accounts: Account[] = [
  {
    id: 'fem-signal',
    handle: '@fem_signal',
    name: 'Feminist Culture Notes',
    audience: 'cultural readers, writers, researchers',
    lens: 'Read social trends through gender, labor, class, body politics, and everyday power.',
    tone: 'precise, literary, critical, humane',
    avoid: 'girlboss cliches, moral panic, flattening lived experience',
    pillars: ['body politics', 'platform discourse', 'care labor', 'aesthetic critique'],
    accent: '#155d43',
  },
  {
    id: 'market-notes',
    handle: '@market_notes',
    name: 'Market Semiotics Lab',
    audience: 'brand strategists, founders, creative leads',
    lens: 'Translate cultural signals into positioning, campaign angles, and category risks.',
    tone: 'sharp, practical, evidence-led',
    avoid: 'trend-chasing, empty optimism, generic consumer insights',
    pillars: ['consumer desire', 'brand codes', 'category shifts', 'campaign angles'],
    accent: '#7a4d16',
  },
  {
    id: 'soft-work',
    handle: '@soft_work',
    name: 'Soft Work Studio',
    audience: 'working women navigating ambition and care',
    lens: 'Turn cultural pressure into useful reflection, gentle critique, and practical content.',
    tone: 'warm, grounded, clear, non-performative',
    avoid: 'hustle language, shame, wellness absolutism',
    pillars: ['work identity', 'burnout', 'self-trust', 'daily systems'],
    accent: '#557985',
  },
]

const projects: Project[] = [
  {
    id: 'clean-girl',
    accountId: 'fem-signal',
    name: 'Clean Girl Aesthetic',
    count: 42,
    accent: '#155d43',
    question: 'What labor gets hidden when "clean" becomes a beauty ideal?',
    decision: 'Build a critique around effort, class codes, and the morality of visible discipline.',
    nextMove: 'Draft a carousel from the strongest routine clips and one quote about low maintenance.',
  },
  {
    id: 'tradwife',
    accountId: 'fem-signal',
    name: 'Tradwife Discourse',
    count: 31,
    accent: '#8b3a3a',
    question: 'Why does domestic nostalgia feel persuasive inside unstable platform culture?',
    decision: 'Treat the trend as an emotional escape narrative, not only a political identity.',
    nextMove: 'Compare homemaking visuals with comments about burnout, security, and public performance.',
  },
  {
    id: 'body-image',
    accountId: 'fem-signal',
    name: 'Body Image Shifts',
    count: 21,
    accent: '#6a7043',
    question: 'How are body ideals being renamed as health, longevity, or discipline?',
    decision: 'Track language that moves from beauty judgment into moral self-management.',
    nextMove: 'Collect before-and-after captions and note which words make judgment sound neutral.',
  },
  {
    id: 'wellness',
    accountId: 'market-notes',
    name: 'Wellness Market Scan',
    count: 18,
    accent: '#9a7a2f',
    question: 'Which wellness signals are becoming default purchase expectations?',
    decision: 'Use shelf rituals and packaging codes to identify credible positioning spaces.',
    nextMove: 'Cluster brands by proof cues: clinical, natural, luxury, community, and daily ritual.',
  },
  {
    id: 'beauty-category',
    accountId: 'market-notes',
    name: 'Beauty Category Codes',
    count: 25,
    accent: '#7a4d16',
    question: 'What visual codes make a beauty product feel premium, useful, or culturally current?',
    decision: 'Separate enduring category codes from fast-moving aesthetic templates.',
    nextMove: 'Map product shots against caption language to find repeated promise structures.',
  },
  {
    id: 'creator',
    accountId: 'market-notes',
    name: 'Creator Economy Women',
    count: 15,
    accent: '#557985',
    question: 'Where are women creators turning exhaustion into monetizable expertise?',
    decision: 'Look for the shift from personal story to system, template, course, or paid community.',
    nextMove: 'Save offer pages and announcement posts from creators with audience trust signals.',
  },
  {
    id: 'burnout',
    accountId: 'soft-work',
    name: 'Burnout Language',
    count: 22,
    accent: '#557985',
    question: 'What words help people describe depletion without turning it into personal failure?',
    decision: 'Center language that gives people room, not optimization pressure.',
    nextMove: 'Turn the best comments into a glossary of gentler work-language alternatives.',
  },
  {
    id: 'work-care',
    accountId: 'soft-work',
    name: 'Work & Care Narratives',
    count: 19,
    accent: '#6a7043',
    question: 'How do people explain the collision between ambition, care, and daily maintenance?',
    decision: 'Frame care as infrastructure, not an interruption to real work.',
    nextMove: 'Collect posts where users name the invisible admin behind being functional.',
  },
]

const tags = [
  ['aesthetic', 24, '#6a7043'],
  ['identity', 18, '#c99a20'],
  ['consumer insight', 16, '#8aa49a'],
  ['beauty labor', 14, '#c97468'],
  ['wellness', 13, '#667a46'],
  ['community', 11, '#778b98'],
  ['feminist lens', 9, '#155d43'],
  ['labor', 7, '#a72a22'],
] as const

const evidence: Evidence[] = [
  {
    id: 'e1',
    projectId: 'clean-girl',
    type: 'link',
    platform: 'TikTok',
    source: 'tiktok.com',
    title: '#cleangirl morning routine',
    date: 'May 12, 2025',
    tags: ['aesthetic', 'identity', 'wellness'],
    excerpt:
      'Routine format positions discipline as softness: ice roller, supplements, slicked hair, no-makeup makeup.',
  },
  {
    id: 'e2',
    projectId: 'clean-girl',
    type: 'quote',
    platform: 'Instagram',
    source: '@softgirlera_',
    title: 'Clean girl is not about perfection',
    date: 'May 11, 2025',
    tags: ['identity', 'aesthetic', 'community'],
    excerpt:
      'Clean girl is not about perfection. It is about feeling put together for yourself.',
  },
  {
    id: 'e3',
    projectId: 'clean-girl',
    type: 'screenshot',
    platform: 'Pinterest',
    source: 'screenshot',
    title: 'Bathroom shelf visual pattern',
    date: 'May 11, 2025',
    tags: ['aesthetic', 'wellness', 'consumer insight'],
    excerpt:
      'Repeating objects: green juice, white towels, ceramic trays, glass bottles, eucalyptus, muted marble.',
    image:
      'linear-gradient(135deg, #d9d0bd 0%, #f6f0e4 45%, #d3ded1 46%, #c0d1bd 67%, #efe6d7 68%)',
  },
  {
    id: 'e4',
    projectId: 'clean-girl',
    type: 'link',
    platform: 'Vogue',
    source: 'vogue.com',
    title: 'The Clean Girl Aesthetic Is More Complex Than It Looks',
    date: 'May 10, 2025',
    tags: ['aesthetic', 'identity', 'feminist lens'],
    excerpt:
      'Coverage reframes the trend through labor, class signaling, racialized beauty norms, and post-pandemic control.',
  },
  {
    id: 'e5',
    projectId: 'clean-girl',
    type: 'quote',
    platform: 'X',
    source: '@racheljohnson',
    title: 'Low maintenance is a privilege',
    date: 'May 9, 2025',
    tags: ['feminist lens', 'labor', 'tensions'],
    excerpt:
      'Low maintenance is a privilege. Let us talk about the labor behind effortless.',
  },
  {
    id: 'e6',
    projectId: 'tradwife',
    type: 'note',
    platform: 'Field note',
    source: 'manual note',
    title: 'Domesticity as aesthetic relief',
    date: 'May 8, 2025',
    tags: ['gender', 'nostalgia', 'home'],
    excerpt:
      'The fantasy is less about housework itself and more about escaping fragmented public performance.',
  },
  {
    id: 'e9',
    projectId: 'tradwife',
    type: 'quote',
    platform: 'TikTok',
    source: '@hearthnotes',
    title: 'I just want a slower life',
    date: 'May 8, 2025',
    tags: ['nostalgia', 'gender', 'security'],
    excerpt:
      'The comments keep returning to rest, money anxiety, and wanting one coherent role instead of six.',
  },
  {
    id: 'e10',
    projectId: 'body-image',
    type: 'link',
    platform: 'Instagram',
    source: '@longevityedit',
    title: 'Strong not skinny, but still surveilled',
    date: 'May 7, 2025',
    tags: ['body image', 'health', 'discipline'],
    excerpt:
      'Fitness captions trade thinness language for strength language while preserving measurement, tracking, and comparison.',
  },
  {
    id: 'e7',
    projectId: 'wellness',
    type: 'link',
    platform: 'Instagram',
    source: '@ritualshelf',
    title: 'Supplement shelf as identity signal',
    date: 'May 7, 2025',
    tags: ['consumer insight', 'wellness', 'brand codes'],
    excerpt:
      'Wellness products are staged as proof of intentionality: glass packaging, routine cards, muted labels.',
  },
  {
    id: 'e11',
    projectId: 'beauty-category',
    type: 'screenshot',
    platform: 'Instagram',
    source: 'screenshot',
    title: 'Serum dropper product grid',
    date: 'May 7, 2025',
    tags: ['brand codes', 'beauty', 'premium'],
    excerpt:
      'Visual formula repeats: macro texture, pale background, clinical claims, one warm human detail.',
    image:
      'linear-gradient(135deg, #efece5 0%, #f9f8f4 38%, #b9c9bd 39%, #e5dbca 63%, #f7efe7 64%)',
  },
  {
    id: 'e12',
    projectId: 'creator',
    type: 'link',
    platform: 'Substack',
    source: 'newsletter',
    title: 'From burnout story to paid operating system',
    date: 'May 6, 2025',
    tags: ['creator economy', 'offer', 'trust'],
    excerpt:
      'The strongest creators package lived experience as repeatable method: worksheets, office hours, and a named framework.',
  },
  {
    id: 'e8',
    projectId: 'burnout',
    type: 'quote',
    platform: 'Threads',
    source: '@softworknotes',
    title: 'I do not want balance, I want room',
    date: 'May 6, 2025',
    tags: ['burnout', 'work identity', 'care'],
    excerpt:
      'I do not want balance. I want room to be a person before I am productive.',
  },
  {
    id: 'e13',
    projectId: 'work-care',
    type: 'note',
    platform: 'Field note',
    source: 'manual note',
    title: 'Care as hidden project management',
    date: 'May 5, 2025',
    tags: ['care', 'work identity', 'daily systems'],
    excerpt:
      'Many posts frame care as spontaneous kindness, while comments reveal logistics, remembering, scheduling, and recovery time.',
  },
]

const projectInsights: Record<string, InsightContent> = {
  'clean-girl': {
    themes: [
      ['Curated simplicity as identity', 24],
      ['Wellness as aesthetic capital', 19],
      ['Discipline and daily ritual', 17],
      ['Soft femininity and control', 14],
      ['Community and belonging', 12],
    ],
    tensions: [
      ['Effortless look vs. constant effort', 26],
      ['Empowerment vs. conformity', 18],
      ['Self-care vs. self-surveillance', 16],
      ['Accessibility vs. aspirational ideals', 13],
    ],
    memo: [
      ['For this account', 'Frame the trend as invisible labor disguised as ease.'],
      ['Post angle', 'What looks natural is often a highly managed performance.'],
      ['Source to cite', 'Routine videos, shelf imagery, low-maintenance critique posts.'],
      ['Open question', 'When does clean become moral language?'],
    ],
  },
  tradwife: {
    themes: [
      ['Domesticity as relief fantasy', 18],
      ['Security through tradition', 14],
      ['Home as controlled stage', 12],
      ['Anti-hustle femininity', 9],
    ],
    tensions: [
      ['Rest desire vs. gender restriction', 19],
      ['Choice language vs. social pressure', 16],
      ['Aesthetic warmth vs. political edge', 12],
    ],
    memo: [
      ['For this account', 'Read the trend through exhaustion, not only ideology.'],
      ['Post angle', 'The fantasy is not housework. The fantasy is one stable role.'],
      ['Source to cite', 'Slow-life captions and comment sections about money anxiety.'],
      ['Open question', 'Who gets to call dependence peaceful?'],
    ],
  },
  'body-image': {
    themes: [
      ['Health language as beauty proxy', 16],
      ['Measurement as moral comfort', 13],
      ['Strength aesthetics', 12],
      ['Before-and-after confession', 8],
    ],
    tensions: [
      ['Liberation language vs. tracking culture', 18],
      ['Body neutrality vs. optimization', 14],
      ['Wellness proof vs. private anxiety', 11],
    ],
    memo: [
      ['For this account', 'Track the words that make body judgment sound scientific.'],
      ['Post angle', 'A new ideal can arrive wearing the language of health.'],
      ['Source to cite', 'Fitness captions, longevity content, comment debates.'],
      ['Open question', 'What counts as care when measurement becomes constant?'],
    ],
  },
  wellness: {
    themes: [
      ['Ritual as purchase justification', 15],
      ['Clinical-natural hybrid codes', 12],
      ['Shelf identity', 10],
      ['Daily proof of intention', 8],
    ],
    tensions: [
      ['Evidence vs. vibe', 17],
      ['Accessibility vs. premium restraint', 12],
      ['Routine utility vs. aesthetic staging', 10],
    ],
    memo: [
      ['For this account', 'Separate durable credibility cues from decorative wellness language.'],
      ['Post angle', 'The modern wellness shelf sells control before it sells ingredients.'],
      ['Source to cite', 'Packaging grids, morning routine posts, supplement comments.'],
      ['Open question', 'Which proof cues are now table stakes?'],
    ],
  },
  'beauty-category': {
    themes: [
      ['Clinical softness', 14],
      ['Texture as proof', 12],
      ['Quiet premium cues', 11],
      ['Promise compression', 9],
    ],
    tensions: [
      ['Luxury restraint vs. algorithmic sameness', 15],
      ['Science claims vs. sensory desire', 13],
      ['Minimal packaging vs. emotional warmth', 8],
    ],
    memo: [
      ['For this account', 'Watch how beauty brands make utility feel intimate.'],
      ['Post angle', 'Premium beauty now looks less decorated and more resolved.'],
      ['Source to cite', 'Product grids, ingredient posts, founder captions.'],
      ['Open question', 'When does restraint become generic?'],
    ],
  },
  creator: {
    themes: [
      ['Lived experience as method', 12],
      ['Burnout to framework', 10],
      ['Trust before scale', 8],
      ['Community as product wrapper', 7],
    ],
    tensions: [
      ['Vulnerability vs. monetization', 14],
      ['Personal story vs. repeatable system', 12],
      ['Care language vs. sales urgency', 9],
    ],
    memo: [
      ['For this account', 'Identify how creators convert biography into operating systems.'],
      ['Post angle', 'The new expert product starts as a survival story.'],
      ['Source to cite', 'Offer pages, newsletter launches, audience testimonials.'],
      ['Open question', 'What makes monetized vulnerability still feel ethical?'],
    ],
  },
  burnout: {
    themes: [
      ['Room before productivity', 17],
      ['Gentler ambition', 13],
      ['Anti-balance language', 11],
      ['Permission to pause', 9],
    ],
    tensions: [
      ['Rest as need vs. rest as content', 14],
      ['Self-trust vs. optimization advice', 12],
      ['Softness vs. avoidance', 8],
    ],
    memo: [
      ['For this account', 'Use language that validates depletion without selling a fix.'],
      ['Post angle', 'Maybe balance is too small a word for wanting room.'],
      ['Source to cite', 'Threads quotes, journal-style captions, comment confessions.'],
      ['Open question', 'What language helps without aestheticizing exhaustion?'],
    ],
  },
  'work-care': {
    themes: [
      ['Care as infrastructure', 13],
      ['Invisible scheduling labor', 11],
      ['Ambition with maintenance', 9],
      ['Family admin as cognitive load', 8],
    ],
    tensions: [
      ['Love language vs. labor language', 13],
      ['Ambition vs. availability', 11],
      ['Private care vs. public productivity', 9],
    ],
    memo: [
      ['For this account', 'Make the hidden admin of care visible without making care joyless.'],
      ['Post angle', 'Care is not the opposite of work. It is work with fewer dashboards.'],
      ['Source to cite', 'Field notes, comments about planning, weekly routine posts.'],
      ['Open question', 'What would care look like if it had real project status?'],
    ],
  },
}

function App() {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id)
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id)
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(evidence[0].id)
  const [activeTab, setActiveTab] = useState<InsightTab>('themes')
  const [query, setQuery] = useState('')

  const selectedAccount = accounts.find((account) => account.id === selectedAccountId) ?? accounts[0]
  const accountProjects = projects.filter((project) => project.accountId === selectedAccount.id)
  const selectedProject =
    accountProjects.find((project) => project.id === selectedProjectId) ?? accountProjects[0]
  const selectedInsights =
    (selectedProject ? projectInsights[selectedProject.id] : undefined) ?? projectInsights['clean-girl']

  const visibleEvidence = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return evidence.filter((item) => {
      if (item.projectId !== selectedProject?.id) return false
      if (!normalizedQuery) return true

      return [item.title, item.excerpt, item.platform, item.source, item.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [query, selectedProject?.id])

  const selectedEvidence =
    visibleEvidence.find((item) => item.id === selectedEvidenceId) ?? visibleEvidence[0]

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccountId(accountId)
    setQuery('')
    const firstProject = projects.find((project) => project.accountId === accountId)
    if (!firstProject) return

    setSelectedProjectId(firstProject.id)
    const firstEvidence = evidence.find((item) => item.projectId === firstProject.id)
    if (firstEvidence) setSelectedEvidenceId(firstEvidence.id)
  }

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId)
    setQuery('')
    const firstEvidence = evidence.find((item) => item.projectId === projectId)
    if (firstEvidence) setSelectedEvidenceId(firstEvidence.id)
  }

  return (
    <main className="desktop">
      <section
        className="app-window"
        aria-label="Lensdesk prototype"
        style={{ '--accent': selectedProject?.accent ?? selectedAccount.accent } as CSSProperties}
      >
        <header className="titlebar">
          <div className="traffic-lights" aria-hidden="true">
            <span className="traffic red" />
            <span className="traffic yellow" />
            <span className="traffic green" />
          </div>
          <button className="icon-button" type="button" aria-label="Toggle sidebar">
            <PanelRight size={16} />
          </button>
          <h1>Lensdesk</h1>
          <div className="title-actions">
            <button className="icon-button" type="button" aria-label="Search">
              <Search size={17} />
            </button>
            <button className="spark-button" type="button" aria-label="AI actions">
              <Sparkles size={16} />
            </button>
            <button className="icon-button" type="button" aria-label="More actions">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </header>

        <div className="workspace">
          <aside className="sidebar" aria-label="Accounts, projects, and tags">
            <div className="account-switcher">
              <div className="account-current">
                <span className="avatar" style={{ background: selectedAccount.accent }}>
                  <AtSign size={15} />
                </span>
                <div>
                  <strong>{selectedAccount.handle}</strong>
                  <p>{selectedAccount.name}</p>
                </div>
                <ChevronDown size={15} />
              </div>

              <div className="account-list" aria-label="Account lenses">
                {accounts.map((account) => (
                  <button
                    className={`account-row ${account.id === selectedAccount.id ? 'active' : ''}`}
                    key={account.id}
                    onClick={() => handleSelectAccount(account.id)}
                    style={{ '--project-accent': account.accent } as CSSProperties}
                    type="button"
                  >
                    <span className="account-dot" />
                    <span>{account.handle}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="section-heading">
              <span>Research Projects</span>
              <button className="mini-button" type="button" aria-label="Add project">
                <Plus size={15} />
              </button>
            </div>

            <nav className="project-list" aria-label="Research projects">
              <button className="project-row" type="button">
                <Inbox size={16} />
                <span>Inbox</span>
                <b>12</b>
              </button>
              {accountProjects.map((project) => (
                <button
                  className={`project-row ${project.id === selectedProject?.id ? 'active' : ''}`}
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  style={{ '--project-accent': project.accent } as CSSProperties}
                  type="button"
                >
                  <FolderOpen size={16} />
                  <span>{project.name}</span>
                  <b>{project.id === selectedProject?.id ? <Circle size={8} fill="currentColor" /> : project.count}</b>
                </button>
              ))}
              <button className="project-row new-row" type="button">
                <Plus size={16} />
                <span>New Research Project</span>
              </button>
            </nav>

            <div className="lens-mini">
              <div>
                <Compass size={15} />
                <span>Account Lens</span>
              </div>
              <p>{selectedAccount.lens}</p>
            </div>

            <div className="section-heading tag-heading">
              <span>Tags</span>
              <button className="mini-button" type="button" aria-label="Add tag">
                <Plus size={15} />
              </button>
            </div>

            <div className="tag-list">
              {tags.map(([name, count, color]) => (
                <button className="tag-row" key={name} type="button">
                  <span className="tag-dot" style={{ background: color }} />
                  <span>{name}</span>
                  <b>{count}</b>
                </button>
              ))}
            </div>

            <button className="archive-row" type="button">
              <Archive size={16} />
              <span>Archive</span>
            </button>
          </aside>

          <section className="evidence-pane" aria-label="Evidence">
            <div className="pane-toolbar">
              <div>
                <p className="eyebrow">{selectedAccount.handle} / {selectedProject?.name}</p>
                <h2>Evidence</h2>
              </div>
              <div className="toolbar-actions">
                <label className="search-box">
                  <Search size={15} />
                  <input
                    aria-label="Search evidence"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search evidence"
                    type="search"
                    value={query}
                  />
                </label>
                <button className="pill-button" type="button">
                  All Evidence <ChevronDown size={14} />
                </button>
                <button className="icon-button bordered" type="button" aria-label="Filter evidence">
                  <Filter size={15} />
                </button>
              </div>
            </div>

            {selectedProject && (
              <section className="project-brief" style={{ '--project-accent': selectedProject.accent } as CSSProperties}>
                <div>
                  <span className="brief-label">Research question</span>
                  <p>{selectedProject.question}</p>
                </div>
                <div>
                  <span className="brief-label">Working decision</span>
                  <p>{selectedProject.decision}</p>
                </div>
              </section>
            )}

            <div className="evidence-list">
              {visibleEvidence.length > 0 ? (
                visibleEvidence.map((item) => (
                  <button
                    className={`evidence-card ${item.id === selectedEvidence?.id ? 'selected' : ''}`}
                    key={item.id}
                    onClick={() => setSelectedEvidenceId(item.id)}
                    type="button"
                  >
                    <div className={`evidence-thumb ${item.type}`} style={item.image ? { background: item.image } : undefined}>
                      {item.type === 'link' && <Link size={22} />}
                      {item.type === 'quote' && <span>"</span>}
                      {item.type === 'note' && <FileText size={21} />}
                    </div>
                    <div className="evidence-body">
                      <div className="card-meta">
                        <span>{item.source}</span>
                        <span>{item.platform}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <div className="card-footer">
                        <span className="date">{item.date}</span>
                        <div className="chips">
                          {item.tags.map((tagName) => (
                            <span className={`chip ${tagName.includes('labor') || tagName.includes('tensions') ? 'warn' : ''}`} key={tagName}>
                              {tagName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <Bookmark size={16} />
                      <MoreHorizontal size={17} />
                    </div>
                  </button>
                ))
              ) : (
                <div className="empty-state">
                  <Inbox size={22} />
                  <h3>No matching evidence</h3>
                  <p>Try another search or add a new clip to this project.</p>
                </div>
              )}
            </div>

            <form className="composer">
              <input aria-label="Ask about this account lens" placeholder={`Ask through ${selectedAccount.handle}'s lens...`} />
              <div className="composer-actions">
                <button type="button" aria-label="Command menu">
                  <Command size={15} />
                </button>
                <button type="button" aria-label="Attach material">
                  <Paperclip size={15} />
                </button>
                <button className="send-button" type="submit" aria-label="Send">
                  <Send size={15} />
                </button>
              </div>
            </form>
          </section>

          <aside className="inspector" aria-label="Insights">
            <div className="inspector-tabs">
              {(['themes', 'tensions', 'memo'] as InsightTab[]).map((tab) => (
                <button
                  className={activeTab === tab ? 'active' : ''}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <section className="insight-card lens-card">
              <div className="insight-heading">
                <Target size={15} />
                <h2>Account Lens</h2>
              </div>
              <p>{selectedAccount.lens}</p>
              <div className="lens-grid">
                <div>
                  <Users size={14} />
                  <span>{selectedAccount.audience}</span>
                </div>
                <div>
                  <Sparkles size={14} />
                  <span>{selectedAccount.tone}</span>
                </div>
              </div>
              <div className="pillar-list">
                {selectedAccount.pillars.map((pillar) => (
                  <span className="chip" key={pillar}>{pillar}</span>
                ))}
              </div>
            </section>

            <section className="insight-card summary-card">
              <div className="insight-heading">
                <Layers3 size={15} />
                <h2>Lens Read</h2>
              </div>
              <p>
                For {selectedAccount.handle}, <b>{selectedProject?.name}</b> is asking:
                {' '}{selectedProject?.question}
              </p>
              <div className="next-move">
                <span>Next move</span>
                <p>{selectedProject?.nextMove}</p>
              </div>
            </section>

            <section className="insight-card">
              <div className="insight-heading">
                {activeTab === 'themes' && <Tag size={15} />}
                {activeTab === 'tensions' && <Circle size={13} fill="currentColor" />}
                {activeTab === 'memo' && <ClipboardList size={15} />}
                <h2>{activeTab}</h2>
                <button className="mini-button" type="button" aria-label="Add insight">
                  <Plus size={14} />
                </button>
              </div>

              {activeTab !== 'memo' ? (
                <div className="ranked-list">
                  {selectedInsights[activeTab].map(([label, count]) => (
                    <div className="ranked-row" key={label}>
                      <span>{label}</span>
                      <b>{count}</b>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="memo-list">
                  {selectedInsights.memo.map(([label, value]) => (
                    <div className="memo-row" key={label}>
                      <span>{label}</span>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="insight-card">
              <div className="insight-heading">
                <MessageSquareText size={15} />
                <h2>Selected Clip</h2>
              </div>
              {selectedEvidence ? (
                <div className="selected-clip">
                  <span>{selectedEvidence.platform}</span>
                  <h3>{selectedEvidence.title}</h3>
                  <p>{selectedEvidence.excerpt}</p>
                </div>
              ) : (
                <p>No material selected.</p>
              )}
            </section>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
