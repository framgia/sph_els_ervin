import API from './baseAPI';

const CategoryAPI = {
  index: () => {
    const options = {
      method: 'GET',
      url: '/categories',
    };

    return API.request(options);
  },

  delete: (slug) => {
    const options = {
      method: 'DELETE',
      url: `categories/${slug}`,
    };
    return API.request(options);
  },

  save: (payload) => {
    const options = {
      method: 'POST',
      url: '/categories',
      data: payload,
    };

    return API.request(options);
  },

  update: (payload, slug) => {
    const options = {
      method: 'PUT',
      url: `/categories/${slug}`,
      data: payload,
    };

    return API.request(options);
  },

  get: (slug) => {
    const options = {
      method: 'GET',
      url: `/categories/${slug}`,
    };

    return API.request(options);
  },
};

export default CategoryAPI;
