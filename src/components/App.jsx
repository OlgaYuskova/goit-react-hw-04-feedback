import React from 'react';
import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const feedbackOptions = Object.keys(state);

  const { good, neutral, bad } = state;

  const incrementFeedback = feedbackTypeBtn => {
    setState(prevState => ({
      ...prevState,
      [feedbackTypeBtn]: prevState[feedbackTypeBtn] + 1,
    }));
  };

  //   useEffect(feedbackTypeBtn => {
  //     setState(prevState => ({
  //       [feedbackTypeBtn]: prevState[feedbackTypeBtn] + 1,
  //     }));
  //   }, [state]);

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();

    if (total === 0) {
      return 0;
    }

    return Math.round((good / total) * 100);
  };

  const total = countTotalFeedback();

  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Section title="Please leave feedback">
      <FeedbackOptions
        options={feedbackOptions}
        onLeaveFeedback={incrementFeedback}
      />
      {total > 0 ? (
        <Statistics
          title="Statistics"
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};
