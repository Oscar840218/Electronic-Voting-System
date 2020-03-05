import { Candidate } from './candidate';
import { Profile } from './profile';

export class User {
  resident_id: string;
  role: string;
  profile: Profile;
  candidate: Candidate;
}
