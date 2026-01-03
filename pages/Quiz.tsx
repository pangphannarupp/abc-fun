import React, { useState, useEffect } from 'react';
import { LetterData } from '../types';
import QuizFind from './QuizFind';
import QuizMatch from './QuizMatch';

interface QuizProps {
  letter: LetterData;
  onBack: () => void;
  onComplete: () => void;
  themeColor?: string;
}

const Quiz: React.FC<QuizProps> = (props) => {
  const [gameType, setGameType] = useState<'find' | 'match'>('find');

  useEffect(() => {
    // Randomly select a game type on mount
    const type = Math.random() > 0.5 ? 'find' : 'match';
    setGameType(type);
  }, []);

  if (gameType === 'match') {
    return <QuizMatch {...props} themeColor={props.themeColor || 'var(--color-primary)'} />;
  }

  return <QuizFind {...props} />;
};

export default Quiz;
