import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Category,
  Question,
  SessionData,
  Choice,
  UserProgress,
  QuizStatus,
} from '../../../actions';
import { config } from '../../../actions/config';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import ResultsPage from '../../Results';
import API from '../../../api/baseAPI';
import UserProgressAPI from '../../../api/UserProgressAPI';
import CategoryAPI from '../../../api/CategoryAPI';

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
    const quest = await getQuestions();
    quest && checkForQuizData(quest);
    await getChoices();
  };

  function isUserProgressType(object: any): object is UserProgress {
    return 'status' in object;
  }

  const checkForQuizData = async (questions: Question[]) => {
    if (!categorySlug) return;
    const progress = await UserProgressAPI.getUserCategoryProgress(
      user.id,
      categorySlug
    ).then((res) => res.data);
    if (!progress) {
      await UserProgressAPI.create(user.id, categorySlug).then((res) => {
        console.log(res.data);
        setUserProgress(res.data);
      });
    } else {
      isUserProgressType(progress) && setUserProgress(progress);
      if (progress.status !== QuizStatus.UNFINISHED) {
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
    API.get<UserProgress>(`/users/${user.id}/${categorySlug}/progress`).then(
      (res) => {
        if (!res.data) {
          API.post<UserProgress>(
            `/users/${user.id}/${categorySlug}/progress`
          ).then((res) => setUserProgress(res.data));
        } else {
        }
        setLoading(false);
      }
    );
  };

  const getCategory = async () => {
    if (!categorySlug) return;
    return await CategoryAPI.get(categorySlug).then((res) => {
      setCategory(res.data);
      return res.data;
    });
  };

  const getQuestions = async () => {
    if (!categorySlug) return;
    return await API.get<Question[]>(
      `/categories/${categorySlug}/questions`
    ).then((res) => {
      setQuestions(res.data);
      return res.data;
    });
  };

  const getChoices = async () => {
    if (!categorySlug) return;
    return await API.get(`/categories/${categorySlug}/choices`).then((res) => {
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
    if (!choices) return;
    if (!userProgress) return;
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

    UserProgressAPI.update(
      { status: QuizStatus.FINISHED },
      user.id,
      categorySlug,
      userProgress.id
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

    API.post(`/users/${user.id}/${categorySlug}/results`, resultData).then(
      (res) => setLoading(false)
    );
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
    if (page !== questions?.length) return;
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
