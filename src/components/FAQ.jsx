import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "What time should I arrive for the wedding?",
    answer: "Guest arrival begins at 1:00 PM at the Minor Basilica of the National Shrine of Our Lady of Mt. Carmel. The ceremony will start promptly at 1:30 PM."
  },
  {
    question: "What is the dress code for the event?",
    answer: "We invite you to celebrate in semi-formal cocktail attire, styled in mocha, champagne, and taupe earth tones, and modern traditional Filipino wear."
  },
  {
    question: "Is parking available at both venues?",
    answer: "Yes! Dedicated free guest parking is available at both the Minor Basilica of Mt. Carmel (ceremony) and Oasis Manila (reception)."
  },
  {
    question: "Can I bring a +1 or extra guests?",
    answer: "Due to venue capacity restrictions, we can only accommodate guests listed on your invitation."
  },
  {
    question: "What is your gift preference?",
    answer: "If you are thinking of a gift, we would be grateful for a contribution to our wishing well at the reception. No amount is too small, and your presence on our day means everything."
  }
];

export default function FAQ({ onOpenRSVP }) {
  const [openIndex, setOpenIndex] = useState(0); // Default open first question

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="section-header">
        <p className="section-subtitle">Got Questions?</p>
        <h2 className="section-title font-serif">Frequently Asked Questions</h2>
        <div className="section-divider"></div>
      </div>

      <div className="faq-container">
        <div className="faq-accordion">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-card faq-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-header-${index}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <div className="faq-icon-wrapper">
                    <ChevronDown
                      size={20}
                      className={`faq-chevron ${isOpen ? 'rotate' : ''}`}
                    />
                  </div>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}
                >
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-cta-wrapper">
          <button
            type="button"
            className="btn-hero-primary"
            onClick={onOpenRSVP}
          >
            RSVP Now
          </button>
        </div>
      </div>
    </section>
  );
}
