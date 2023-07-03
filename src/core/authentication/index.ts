import fetch from 'node-fetch';
import { userAgent } from '../../constants';
import { fetchAikotobaCookie, fetchUserCookie } from './fetchers';

export const getAikotobaCookie = async (aikotoba: string): Promise<string> => {
  const cookie = await fetchAikotobaCookie(aikotoba);
  return cookie;
};

export const getUserCookie = async ({ email, password }: { email: string; password: string }): Promise<string> => {
  const cookie = await fetchUserCookie(email, password);
  return cookie;
};

export const checkValidityCookie = async (cookie: string): Promise<boolean> => {
  const res = await fetch('https://reserva.be/mypage/reservehistory', {
    method: 'HEAD',
    headers: {
      cookie,
      'User-Agent': userAgent,
    },
    redirect: 'manual',
  });
  const location = res.headers.get('location');
  return !location;
};
