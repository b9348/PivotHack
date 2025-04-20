import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="faq-container">
      {items.map((item, index) => (
        <div key={index} className={`faq-item ${expandedIndex === index ? 'expanded' : ''}`}>
          <button
            className={`faq-question ${expandedIndex === index ? 'active' : ''}`}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <span className="question-text">{item.question}</span>
            <span className="toggle-icon">
              {expandedIndex === index ? '−' : '+'}
            </span>
          </button>
          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="answer-content">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <style jsx>{`
        .faq-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          text-align: left;
        }

        .faq-item {
          border-bottom: 1px solid rgba(255, 236, 3, 0.2);
          margin-bottom: 1rem;
        }

        .faq-item.expanded {
          margin-bottom: 2rem;
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          width: 100%;
          padding: 1.5rem 2rem;
          background: none;
          border: none;
          color: var(--primary-text);
          font-size: 1.1rem;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: color 0.3s ease;
        }

        .question-text {
          flex: 1;
          margin-right: 1rem;
        }

        .faq-question:hover,
        .faq-question.active {
          color: #FFEC03;
        }

        .toggle-icon {
          display: inline-block;
          color: #FFEC03;
          font-size: 1.5rem;
          font-weight: 300;
          flex-shrink: 0;
          line-height: 1;
          width: 24px;
          text-align: center;
        }

        .faq-answer {
          overflow: hidden;
        }

        .answer-content {
          padding: 0 2rem 2rem 2rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          white-space: pre-line;
        }

        @media (max-width: 768px) {
          .faq-question {
            padding: 1.2rem 1.5rem;
          }

          .answer-content {
            padding: 0 1.5rem 1.5rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
} 