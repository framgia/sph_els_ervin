import { Category, Choice, Question } from '../../actions';
import { useEffect, useState } from 'react';
import { config } from '../../actions/config';
import { SessionData, UserProgress, Result } from '../../actions/types';
import axios from 'axios';
import { connect } from 'react-redux';

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
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<Result[]>();

  useEffect(() => {
    getUsersQuizData();
  }, []);

  useEffect(() => {
    checkQuizStatus().then((res) => {
      res.status === -1 && updateStatus(res.id);
    });
  }, [score]);

  const updateStatus = (progressId: number) => {
    axios.put(
      `${config.URL}/users/${user.id}/${category.slug}/progress/${progressId}`,
      { status: score },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const checkQuizStatus = async () => {
    return axios
      .get<UserProgress>(
        `${config.URL}/users/${user.id}/${category.slug}/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  };

  const getUsersQuizData = async () => {
    await axios
      .get<Result[]>(
        `${config.URL}/users/${user.id}/${category.slug}/results`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setQuizData(res.data);
      });
  };

  const getUsersAnswer = (index: number): string => {
    if (!quizData) return '';
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
    if (!quizData) return false;
    setScore(quizData.filter((result) => result.is_correct).length);
  };

  const renderResultsData = () => {
    return questions.map((question: Question, index) => {
      return (
        <tr>
          <td>{getAnswerResult(index) ? 'correct' : 'wrong'}</td>
          <td>{question.question}</td>
          <td>{getUsersAnswer(index)}</td>
          <td>{getCorrectAnswer(index).choice}</td>
        </tr>
      );
    });
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
        <tbody>{renderResultsData()}</tbody>
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
