import { Navigate, useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import FormError from '../../../components/FormError';
import { Key, useEffect } from 'react';
import axios from 'axios';
import { config } from '../../../actions/config';
import { SessionData, Choice, Question } from '../../../actions/types';
import { connect } from 'react-redux';
import API from '../../../api/baseAPI';

interface FormData {
  question: string;
  choices: {
    choice: string;
  }[];
  is_correct: number;
  question_image: FileList;
}

interface Props {
  currentLogin: SessionData;
}

const AddWordPage = ({ currentLogin: { user, token } }: Props) => {
  const questionDataValidation = {
    question: {
      required: {
        value: true,
        message: 'This field is required',
      },
    },
    choices: {
      required: {
        value: true,
        message: 'Must have at least two choices',
      },
      validate: {
        noDuplicates: (choices: string) =>
          checkDuplicateFields(choices) || 'No Duplicate Choices',
      },
    },
    is_correct: {
      required: {
        value: true,
        message: 'Must select one correct option',
      },
    },
    question_image: {
      required: {
        value: true,
        message: 'Image is required',
      },
      validate: {
        acceptedTypes: (files: any) =>
          ['image/png', 'image/gif', 'image/jpeg', undefined].includes(
            files[0]?.type
          ) || 'Invalid File Type',
      },
    },
  };

  const { categorySlug } = useParams();
  const {
    control,
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      choices: [
        {
          choice: '',
        },
        {
          choice: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
    keyName: 'key',
  });

  const onSubmit = async (data: FormData) => {
    const questionsData = new FormData();
    questionsData.append('image', data.question_image[0]);
    questionsData.append('question', data.question);

    const choicesData = data.choices.map(({ choice }, index) => {
      return {
        choice,
        is_correct: index == data.is_correct,
      };
    });

    const question = await postQuestion(questionsData);
    postChoices(choicesData, question.id).then((res) => {
      <Navigate to='/admin/categories' />;
    });
  };

  const postQuestion = async (questionsData: any) => {
    return API.post<Question>(
      `/categories/${categorySlug}/questions`,
      questionsData
    ).then((res) => {
      return res.data;
    });
  };

  const postChoices = async (choicesData: any, questionId: number) => {
    API.post(`/categories/${categorySlug}/questions/${questionId}/choices`, {
      choices: choicesData,
    });
  };

  const checkDuplicateFields = (word: string) => {
    return (
      getValues('choices').filter(({ choice }) => choice === word).length <= 1
    );
  };

  const renderQuestionSection = () => {
    return (
      <div className='form-control m-5 col-span-4'>
        <label className='label'>
          <span className='label-text'>Question</span>
        </label>
        <input
          type='text'
          placeholder='question'
          className='input mb-2'
          {...register('question', questionDataValidation.question)}
        />
        <FormError message={errors.question?.message} />
        <label className='label'>
          <span className='label-text'>Question Image</span>
        </label>
        <input
          type='file'
          {...register('question_image', questionDataValidation.question_image)}
        />
        <FormError message={errors.question_image?.message} />
      </div>
    );
  };

  useEffect(() => {
    if (fields.length < 2) {
      trigger('choices');
    }
  }, [fields]);

  const addChoiceField = () => {
    append({
      choice: '',
    });
  };

  const deleteChoiceField = (index: number) => {
    remove(index);
  };

  const renderChoicesSection = () => {
    return (
      <div className='form-control m-5 col-span-2'>
        <label className='label pb-1'>
          <span className='label-text'>Choices</span>
        </label>
        {fields.map((field, index) => {
          return (
            <>
              <div key={field.key} className='flex space-x-3 my-1 first:mt-0'>
                <label className='cursor-pointer label'>
                  <div data-tip='is Correct?' className='tooltip tooltip-left'>
                    <input
                      type='radio'
                      className='radio radio-accent'
                      value={index}
                      {...register(
                        'is_correct',
                        questionDataValidation.is_correct
                      )}
                    />
                  </div>
                </label>
                <input
                  className='w-full input input-primary input-bordered'
                  type='text'
                  {...register(
                    `choices.${index}.choice` as const,
                    questionDataValidation.choices
                  )}
                />
                <a
                  className='btn btn-circle bg-red-500 hover:bg-red-600 text-center'
                  onClick={() => deleteChoiceField(index)}
                >
                  -
                </a>
              </div>
              <FormError message={errors.choices?.[index]?.choice?.message} />
            </>
          );
        })}
        <FormError message={errors.is_correct?.message} />
      </div>
    );
  };

  return (
    <div className='container mx-auto'>
      <h2 className='mt-5 text-left ml-5 text-2xl'>Add Word</h2>
      <form
        className='card card-bordered grid grid-cols-6 mt-3 py-5 bg-base-200'
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderQuestionSection()}
        {renderChoicesSection()}
        <div className='col-span-2 mb'>
          <input type='submit' className='btn btn-info float-left ml-5' />
        </div>
        <div className='col-span-2'></div>
        <div className='col-span-2'>
          {/* Can't use button because it submits the form */}
          <a
            className='btn btn-circle btn-info text-2xl text-white hover:bg-blue-500 border-none mt-2'
            onClick={addChoiceField}
          >
            +
          </a>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLogin: state.userToken.SessionData,
  };
};

export default connect(mapStateToProps, {})(AddWordPage);
