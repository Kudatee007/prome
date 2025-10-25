import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function isFbqError(e: unknown): e is FetchBaseQueryError {
  return typeof e === "object" && e !== null && "status" in e;
}