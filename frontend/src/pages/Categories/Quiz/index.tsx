import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Category,
  Question,
  SessionData,
  Choice,
  UserProgress,
} from '../../../actions';
import axios from 'axios';
import { config } from '../../../actions/config';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import ResultsPage from '../../Results';

interface Props {
  currentLogin: SessionData;
}

interface RecordedQuizData {
  answers: number[];
  status: number;
}

const QuizPage = ({ currentLogin: { user, token } }: Props) => {
  const { categorySlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>();
  const [choices, setChoices] = useState<Choice[][]>();
  const [answers, setAnswers] = useState<number[]>([]);
  const [category, setCategory] = useState<Category>();
  const [userProgress, setUserProgress] = useState<UserProgress>();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getCategory();
    await getQuestions().then((res) => res && checkForQuizData(res));
    await getChoices();
  };

  const checkForQuizData = (questions: Question[]) => {
    if (!categorySlug) return;
    axios
      .get<UserProgress>(
        `${config.URL}/users/${user.id}/${categorySlug}/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (!res.data) {
          axios
            .post<UserProgress>(
              `${config.URL}/users/${user.id}/${categorySlug}/progress`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => setUserProgress(res.data));
        } else {
          setUserProgress(res.data);
          if (res.data.status === 1) {
            setPage(questions?.length || 0);
          } else {
            let oldData: RecordedQuizData;
            if (localStorage.getItem(categorySlug)) {
              oldData = JSON.parse(localStorage.getItem(categorySlug) || '');
              setPage(oldData.status);
              setAnswers(oldData.answers);
            }
          }
        }
        setLoading(false);
      });
  };

  const getCategory = async () => {
    if (!categorySlug) return;
    return await axios
      .get(`${config.URL}/categories/${categorySlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategory(res.data);
        return res.data;
      });
  };

  const getQuestions = async () => {
    if (!categorySlug) return;
    return await axios
      .get<Question[]>(`${config.URL}/categories/${categorySlug}/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuestions(res.data);
        return res.data;
      });
  };

  const getChoices = async () => {
    if (!categorySlug) return;
    return await axios
      .get(`${config.URL}/categories/${categorySlug}/choices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setChoices(res.data);
        return res.data;
      });
  };

  const renderChoice = () => {
    if (!choices) return;
    return choices[page].map((choice: Choice) => {
      return (
        <label className='cursor-pointer label'>
          <button
            className='btn btn-info w-[32rem]'
            onClick={() => {
              nextPage(choice);
            }}
          >
            {choice.choice}
          </button>
        </label>
      );
    });
  };

  useEffect(() => {
    if (!categorySlug) return;
    if (!choices || !userProgress) return;
    if (loading) return;
    localStorage.setItem(
      categorySlug,
      JSON.stringify({
        answers,
        status: page,
      })
    );

    if (page !== questions?.length) return;
    setLoading(true);
    axios.put<UserProgress>(
      `${config.URL}/users/${user.id}/${categorySlug}/progress/${userProgress.id}`,
      { status: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let resultData = {
      user_progress_id: userProgress?.id,
      answers,
      questions: questions.map((question) => question.id),
      results: answers.map(
        (answer, index) =>
          choices[index].filter((choice) => choice.id == answer)[0].is_correct
      ),
    };

    axios
      .post(
        `${config.URL}/users/${user.id}/${categorySlug}/results`,
        resultData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setLoading(false));
  }, [page]);

  const nextPage = (choice: Choice) => {
    if (!categorySlug) return;
    const temp: number[] = [...answers]; // copies current state
    temp[page] = choice.id; // changes the specific section in the state
    setAnswers(temp); // update state with changed index
    setPage(page + 1);
  };

  const renderQuestion = () => {
    if (!questions) return;
    if (page === questions.length) return;
    if (!choices) return;
    return (
      <>
        <div className='card lg:card-side card-bordered'>
          <figure>
            <img
              className='object-fit max-h-64 max-w-64'
              src={config.IMG_URL + questions[page].image}
            />
          </figure>
          <div className='card-body'>
            <h3 className='text-right mr-12'>
              {`${page + 1} of ${questions.length}`}
            </h3>
            <h2 className='card-title'>{questions[page].question}</h2>
            <div className='form-control mx-auto'>{renderChoice()}</div>
            <div className='p-6 w-2/3 mx-auto space-y-2 artboard'>
              <progress
                className='progress progress-info'
                value={page}
                max={questions.length}
              ></progress>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderResultsScreen = () => {
    if (!category || !questions || !answers || !choices) return;
    if (loading) return;
    return (
      <ResultsPage
        category={category}
        questions={questions}
        choices={choices}
      />
    );
  };

  return (
    <div className='container mx-auto'>
      {loading && <Loading />}
      <div className='text-4xl text-left my-5 ml-5'>{category?.title}</div>
      {!loading && renderQuestion()}
      {(page === questions?.length || (page === -1 && !loading)) &&
        renderResultsScreen()}
      {loading && <Loading />}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {})(QuizPage);
