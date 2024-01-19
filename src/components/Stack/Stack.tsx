import type { StackProps } from "./Stack.types";
import "./Stack.css";

export default function Stack({ children }: StackProps) {
  return <div className="stack">{children}</div>;
}
