import { motion } from 'framer-motion'
import FlipCard from './FlipCard'
import FAQ from './FAQ'

interface SectionContent {
  text?: string
  title?: string
  subtitle?: string
  message?: string
  cards?: {
    title: string
    items: string[]
  }[]
  faqItems?: {
    question: string
    answer: string
  }[]
  background?: string
}

interface SectionProps {
  section: {
    id: string
    title: string
    content: SectionContent
  }
  isActive: boolean
}

export default function Section({ section, isActive }: SectionProps) {
  return (
    <motion.section
      id={section.id}
      className={`section ${isActive ? 'active' : ''} ${section.id === 'intro' ? 'intro-inverted' : ''}`}
      initial={{ opacity: 0.1 }}
      animate={{ opacity: isActive ? 1 : 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-content">
        {section.id === 'intro' ? (
          <div className="intro-section">
            {/* Empty intro section, only background image */}
          </div>
        ) : section.content.cards ? (
          <div className="cards-section">
            <h2>{section.title}</h2>
            <div className="cards-container">
              {section.content.cards.map((card, index) => (
                <>
                  <div className="desktop-only">
                    <FlipCard
                      key={index}
                      title={card.title}
                      isVisible={isActive}
                      isLast={index === section.content.cards!.length - 1}
                    >
                      <ul>
                        {card.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </FlipCard>
                  </div>
                  <div className="mobile-only">
                    <div className="mobile-card">
                      <h3>{card.title}</h3>
                      <ul>
                        {card.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    {index < section.content.cards!.length - 1 && (
                      <div className="mobile-separator" />
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        ) : section.content.faqItems ? (
          <div className="faq-section">
            <h2>{section.title}</h2>
            <FAQ items={section.content.faqItems} />
          </div>
        ) : (
          <div className="default-section">
            <h2>{section.title}</h2>
            {section.content.subtitle && (
              <h3 className="subtitle">{section.content.subtitle}</h3>
            )}
            {section.content.message && (
              <p className="highlight">{section.content.message}</p>
            )}
            {section.content.text && (
              <div className="content">
                <p>{section.content.text}</p>
              </div>
            )}
            {section.id === 'apply' && (
              <a
                href="https://bcnv9gyut9jb.feishu.cn/share/base/form/shrcn9ULf1923cdIW9Xwny4829c"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                立即报名
              </a>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .section {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6rem 2rem;
          scroll-snap-align: center;
          scroll-snap-stop: always;
          position: relative;
          background-color: var(--primary-bg);
          color: var(--primary-text);
          opacity: 1;
          transform: translateY(0);
          transition: transform 0.6s ease, opacity 0.6s ease;
          will-change: transform, opacity;
          flex-shrink: 0;
        }

        .cards-section,
        .faq-section {
          width: 100%;
          max-width: var(--content-max-width);
          text-align: center;
        }

        .cards-container {
          display: flex;
          justify-content: stretch;
          gap: 0;
          margin-top: 3rem;
          width: 100%;
        }

        .subtitle {
          font-size: 1.8rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 1rem 0 2rem;
          font-weight: 500;
        }

        .desktop-only {
          display: block;
          flex: 1;
          min-width: 0;
        }

        .mobile-only {
          display: none;
        }

        @media (min-width: 1201px) {
          .cards-container {
            gap: 0;
          }

          .desktop-only {
            flex: 1 1 0;
          }
        }

        @media (max-width: 1200px) {
          .cards-container {
            flex-direction: column;
            align-items: stretch;
            gap: 2rem;
          }
        }

        .section:not(.active):not(#intro) {
          opacity: 0.1;
        }

        .section.active {
          opacity: 1;
          transform: translateY(0);
        }

        .intro-inverted {
          background: transparent !important;
        }

        .intro-inverted .intro-section h1,
        .intro-inverted .intro-section p {
          color: #000000;
        }

        .section-content {
          width: 100%;
          max-width: var(--content-max-width);
          margin: 0 auto;
          text-align: center;
          padding: 0 2rem;
        }

        .intro-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
          min-height: 100vh;
          position: relative;
        }

        .intro-section::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: #FFEC03;
          z-index: -2;
        }

        .intro-section::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background-image: url('/PivotHack BG.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          z-index: -1;
          transform: scale(1);
          transition: transform 0.6s ease;
        }

        @media (max-width: 768px) {
          .intro-section::after {
            background-size: 260% auto;
            transform: none;
            background-position: 48% center;
            background-repeat: no-repeat;
          }

          .section:not(.active) .intro-section::after {
            transform: scale(0.98);
          }
        }

        .section:not(.active) .intro-section::after {
          transform: scale(0.98);
        }

        .intro-section .logo {
          width: 200px;
          height: auto;
        }

        .intro-section h1 {
          font-size: 4rem;
          font-weight: 700;
          margin: 0;
        }

        .highlight {
          font-size: 36pt;
          font-weight: 600;
          color: #FFEC03;
          text-align: center;
          text-shadow: 0 0 20px rgba(255, 236, 3, 0.5);
          animation: pulse 2s ease-in-out infinite;
          line-height: 1.2;
          margin-bottom: 2rem;
        }

        @keyframes pulse {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 236, 3, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(255, 236, 3, 0.8);
          }
        }

        .intro-inverted .highlight {
          color: #000000;
        }

        .default-section {
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        h2 {
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0;
        }

        .subtitle {
          font-size: 1.8rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          margin: 0;
        }

        .highlight {
          font-size: 48pt;
          font-weight: 600;
          color: #FFEC03;
          text-align: center;
          text-shadow: 0 0 20px rgba(255, 236, 3, 0.5);
          animation: pulse 2s ease-in-out infinite;
          line-height: 1.2;
          margin: 0;
        }

        .content {
          font-size: 1.2rem;
          line-height: 1.8;
          white-space: pre-line;
          text-align: center;
        }

        .content p {
          margin: 0;
        }

        #statement .content {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 768px) {
          .section {
            padding: 2rem 1rem;
          }

          .section-content {
            padding: 0 1rem;
          }

          .intro-section h1 {
            font-size: 3rem;
          }

          h2 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1.5rem;
          }

          .highlight {
            font-size: 36pt;
          }

          .cta-button {
            padding: 0.8rem 2rem;
            font-size: 1.2rem;
          }

          #statement .content {
            font-size: 1.2rem;
          }

          .default-section {
            gap: 1rem;
          }
        }

        .cta-button {
          padding: 0.85rem 2.75rem;
          font-size: 1.5rem;
          font-weight: 600;
          background: #FFEC03;
          color: #000;
          border: none;
          border-radius: 45px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #FFEC03, #FF6347, #FF00FF, #00FFFF, #FFEC03);
          background-size: 400%;
          z-index: -1;
          filter: blur(10px);
          animation: glowing 20s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          border-radius: 32px;
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(255, 236, 3, 0.5);
        }

        .cta-button:hover::before {
          opacity: 0.8;
        }

        @keyframes glowing {
          0% {
            background-position: 0 0;
          }
          50% {
            background-position: 400% 0;
          }
          100% {
            background-position: 0 0;
          }
        }

        .mobile-card {
          padding: 1.5rem;
          text-align: left;
        }

        .mobile-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #FFEC03;
          margin-bottom: 1rem;
        }

        .mobile-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mobile-card li {
          margin-bottom: 0.75rem;
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
        }

        .mobile-separator {
          height: 1px;
          background: rgba(255, 236, 3, 0.3);
          margin: 2rem 0;
          width: 100%;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: block;
          }

          .cards-container {
            margin-top: 2rem;
          }
        }
      `}</style>
    </motion.section>
  )
} 