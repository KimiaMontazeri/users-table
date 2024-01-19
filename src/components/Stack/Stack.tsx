import type { StackProps } from "./Stack.types";

export default function Stack({ children }: StackProps) {
  return <div className="stack">{children}</div>;
}
