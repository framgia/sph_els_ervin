import { Category, Choice, Question, QuizStatus } from '../../actions';
import { useEffect, useState } from 'react';
import { SessionData, Result } from '../../actions/types';
import { connect } from 'react-redux';
import API from '../../api/baseAPI';
import UserProgressAPI from '../../api/UserProgressAPI';

interface Props {
  category: Category;
  questions: Question[];
  choices: Choice[][];
  currentLogin: SessionData;
}

const ResultsPage = ({
  currentLogin: { user, token },
  category,
  questions,
  choices,
}: Props) => {
  const [score, setScore] = useState<number>(-1);
  const [quizData, setQuizData] = useState<Result[]>([]);

  useEffect(() => {
    getUsersQuizData();
  }, []);

  useEffect(() => {
    checkQuizStatus().then((res) => {
      res.status === QuizStatus.UNFINISHED && updateStatus(res.id);
    });
  }, [score]);

  const updateStatus = (progressId: number) => {
    UserProgressAPI.update(
      { status: score },
      user.id,
      category.slug,
      progressId
    );
  };

  const checkQuizStatus = async () => {
    return UserProgressAPI.getUserCategoryProgress(user.id, category.slug).then(
      (res) => res.data
    );
  };

  const getUsersQuizData = async () => {
    await API.get<Result[]>(`/users/${user.id}/${category.slug}/results`).then(
      (res) => {
        setQuizData(res.data);
      }
    );
  };

  const getUsersAnswer = (index: number): string | undefined => {
    if (!quizData) return;
    return choices[index].filter(
      (result) => result.id === quizData[index].user_choice_id
    )[0].choice;
  };

  const getCorrectAnswer = (index: number): Choice => {
    return choices[index].filter((choice) => choice.is_correct)[0];
  };

  const getAnswerResult = (index: number): boolean => {
    if (!quizData) return false;
    return quizData[index].is_correct;
  };

  useEffect(() => {
    getTotalScore();
  }, [quizData]);

  const getTotalScore = () => {
    if (!quizData.length) return;
    setScore(quizData.filter((result) => result.is_correct).length);
  };

  const renderResultsData = () => {
    if (!quizData.length) return;
    return questions.map((question: Question, index) => (
      <tr>
        <td>{getAnswerResult(index) ? 'correct' : 'wrong'}</td>
        <td>{question.question}</td>
        <td>{getUsersAnswer(index)}</td>
        <td>{getCorrectAnswer(index).choice}</td>
      </tr>
    ));
  };

  return (
    <div className='overflow-x-auto'>
      <h4 className='p-2 m-2 text-left text-xl ml-4'>
        {`Score: ${score} / ${questions.length}`}
      </h4>
      <table className='table w-full table-fixed'>
        <thead>
          <tr>
            <th className='w-1/4'></th>
            <th>Question</th>
            <th>Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>{quizData && renderResultsData()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {})(ResultsPage);
