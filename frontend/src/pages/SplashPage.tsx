import React from 'react';

interface Props {
  username?: string;
}

const SplashPage = (props: Props) => {
  return (
    <div>
      <div className='hero min-h-screen bg-base-200'>
        <div className='text-center hero-content'>
          <div className='max-w-md'>
            <h1 className='mb-5 text-5xl font-bold'>Welcome</h1>
            <p className='mb-5'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className='btn btn-primary'>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
