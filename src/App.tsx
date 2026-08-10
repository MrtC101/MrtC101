import { useEffect, useState, type Dispatch } from 'react'
import {
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  TranslateIcon,
} from '@phosphor-icons/react'
import './App.css'
import { parseContent, type Lang } from './lib/parser'
import { getSocialConfig } from './lib/social'
import { sectionTitles, ui, proficiencyLevels } from './lib/i18n'
import { renderInline } from './lib/markdown'
import { Button } from '@/components/ui/button'
import { BuiltWithClaude } from '@/components/cv/BuiltWithClaude'
import { Section } from '@/components/cv/Section'
import { SidebarSection } from '@/components/cv/SidebarSection'
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
    <div className="mx-auto min-h-svh max-w-5xl px-4 py-10 md:px-8 md:py-16">
      <div className="mb-8 flex items-center justify-between gap-2">
        <BuiltWithClaude label={strings.builtWithClaude} />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={`${import.meta.env.BASE_URL}Martin_Cogo_CV_${lang}.pdf`} download />
            }
          >
            <DownloadSimpleIcon size={16} />
            {strings.downloadCv}
          </Button>
          <Button variant="outline" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>
            <TranslateIcon size={16} />
            {strings.langToggle}
          </Button>
        </div>
      </div>

      <div
        key={lang}
        className="grid grid-cols-1 gap-x-12 gap-y-12 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 motion-safe:ease-out lg:grid-cols-[16rem_1fr]"
      >
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{content.cv.name}</h1>
          <p className="mt-2 text-primary">{content.cv.headline}</p>

          <div className="mt-6 space-y-2.5 text-sm">
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

          <SidebarSection title={titles.technical_skills}>
            <div className="space-y-5">
              {sections.technical_skills.map((group) => (
                <div key={group.label}>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">{group.label}</h4>
                  {group.key === 'languages' ? (
                    <LanguageProficiency
                      languages={group.details.split(', ')}
                      levelLabels={proficiencyLevels[lang]}
                      note={strings.languageConfidenceNote}
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {group.details.split(', ').map((skill) => (
                        <SkillBadge key={skill} label={skill} size="sm" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title={titles.education}>
            <div className="space-y-6">
              {sections.education.map((entry) => (
                <EducationItem key={entry.institution} entry={entry} lang={lang} />
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title={titles.achievements_and_languages}>
            <ul className="space-y-2">
              {sections.achievements_and_languages.map((achievement) => (
                <li key={achievement.bullet} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                  <span className="mt-1 text-primary">•</span>
                  <span>{renderInline(achievement.bullet)}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>
        </aside>

        <main>
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
                <ExperienceItem
                  key={`${entry.company}-${entry.start_date}`}
                  entry={entry}
                  lang={lang}
                />
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  )
}

export default App
