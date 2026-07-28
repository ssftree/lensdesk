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
  { id: 'clean-girl', accountId: 'fem-signal', name: 'Clean Girl Aesthetic', count: 42, accent: '#155d43' },
  { id: 'tradwife', accountId: 'fem-signal', name: 'Tradwife Discourse', count: 31, accent: '#8b3a3a' },
  { id: 'body-image', accountId: 'fem-signal', name: 'Body Image Shifts', count: 21, accent: '#6a7043' },
  { id: 'wellness', accountId: 'market-notes', name: 'Wellness Market Scan', count: 18, accent: '#9a7a2f' },
  { id: 'beauty-category', accountId: 'market-notes', name: 'Beauty Category Codes', count: 25, accent: '#7a4d16' },
  { id: 'creator', accountId: 'market-notes', name: 'Creator Economy Women', count: 15, accent: '#557985' },
  { id: 'burnout', accountId: 'soft-work', name: 'Burnout Language', count: 22, accent: '#557985' },
  { id: 'work-care', accountId: 'soft-work', name: 'Work & Care Narratives', count: 19, accent: '#6a7043' },
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
]

const tabContent = {
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
    const firstProject = projects.find((project) => project.accountId === accountId)
    if (!firstProject) return

    setSelectedProjectId(firstProject.id)
    const firstEvidence = evidence.find((item) => item.projectId === firstProject.id)
    if (firstEvidence) setSelectedEvidenceId(firstEvidence.id)
  }

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId)
    const firstEvidence = evidence.find((item) => item.projectId === projectId)
    if (firstEvidence) setSelectedEvidenceId(firstEvidence.id)
  }

  return (
    <main className="desktop">
      <section className="app-window" aria-label="Lensdesk prototype">
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

            <div className="evidence-list">
              {visibleEvidence.map((item) => (
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
              ))}
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
                For {selectedAccount.handle}, this project is less about tracking a trend and more
                about deciding what this signal means for the account&apos;s audience, voice, and
                next publishable idea.
              </p>
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
                  {tabContent[activeTab].map(([label, count]) => (
                    <div className="ranked-row" key={label}>
                      <span>{label}</span>
                      <b>{count}</b>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="memo-list">
                  {tabContent.memo.map(([label, value]) => (
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
