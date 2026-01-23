type Gender = 'male'| 'female' | 'other'

export interface UpdateProfilePayload {
  username?: string;
  phone?: string;
  gender?: Gender;
  city?: string;
  profileImage?: string;
}

export interface SavePostPayload {
  postId: string;
}
