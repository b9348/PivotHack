import { useCallback } from 'react'
import Image from 'next/image'

interface Section {
  id: string
  title: string
}

interface NavBarProps {
  sections: Section[]
  activeSection: number
}

const navSections = ['welcome', 'provide', 'benefits', 'faq']

export default function NavBar({ sections, activeSection }: NavBarProps) {
  const getNavTitle = (id: string) => {
    switch (id) {
      case 'statement':
        return '愿景';
      case 'welcome':
        return '简介';
      case 'provide':
        return '支持';
      case 'benefits':
        return '收获';
      case 'faq':
        return 'FAQ';
      default:
        return '';
    }
  }

  const scrollToSection = useCallback((index: number) => {
    const element = document.querySelectorAll('.section')[index]
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <nav className={`navbar ${activeSection === 0 ? 'navbar-intro' : ''}`}>
      <div className="nav-content">
        <div className="logo-container">
          <div className="logo-wrapper">
            <Image
              src={activeSection === 0 ? '/IntroLogo.png' : '/HomepageLogo.png'}
              alt={activeSection === 0 ? 'Intro Logo' : 'Homepage Logo'}
              className={`logo-image ${activeSection === 0 ? 'intro-logo' : ''}`}
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
        <div className="nav-links">
          {sections
            .filter(s => navSections.includes(s.id))
            .map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(sections.findIndex(s => s.id === section.id))}
                className="nav-link"
              >
                {getNavTitle(section.id)}
              </button>
            ))}
          <a
            href="https://bcnv9gyut9jb.feishu.cn/share/base/form/shrcn9ULf1923cdIW9Xwny4829c"
            target="_blank"
            rel="noopener noreferrer"
            className="apply-button"
          >
            <span className="apply-text-desktop">立即报名</span>
            <span className="apply-text-mobile">报名</span>
          </a>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-height, 80px);
          background: #000000;
          backdrop-filter: blur(300px);
          z-index: 100;
          padding: 1rem 0;
          transition: all 0.3s ease;
        }

        .navbar-intro {
          background: transparent;
        }

        .navbar-intro button {
          color: #000000;
        }

        .navbar-intro button:hover {
          color: rgba(0, 0, 0, 0.7);
        }

        .nav-content {
          max-width: var(--content-max-width);
          margin: 0 auto;
          padding: 0 var(--section-padding);
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        .logo-container {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .logo-wrapper {
          position: relative;
          width: 120px;
          height: 40px;
        }

        .logo-image {
          transition: all 0.3s ease;
        }

        .intro-logo {
          width: 60px !important;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--primary-text);
          opacity: 0.7;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .nav-link:hover {
          opacity: 1;
        }

        .navbar-intro .nav-link {
          color: #000000;
        }

        .apply-button {
          background: #FFEC03;
          color: #000000;
          border: none;
          padding: 0.45rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .navbar-intro .apply-button {
          background: #000000;
          color: #FFEC03;
        }

        .apply-button:hover {
          transform: scale(1.05);
        }

        .apply-text-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .navbar {
            height: auto;
          }

          .nav-content {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem var(--section-padding);
          }

          .logo-wrapper {
            width: 100px;
            height: 33px;
          }

          .intro-logo {
            width: 50px !important;
          }

          .nav-links {
            width: 100%;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding-bottom: 0.5rem;
            gap: 0.75rem;
          }

          .nav-link {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
          }

          .apply-button {
            padding: 0.4rem 1.2rem;
            font-size: 0.85rem;
          }

          .apply-text-desktop {
            display: none;
          }
          
          .apply-text-mobile {
            display: inline;
          }
        }
      `}</style>
    </nav>
  )
} 