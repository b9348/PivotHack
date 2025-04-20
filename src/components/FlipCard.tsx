import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FlipCardProps {
  title: string;
  children: ReactNode;
  isVisible: boolean;
  isLast?: boolean;
}

export default function FlipCard({ title, children, isVisible, isLast }: FlipCardProps) {
  return (
    <div className="flip-card-wrapper">
      <motion.div
        className="flip-card"
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ 
          rotateY: isVisible ? 0 : 90,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flip-card-inner">
          <h3>{title}</h3>
          <div className="flip-card-content">
            {children}
          </div>
        </div>
      </motion.div>
      {!isLast && <div className="vertical-separator" />}
      <style jsx>{`
        .flip-card-wrapper {
          flex: 1;
          display: flex;
          align-items: stretch;
          min-width: 0; /* Important for text wrapping */
        }

        .vertical-separator {
          width: 1px;
          background: rgba(255, 236, 3, 0.3);
          margin: 2rem 0;
        }

        :global(.flip-card) {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
          margin: 1rem;
          min-height: 400px;
          perspective: 1000px;
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          :global(.flip-card) {
            min-height: 300px;
            padding: 1.5rem;
          }
        }

        :global(.flip-card-inner) {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #FFEC03;
          margin: 0;
          word-wrap: break-word;
          hyphens: auto;
        }

        :global(.flip-card-content) {
          flex: 1;
          font-size: 1rem;
          line-height: 1.6;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        }

        :global(.flip-card-content ul) {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        :global(.flip-card-content li) {
          margin-bottom: 1rem;
          word-wrap: break-word;
          hyphens: auto;
        }

        @media (max-width: 1200px) {
          .flip-card-wrapper {
            width: 100%;
          }

          .vertical-separator {
            display: none;
          }

          :global(.flip-card) {
            width: 100%;
            margin: 1rem 0;
          }
        }
      `}</style>
    </div>
  );
} 