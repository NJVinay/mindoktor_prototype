'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/app/data/mockData';
import { useTriageStore } from '@/app/store/triageStore';
import SuggestionChip from './SuggestionChip';
import './CategoryGrid.css';

export default function CategoryGrid() {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const setSelectedCategory = useTriageStore((s) => s.setSelectedCategory);

  const handleCategoryClick = (key: string, isMisc?: boolean) => {
    if (isMisc) {
      router.push('/triage');
      return;
    }
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  const handleConditionClick = (condition: string, categoryKey: string) => {
    setSelectedCategory(categoryKey);
    router.push(`/triage?category=${categoryKey}&condition=${encodeURIComponent(condition)}`);
  };

  const regularCategories = categories.filter((c) => !c.isMisc);
  const miscCategory = categories.find((c) => c.isMisc);

  return (
    <div className="category-grid">
      <div className="category-grid__tiles">
        {regularCategories.map((cat, index) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
            style={{ position: 'relative' }}
          >
            <button
              className={`category-tile ${expandedCategory === cat.key ? 'category-tile--expanded' : ''}`}
              onClick={() => handleCategoryClick(cat.key)}
              aria-expanded={expandedCategory === cat.key}
              aria-label={`${cat.name}, ${cat.conditionCount} conditions`}
            >
              <span className="category-tile__icon" aria-hidden="true">{cat.icon}</span>
              <span className="category-tile__name">{cat.name}</span>
              <span className="category-tile__badge">{cat.conditionCount}</span>
            </button>

            <AnimatePresence>
              {expandedCategory === cat.key && cat.conditions && (
                <motion.div
                  className="category-tile__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="category-tile__conditions">
                    {cat.conditions.map((cond) => (
                      <SuggestionChip
                        key={cond}
                        label={cond}
                        onClick={() => handleConditionClick(cond, cat.key)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Misc Tile */}
      {miscCategory && (
        <motion.button
          className="category-tile category-tile--misc"
          onClick={() => handleCategoryClick(miscCategory.key, true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
          aria-label="Not sure? Let us guide you through triage"
        >
          <span className="category-tile__icon" aria-hidden="true">{miscCategory.icon}</span>
          <span className="category-tile__name">{miscCategory.name}</span>
          <span className="category-tile__arrow">→</span>
        </motion.button>
      )}
    </div>
  );
}
