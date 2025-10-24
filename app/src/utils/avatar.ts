import { AVATAR_API } from "@/config/constants";
import type { StrapiUser } from "@/api/authApi";

export function userAvatarUrl(user: StrapiUser): string {
  const name = encodeURIComponent(user.username ?? user.email?.split("@")[0] ?? "User");
  return user?.avatar?.url
    ? user.avatar.url.startsWith("http")
      ? user.avatar.url
      : `${location.origin}${user.avatar.url}`
    : `${AVATAR_API}/?name=${name}&background=random`;
}