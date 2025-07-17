import { http, HttpResponse } from 'msw';

export const handlers = [
  // Auth endpoints
  http.get('/me', () => {
    return HttpResponse.json({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      name: 'Test User',
      bio: 'Test bio',
      profile_image: null,
    });
  }),

  http.post('/login', async ({ request }) => {
    const data = await request.json();
    if (data.username === 'testuser' && data.password === 'password') {
      return HttpResponse.json({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
      });
    }
    return new HttpResponse(null, { status: 401 });
  }),

  http.post('/signup', async ({ request }) => {
    const formData = await request.formData();
    return HttpResponse.json({
      id: 2,
      username: formData.get('username'),
      email: formData.get('email'),
      name: formData.get('name'),
    });
  }),

  http.delete('/logout', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Listings endpoints
  http.get('/listings', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Test Listing 1',
        description: 'Test description 1',
        price: 100,
        image: 'test-image-1.jpg',
        user_id: 1,
      },
      {
        id: 2,
        title: 'Test Listing 2',
        description: 'Test description 2',
        price: 200,
        image: 'test-image-2.jpg',
        user_id: 1,
      },
    ]);
  }),

  http.get('/listings/:id', ({ params }) => {
    return HttpResponse.json({
      id: parseInt(params.id),
      title: `Test Listing ${params.id}`,
      description: `Test description ${params.id}`,
      price: 100,
      image: 'test-image.jpg',
      user_id: 1,
      user: {
        id: 1,
        username: 'testuser',
        name: 'Test User',
      },
    });
  }),

  http.post('/listings', async ({ request }) => {
    const formData = await request.formData();
    return HttpResponse.json({
      id: 3,
      title: formData.get('title'),
      description: formData.get('description'),
      price: parseInt(formData.get('price')),
      image: 'new-image.jpg',
      user_id: 1,
    });
  }),

  // Forums endpoints
  http.get('/forums', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Test Forum 1',
        subforums_length: 2,
      },
      {
        id: 2,
        name: 'Test Forum 2',
        subforums_length: 1,
      },
    ]);
  }),

  http.get('/forums/:id', ({ params }) => {
    return HttpResponse.json({
      id: parseInt(params.id),
      name: `Test Forum ${params.id}`,
      subforums: [
        {
          id: 1,
          name: 'Test Subforum 1',
          forum_id: parseInt(params.id),
        },
      ],
    });
  }),

  // Subforums endpoints
  http.get('/subforums', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Test Subforum 1',
        forum_id: 1,
        forum: 'Test Forum 1',
      },
    ]);
  }),

  http.get('/subforums/:id', ({ params }) => {
    return HttpResponse.json({
      id: parseInt(params.id),
      name: `Test Subforum ${params.id}`,
      forum_id: 1,
      forum: 'Test Forum 1',
      forum_posts: [
        {
          id: 1,
          title: 'Test Post 1',
          body: 'Test post body',
          user: 'testuser',
          userid: 1,
        },
      ],
      comments: [],
    });
  }),

  // Users endpoints
  http.get('/users', () => {
    return HttpResponse.json([
      {
        id: 1,
        username: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
      },
    ]);
  }),

  // Boroughs endpoints
  http.get('/boroughs', () => {
    return HttpResponse.json([
      { id: 1, name: 'Manhattan' },
      { id: 2, name: 'Brooklyn' },
      { id: 3, name: 'Queens' },
      { id: 4, name: 'Bronx' },
      { id: 5, name: 'Staten Island' },
    ]);
  }),

  // Fallback for unhandled requests
  http.get('*', () => {
    console.warn('Unhandled GET request');
    return new HttpResponse(null, { status: 404 });
  }),

  http.post('*', () => {
    console.warn('Unhandled POST request');
    return new HttpResponse(null, { status: 404 });
  }),
];