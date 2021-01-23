/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import { createApi } from 'unsplash-js';

type UseUnsplashT = [Image[], (value: React.SetStateAction<string>) => void];

export interface Image {
  alt_description: string,
  blur_hash: string,
  categories: string[],
  color: string,
  created_at: string,
  current_user_collections: any[],
  description: null | any,
  height: number,
  id: string,
  liked_by_user: boolean,
  likes: number,
  links: any,
  promoted_at: null | any,
  sponsorship: null | any,
  tags: any[],
  updated_at: string,
  urls: any,
  user: any,
  width: number,
}

const useGetImages = (accessKey: string): UseUnsplashT => {
  const [images, setImages] = useState<Image[]>([]);
  const [category, setCategory] = useState<string>('random');
  const api = useRef(createApi({ accessKey }));

  useEffect(() => {
    api.current.search
      .getPhotos({
        query: category,
        orientation: 'landscape',
        page: 1,
        perPage: 40,
        // color: 'yellow'
      })
      .then((result: any) => {
        setImages(result?.response?.results);
      })
      .catch(e => {
        console.log('something went wrong: ', e);
      });
  }, [category]);

  return [images, setCategory];
};

export default useGetImages;
