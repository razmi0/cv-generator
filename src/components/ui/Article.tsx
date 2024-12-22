/** @jsx h */

import { h } from "@land/jsx";
export default function Article(
  { children }: { children: JSX.Element },
): JSX.Element {
  return <article>{children}</article>;
}
