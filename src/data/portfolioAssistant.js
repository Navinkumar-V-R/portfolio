import { certifications, profile, projects, skills } from './portfolio'

const stopWords = new Set([
  'a', 'about', 'an', 'and', 'are', 'can', 'did', 'do', 'does', 'for', 'he', 'his',
  'how', 'i', 'in', 'is', 'it', 'me', 'of', 'on', 'or', 'tell', 'that', 'the',
  'this', 'to', 'what', 'when', 'where', 'which', 'who', 'why', 'with', 'would',
  'you', 'your', 'has', 'have', 'had', 'was', 'were', 'been', 'be', 'know', 'work',
  'worked', 'working', 'done', 'tell', 'about', 'navin', 'navinkumar', 'please',
])

const tokenize = value => value.toLowerCase().match(/[a-z0-9+#.]+/g) ?? []
const contains = (text, terms) => terms.some(term => text.includes(term))

function makeKnowledge() {
  return [
    {
      title: 'Professional profile',
      text: `${profile.shortName} is a ${profile.role} based in ${profile.location}. ${profile.summary}`,
      searchable: `${profile.role} ${profile.location} ${profile.summary}`,
    },
    {
      title: 'Experience',
      text: `${profile.shortName} has worked as a ${profile.role} at ${profile.employer} since ${profile.experience}. The portfolio highlights full stack development, reusable React interfaces, REST APIs, validation, authentication, databases, Azure deployments, production support, Agile teamwork, and mentoring junior developers.`,
      searchable: `experience job role employer company ${profile.employer} ${profile.experience} full stack React APIs Azure deployment support Agile mentoring team`,
    },
    ...skills.map(([category, items]) => ({
      title: `${category} skills`,
      text: `${category}: ${items}.`,
      searchable: `${category} skills technologies tools ${items}`,
    })),
    ...projects.map(project => ({
      title: project.title,
      text: `${project.title} (${project.type}): ${project.description} Technologies: ${project.stack.join(', ')}. ${project.work.slice(0, 3).join(' ')}`,
      searchable: `${project.title} ${project.type} ${project.description} ${project.stack.join(' ')} ${project.work.join(' ')}`,
    })),
    ...certifications.map(([issuer, title]) => ({
      title: 'Certification',
      text: `${title} — ${issuer}.`,
      searchable: `certification certificate course ${issuer} ${title}`,
    })),
  ]
}

const knowledge = makeKnowledge()

function findRelevantFacts(question) {
  const terms = [...new Set(tokenize(question)
    .filter(term => term.length > 1 && !stopWords.has(term))
    .map(term => term.endsWith('s') ? term.slice(0, -1) : term))]

  if (!terms.length) return []

  return knowledge
    .map(entry => {
      const searchable = new Set(tokenize(entry.searchable)
        .map(term => term.endsWith('s') ? term.slice(0, -1) : term))
      const score = terms.reduce((total, term) => total + (searchable.has(term) ? 1 : 0), 0)
      return { ...entry, score }
    })
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
}

function getTechnologyAnswer(query) {
  const knownTechnologies = [...new Set([
    ...skills.flatMap(([, items]) => items.split(' · ')),
    ...projects.flatMap(project => project.stack),
  ])].sort((a, b) => b.length - a.length)
  const requested = knownTechnologies.filter(technology =>
    query.includes(technology.toLowerCase()))

  if (/\bsql\b/.test(query) && !requested.some(technology => technology.toLowerCase() === 'mysql')) {
    requested.push('MySQL')
  }
  if (!requested.length) return null

  const technology = requested[0]
  const relatedSkills = skills
    .filter(([, items]) => items.toLowerCase().includes(technology.toLowerCase()))
    .map(([category, items]) => `${category}: ${items}`)
  const relatedProjects = projects.filter(project =>
    project.stack.some(item => item.toLowerCase() === technology.toLowerCase()))
  const projectDetails = relatedProjects.map(project => {
    const matchingWork = project.work.filter(item => {
      const lower = item.toLowerCase()
      return lower.includes(technology.toLowerCase()) ||
        (technology.toLowerCase() === 'mysql' && /database|data validation|crud/i.test(item))
    })
    return `${project.title}: ${project.description}${matchingWork.length ? ` ${matchingWork.slice(0, 2).join(' ')}` : ''}`
  })

  const context = [
    ...relatedSkills,
    ...projectDetails,
  ].filter(Boolean).join('\n\n')
  const duration = /how many years|years? of experience|how long/.test(query)
    ? `The portfolio lists ${profile.overallExperience} of software development experience overall, but doesn’t specify a separate number of years for ${technology}.`
    : ''

  return [duration, context].filter(Boolean).join('\n\n')
}

export function answerPortfolioQuestion(question) {
  const query = question.trim().toLowerCase()

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(query)) {
    return `Hi! I can answer questions about ${profile.shortName}'s experience, skills, projects, and certifications. What would you like to know?`
  }

  if (contains(query, ['resume', 'resume', 'cv'])) {
    return `Of course. You can view or download ${profile.shortName}’s resume using the link below.`
  }

  if (contains(query, ['linkedin'])) {
    return `Of course. You can visit ${profile.shortName}’s LinkedIn profile using the link below.`
  }

  if (contains(query, ['website'])) {
    return `You’re viewing ${profile.shortName}’s portfolio website.`
  }

  if (contains(query, ['salary', 'compensation', 'notice period'])) {
    return `For salary expectations or notice period details, please call ${profile.shortName} at ${profile.mobile}.`
  }

  if (contains(query, ['relocate', 'relocation'])) {
    return `${profile.shortName} is ready for relocation.`
  }

  if (contains(query, ['shift', 'timing', 'working hours', 'schedule'])) {
    return `${profile.shortName} is available for any timing except the night shift.`
  }

  if (contains(query, ['education', 'degree', 'university', 'college', 'school', 'studied', 'study'])) {
    return `${profile.education} from ${profile.university} (${profile.graduation}). The affiliated college name is ${profile.college}.`
  }

  if (contains(query, ['contact', 'reach', 'get in touch'])) {
    return `You can reach ${profile.shortName} by email or phone:\nEmail: ${profile.email}\nMobile: ${profile.mobile}`
  }

  if (contains(query, ['email', 'email address', 'email id'])) {
    return `You can email ${profile.shortName} at ${profile.email}.`
  }

  if (contains(query, ['mobile', 'phone', 'phone number', 'call', 'whatsapp'])) {
    return `You can call ${profile.shortName} at ${profile.mobile}.`
  }

  if (contains(query, ['who is', 'introduce', 'background', 'profile', 'about navin', 'about him', 'what does navin do'])) {
    return `${profile.shortName} is a ${profile.role} based in ${profile.location}. ${profile.summary}`
  }

  if (contains(query, ['visa'])) {
    return `The resume doesn’t mention visa details. For clarification, please call ${profile.shortName} at ${profile.mobile}.`
  }

  const technologyAnswer = getTechnologyAnswer(query)
  if (technologyAnswer) return technologyAnswer

  if (contains(query, ['where', 'location', 'based']) &&
    !contains(query, ['work', 'worked', 'company', 'employer'])) {
    return `${profile.shortName} is based in ${profile.location}.`
  }

  const asksAboutSpecificWork = projects.some(project =>
    contains(query, [project.title.toLowerCase(), ...project.stack.map(item => item.toLowerCase())]))
  if ((contains(query, ['experience', 'employer', 'company', 'career', 'responsibilit', 'employment', 'job', 'role', 'years', 'where did he work', 'which company']) && !asksAboutSpecificWork)) {
    return knowledge.find(entry => entry.title === 'Experience').text
  }

  if (contains(query, ['certification', 'certificate', 'certified'])) {
    return `The portfolio lists these certifications: \n ${certifications.map(([, title]) => title).join('\n ')}.`
  }

  const skillCategories = [
    { name: 'Frontend', aliases: ['frontend', 'front end'] },
    { name: 'Backend', aliases: ['backend', 'back end'] },
    { name: 'Data', aliases: ['data', 'database', 'db'] },
    { name: 'Cloud & tools', aliases: ['cloud', 'tools', 'deployment', 'deploy'] },
  ]
  const requestedCategory = skillCategories.find(({ aliases }) =>
    aliases.some(alias => query.includes(alias)))
  const asksForSkills = contains(query, ['skill', 'skills', 'stack', 'technology', 'technologies', 'tools'])

  if (requestedCategory && (asksForSkills || query.split(/\s+/).length <= 2)) {
    const [, items] = skills.find(([category]) => category === requestedCategory.name)
    return `${requestedCategory.name}: ${items}.`
  }

  if (contains(query, ['skill', 'technology', 'tech stack', 'tools', 'programming language', 'framework'])) {
    return skills.map(([category, items]) => `${category}: ${items}`).join('\n')
  }

  if (contains(query, ['automation', 'uipath', 'reconciliation', 'receivable', 'insurance verification'])) {
    const automation = projects.find(project => project.type === 'Automation')
    return `${automation.title}: ${automation.description} ${automation.work.join(' ')}`
  }

  if (contains(query, ['project', 'projects', 'portfolio']) &&
    !projects.some(project => contains(query, [project.title.toLowerCase(), ...project.stack.map(item => item.toLowerCase())]))) {
    return projects.map(project => `${project.title} (${project.type}): ${project.description}`).join('\n\n')
  }

  const matches = findRelevantFacts(query)
  if (matches.length) {
    const bestScore = matches[0].score
    return matches
      .filter(entry => entry.score >= Math.max(1, bestScore - 1))
      .slice(0, 3)
      .map(entry => entry.text)
      .join('\n\n')
  }

  if (contains(query, ['project', 'built', 'developed', 'done', 'portfolio', 'background', 'about'])) {
    const featured = projects.slice(0, 3).map(project => `${project.title} (${project.type})`).join(', ')
    return `${profile.summary} Projects include ${featured}, along with web development and process automation work. Ask me about a project, technology, experience, or certification for more detail.`
  }

  return `I couldn’t find that detail in the portfolio. I can help with ${profile.shortName}'s experience, skills, projects, certifications, or contact information.`
}

export function getPortfolioAction(question) {
  const query = question.trim().toLowerCase()

  if (contains(query, ['linkedin'])) {
    return { href: profile.linkedin, label: 'Open LinkedIn profile', external: true }
  }

  if (contains(query, ['resume', 'resume', 'cv'])) {
    return { href: profile.resume, label: 'View resume', external: true }
  }

  if (contains(query, ['salary', 'compensation', 'notice period', 'mobile', 'phone', 'call', 'whatsapp'])) {
    return { href: `tel:${profile.mobile.replace(/[^+\d]/g, '')}`, label: `Call ${profile.mobile}` }
  }

  if (contains(query, ['email', 'contact', 'reach', 'get in touch'])) {
    return { href: `mailto:${profile.email}`, label: `Email ${profile.email}` }
  }

  return null
}
