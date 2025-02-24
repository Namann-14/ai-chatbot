import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FeatureTitle() {
  const words = ["better", "cute", "beautiful", "modern"];

  return (
    (<div className="px-48 pt-12">
      <div
        className="text-5xl mx-auto font-semibold text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        websites with Aceternity UI
      </div>
    </div>)
  );
}
