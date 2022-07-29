import { IPuppy } from './puppy';

export interface IWaitList {
  id: string;
  date: string;
  puppies: IPuppy[];
}
