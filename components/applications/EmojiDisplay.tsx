"use client";

interface EmojiDisplayProps {
  count: number;
}

const EMOJI_RANGES = [
  { min: -Infinity, max: 0, emoji: "🫵😹" },
  { min: 1, max: 3, emoji: "😊" },
  { min: 4, max: 7, emoji: "🤓" },
  { min: 8, max: 15, emoji: "😎" },
  { min: 16, max: 24, emoji: "🤯" },
  { min: 25, max: Infinity, emoji: "💀" },
];

export function EmojiDisplay({ count }: EmojiDisplayProps) {
  if (isNaN(count)) return null;

  const matchedEmoji = EMOJI_RANGES.find(
    (range) => count >= range.min && count <= range.max,
  )?.emoji;

  return matchedEmoji ? (
    <p className="pointer-events-none absolute right-3 top-2 z-20 text-lg md:right-8 md:top-1.5 md:text-xl">
      {matchedEmoji}
    </p>
  ) : null;
}
