import { Moment } from 'moment';
import { IUser } from './user.model';

export const enum Language {
  JAVA = 'JAVA',
  PYTHON = 'PYTHON',
  CSHARP = 'CSHARP',
  PHP = 'PHP',
  OTHER = 'OTHER'
}

export interface IProject {
  id?: number;
  projectTitle?: string;
  description?: any;
  imageContentType?: string;
  image?: any;
  publishedDate?: Moment;
  projectLanguage?: Language;
  isPublished?: boolean;
  title?: IUser;
}

export const defaultValue: Readonly<IProject> = {
  isPublished: false
};
