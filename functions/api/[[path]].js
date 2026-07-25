import { handleRequest } from '../api.js';

export async function onRequest(context) {
  return handleRequest(context.request, context.env);
}
