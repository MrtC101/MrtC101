import { useEffect, useState, type Dispatch } from 'react'
import { EnvelopeSimpleIcon, MapPinIcon, TranslateIcon } from '@phosphor-icons/react'
import './App.css'
import { parseContent, type Lang } from './lib/parser'
import { getSocialConfig } from './lib/social'
import { sectionTitles, ui, proficiencyLevels } from './lib/i18n'
import { renderInline } from './lib/markdown'
import { Button } from '@/components/ui/button'
import { BuiltWithClaude } from '@/components/cv/BuiltWithClaude'
import { Section } from '@/components/cv/Section'
import { SkillBadge } from '@/components/cv/SkillBadge'
import { LanguageProficiency } from '@/components/cv/LanguageProficiency'
import { ExperienceItem } from '@/components/cv/ExperienceItem'
import { EducationItem } from '@/components/cv/EducationItem'
import { ContactLink } from '@/components/cv/ContactLink'

function App() {
  const [lang, setLang]: [Lang, Dispatch<Lang>] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang')
    return stored === 'en' || stored === 'es' ? stored : 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const result = parseContent(lang)

  if (!result.success) {
    console.error(result.error.issues)
    return <div>Error al cargar el CV: revisá la consola.</div>
  }

  const content = result.data
  const { sections } = content.cv
  const titles = sectionTitles[lang]
  const strings = ui[lang]

  return (
    <div className="mx-auto min-h-svh max-w-3xl px-4 py-10 md:px-8 md:py-16">
      <div className="mb-8 flex items-center justify-between gap-2">
        <BuiltWithClaude label={strings.builtWithClaude} />
        <Button variant="outline" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>
          <TranslateIcon size={16} />
          {strings.langToggle}
        </Button>
      </div>

      <header className="border-b border-border pb-10 md:pb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {content.cv.name}
        </h1>
        <p className="mt-2 text-lg text-primary">{content.cv.headline}</p>

        <div className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <ContactLink icon={MapPinIcon}>{content.cv.location}</ContactLink>
          <ContactLink icon={EnvelopeSimpleIcon} href={`mailto:${content.cv.email}`}>
            {content.cv.email}
          </ContactLink>
          {content.cv.social_networks.map((social) => {
            const config = getSocialConfig(social.network)
            if (!config) return null
            return (
              <ContactLink
                key={social.network}
                icon={config.icon}
                href={config.href(social.username)}
              >
                {config.label(social.username)}
              </ContactLink>
            )
          })}
        </div>
      </header>

      <Section title={titles.profile}>
        {sections.profile.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-foreground/80">
            {renderInline(paragraph)}
          </p>
        ))}
      </Section>

      <Section title={titles.experience}>
        <div className="space-y-10">
          {sections.experience.map((entry) => (
            <ExperienceItem key={`${entry.company}-${entry.start_date}`} entry={entry} lang={lang} />
          ))}
        </div>
      </Section>

      <Section title={titles.technical_skills}>
        <div className="space-y-5">
          {sections.technical_skills.map((group) => (
            <div key={group.label}>
              <h3 className="mb-2.5 text-sm font-semibold text-foreground">{group.label}</h3>
              {group.key === 'languages' ? (
                <LanguageProficiency
                  languages={group.details.split(', ')}
                  levelLabels={proficiencyLevels[lang]}
                  note={strings.languageConfidenceNote}
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {group.details.split(', ').map((skill) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title={titles.education}>
        <div className="space-y-6">
          {sections.education.map((entry) => (
            <EducationItem key={entry.institution} entry={entry} lang={lang} />
          ))}
        </div>
      </Section>

      <Section title={titles.achievements_and_languages}>
        <ul className="space-y-2">
          {sections.achievements_and_languages.map((achievement) => (
            <li key={achievement.bullet} className="flex gap-2 leading-relaxed text-foreground/80">
              <span className="mt-1 text-primary">•</span>
              <span>{renderInline(achievement.bullet)}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

export default App
