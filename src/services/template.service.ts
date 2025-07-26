import { ParamsAxios, ResponseAxiosService } from '@models/api.model';
import { apiClient } from '@utils/axios-utilities';
import { CURR_API_VERSION, TEMPLATE_SERVICE } from '@utils/constants/api.constants';
import type { Template, TemplateSearch } from '@models/template.model';

const TEMPLATE_CACHE_KEY = 'templates_cache';

class TemplateService {
  private getCacheKey(teamId: number): string {
    return `${TEMPLATE_CACHE_KEY}_${teamId}`;
  }

  private clearCache(teamId: number): void {
    try {
      const cacheKey = this.getCacheKey(teamId);
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.error('Error clearing template cache:', error);
    }
  }

  getTemplates({ 
    configService = { version: CURR_API_VERSION }, 
    params = {} 
  }: ParamsAxios & { 
    params?: TemplateSearch & { page?: number; page_size?: number } 
  } = {}): ResponseAxiosService {
    const searchParams = new URLSearchParams();
    
    // Add pagination params
    searchParams.set('page', (params.page || 1).toString());
    searchParams.set('page_size', (params.page_size || 5).toString());
    
    // Add other params if they exist
    if (params.title) searchParams.set('title', params.title);
    if (params.category) searchParams.set('category', params.category);
    if (params.template_type) searchParams.set('template_type', params.template_type);

    return {
      call: apiClient().get(`/${configService?.version}/${TEMPLATE_SERVICE}?${searchParams}`),
    };
  }

  getTemplate({ 
    configService = { version: CURR_API_VERSION }, 
    id 
  }: ParamsAxios & { id: number }): ResponseAxiosService {
    return {
      call: apiClient().get(`/${configService?.version}/${TEMPLATE_SERVICE}/${id}`),
    };
  }

  createTemplate({ 
    configService = { version: CURR_API_VERSION }, 
    data 
  }: ParamsAxios & { 
    data: Omit<Template, 'id' | 'created_at' | 'updated_at'> 
  }): ResponseAxiosService {
    return {
      call: apiClient().post(`/${configService?.version}/${TEMPLATE_SERVICE}`, {
        template: data
      }),
    };
  }

  updateTemplate({ 
    configService = { version: CURR_API_VERSION }, 
    id, 
    data 
  }: ParamsAxios & { 
    id: number; 
    data: Partial<Template> 
  }): ResponseAxiosService {
    return {
      call: apiClient().put(`/${configService?.version}/${TEMPLATE_SERVICE}/${id}`, {
        template: data
      }),
    };
  }

  deleteTemplate({ 
    configService = { version: CURR_API_VERSION }, 
    id 
  }: ParamsAxios & { id: number }): ResponseAxiosService {
    return {
      call: apiClient().delete(`/${configService?.version}/${TEMPLATE_SERVICE}/${id}`),
    };
  }

  getCategories({ 
    configService = { version: CURR_API_VERSION } 
  }: ParamsAxios = {}): ResponseAxiosService {
    return {
      call: apiClient().get(`/${configService?.version}/${TEMPLATE_SERVICE}/categories`),
    };
  }

  refreshCache(): void {
    this.clearCache(1); // Assuming team ID 1 for now
  }
}

export const templateService = new TemplateService(); 