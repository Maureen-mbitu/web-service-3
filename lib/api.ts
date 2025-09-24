import { API_BASE_URL } from './constants';

// Generic API fetch function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${url}`, error);
    throw error;
  }
}

// Product API calls
export const productApi = {
  getAll: (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/products?${searchParams}`);
  },

  getById: (id: number) => apiRequest(`/products/${id}`),

  getCategories: () => apiRequest('/products/categories/all'),

  create: (product: any) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  }),

  update: (id: number, product: any) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  }),

  delete: (id: number) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Event API calls
export const eventApi = {
  getAll: (params?: { category?: string; search?: string; featured?: boolean; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/events?${searchParams}`);
  },

  getById: (id: number) => apiRequest(`/events/${id}`),

  getFeatured: () => apiRequest('/events?featured=true'),

  getUpcoming: () => apiRequest('/events?limit=3'),

  register: (eventId: string, data: any) => apiRequest('/events', {
    method: 'POST',
    body: JSON.stringify({ eventId, ...data }),
  }),

  create: (event: any) => apiRequest('/events', {
    method: 'POST',
    body: JSON.stringify(event),
  }),

  update: (id: number, event: any) => apiRequest(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
  }),

  delete: (id: number) => apiRequest(`/events/${id}`, {
    method: 'DELETE',
  }),
};

// Outlet API calls
export const outletApi = {
  getAll: () => apiRequest('/outlets'),

  getById: (id: number) => apiRequest(`/outlets/${id}`),

  create: (outlet: any) => apiRequest('/outlets', {
    method: 'POST',
    body: JSON.stringify(outlet),
  }),
};

// Content API calls
export const contentApi = {
  getAll: (params?: { category?: string; published?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/content?${searchParams}`);
  },

  getById: (id: number) => apiRequest(`/content/${id}`),

  create: (content: any) => apiRequest('/content', {
    method: 'POST',
    body: JSON.stringify(content),
  }),
};

// Survey API calls
export const surveyApi = {
  getAll: () => apiRequest('/surveys'),

  getById: (id: number) => apiRequest(`/surveys/${id}`),

  submitResponse: (id: number, responses: any) => apiRequest(`/surveys/${id}/responses`, {
    method: 'POST',
    body: JSON.stringify(responses),
  }),
};

// Search API calls
export const searchApi = {
  search: (query: string, type?: string) => {
    const searchParams = new URLSearchParams({ q: query });
    if (type) searchParams.append('type', type);
    return apiRequest(`/search?${searchParams}`);
  },
};

// Newsletter API calls
export const newsletterApi = {
  subscribe: (email: string, name?: string) => apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, name }),
  }),

  getSubscribers: () => apiRequest('/newsletter/subscribers'),
};

// Analytics API calls (admin only)
export const analyticsApi = {
  getDashboard: () => apiRequest('/analytics/dashboard'),

  getStats: (period?: string) => {
    const searchParams = period ? new URLSearchParams({ period }) : new URLSearchParams();
    return apiRequest(`/analytics/stats?${searchParams}`);
  },
};

export default {
  productApi,
  eventApi,
  outletApi,
  contentApi,
  surveyApi,
  searchApi,
  newsletterApi,
  analyticsApi,
};