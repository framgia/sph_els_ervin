import API from './baseAPI';

const UserProgressAPI = {
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

  create: (userid, slug) => {
    const options = {
      method: 'POST',
      url: `/users/${userid}/${slug}/progress`,
    };

    return API.request(options);
  },

  update: (payload, userid, slug, progressid) => {
    const options = {
      method: 'PUT',
      url: `/user/${userid}/${slug}/progress/${progressid}`,
      data: payload,
    };

    return API.request(options);
  },

  getUserCategoryProgress: (userid, slug) => {
    const options = {
      method: 'GET',
      url: `/users/${userid}/${slug}/progress`,
    };

    return API.request(options);
  },

  getUserProgress: (userid) => {
    const options = {
      method: 'GET',
      url: `/users/${userid}/progress`,
    };

    return API.request(options);
  },
};

export default UserProgressAPI;
