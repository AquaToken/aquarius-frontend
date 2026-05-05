import * as React from 'react';
import styled, { css } from 'styled-components';

import { useScrollAnimation } from 'hooks/useScrollAnimation';

import Contacts from 'components/Contacts';
import Question from 'components/Question';

import { slideUpSoftAnimation } from 'styles/animations';
import { commonMaxWidth, noSelect, respondDown } from 'styles/mixins';
import { Breakpoints, COLORS } from 'styles/style-constants';

export type QuestionType = {
    question: string;
    answer: string | React.ReactNode;
};

type AnimationProps = {
    $animated: boolean;
    $visible: boolean;
};

const Container = styled.div<AnimationProps>`
    ${commonMaxWidth};
    display: flex;
    width: 100%;
    padding: 5rem 4rem 0;
    opacity: ${({ $animated }) => ($animated ? 0 : 1)};
    transform: ${({ $animated }) => ($animated ? 'translateY(30px)' : 'none')};
    ${({ $animated }) => $animated && 'transition: opacity 0.8s ease-out, transform 0.8s ease-out;'}

    ${({ $animated, $visible }) =>
        $animated &&
        $visible &&
        css`
            opacity: 1;
            transform: translateY(0);
        `}

    ${respondDown(Breakpoints.md)`
    flex-direction: column;
    padding: 5rem 1.6rem;
    background: ${COLORS.gray50};
  `}

  & > * {
        ${noSelect};
    }
`;

const QuestionsBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const QuestionItem = styled.div<AnimationProps & { $delay: number }>`
    opacity: ${({ $animated }) => ($animated ? 0 : 1)};

    ${({ $animated, $visible, $delay }) =>
        $animated &&
        $visible &&
        css`
            ${slideUpSoftAnimation};
            animation-delay: ${$delay}s;
        `}
`;

interface Props {
    questions: QuestionType[];
    disableAnimation?: boolean;
}

const FAQ: React.FC<Props> = ({ questions, disableAnimation = false }) => {
    const { ref, visible } = useScrollAnimation(0.2, true);
    const animated = !disableAnimation;

    return (
        <Container
            ref={ref as React.RefObject<HTMLDivElement>}
            $animated={animated}
            $visible={visible}
        >
            <Contacts />
            <QuestionsBlock>
                {questions.map((question, index) => (
                    <QuestionItem
                        key={question.question}
                        $animated={animated}
                        $visible={visible}
                        $delay={index * 0.1}
                    >
                        <Question question={question.question} answer={question.answer} />
                    </QuestionItem>
                ))}
            </QuestionsBlock>
        </Container>
    );
};

export default FAQ;
