import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Category, Question, SessionData } from '../../../actions';
import axios from 'axios';
import { config } from '../../../actions/config';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { Choice } from '../../../actions/types';

interface Props {
  currentLogin: SessionData;
}

interface RecordedQuizData {
  answers: number[];
  page: number;
}

const QuizPage = ({ currentLogin }: Props) => {
  const { categorySlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>();
  const [choices, setChoices] = useState<Choice[][]>();
  const [answers, setAnswers] = useState<number[]>([]);
  const [category, setCategory] = useState<Category>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getCategory();
    await getQuestions();
    await getChoices();
    let oldData: RecordedQuizData;
    if (localStorage.getItem('QuizData')) {
      oldData = JSON.parse(localStorage.getItem('QuizData') || '');
      setPage(oldData.page);
      setAnswers(oldData.answers);
    }
    setLoading(false);
  };

  const getCategory = async () => {
    if (categorySlug) {
      await axios
        .get(`${config.URL}/categories/${categorySlug}`, {
          headers: {
            Authorization: `Bearer ${currentLogin.token}`,
          },
        })
        .then((res) => {
          setCategory(res.data);
        });
    }
  };

  const getQuestions = async () => {
    if (categorySlug) {
      await axios
        .get<Question[]>(`${config.URL}/categories/${categorySlug}/questions`, {
          headers: {
            Authorization: `Bearer ${currentLogin.token}`,
          },
        })
        .then((res) => {
          setQuestions(res.data);
        });
    }
  };

  const getChoices = async () => {
    if (categorySlug) {
      await axios
        .get(`${config.URL}/categories/${categorySlug}/choices`, {
          headers: {
            Authorization: `Bearer ${currentLogin.token}`,
          },
        })
        .then((res) => {
          setChoices(res.data);
        });
    }
  };

  const renderChoice = () => {
    if (!choices) return;
    return choices[page].map((choice: Choice) => {
      return (
        <label className='cursor-pointer label'>
          <button
            className='btn btn-info w-[32rem]'
            onClick={() => {
              nextPage(choice.id);
            }}
          >
            {choice.choice}
          </button>
        </label>
      );
    });
  };

  const nextPage = (choiceId: number) => {
    const temp: number[] = [...answers]; // copies current state
    temp[page] = choiceId; // changes the specific section in the state
    setAnswers(temp); // update state with changed index
    setPage(page + 1);
    localStorage.setItem(
      'QuizData',
      JSON.stringify({
        answers,
        page,
      })
    );
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
              className='object-fit'
              src={config.IMG_URL + questions[page].image}
            />
          </figure>
          <div className='card-body'>
            <h3 className='text-right mr-12'>{`${page + 1} of ${
              questions.length
            }`}</h3>
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
    console.log(answers);
    return <div>Results Page</div>;
  };

  return (
    <div className='container mx-auto'>
      {loading && <Loading />}
      <div className='text-4xl text-left my-5 ml-5'>{category?.title}</div>
      {!loading && renderQuestion()}
      {page === questions?.length && renderResultsScreen()}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {})(QuizPage);
