// varcel을 위한 코드
import fetch from "node-fetch";
import { VercelRequest, VercelResponse } from "@vercel/node";

const { APIKEY } = process.env;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://omdbapi.com?apikey=${APIKEY}&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=${APIKEY}&s=${title}&page=${page}`;

  const res = await fetch(url);
  const json = await res.json();

  // 정상일때 보내는 코드: 200
  response.status(200).json(json);
}
