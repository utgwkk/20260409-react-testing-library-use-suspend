import { use } from "react";

type SuspendComponentProps = {
  data: Promise<string>;
};

export function SuspendComponent({ data }: SuspendComponentProps) {
  const str = use(data);
  return <h1>Hello, {str}!</h1>;
}
