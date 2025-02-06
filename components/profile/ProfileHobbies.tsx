import { Heart, Sparkles } from "lucide-react";

interface ProfileHobbiesProps {
  hobbies: string;
}

export function ProfileHobbies({ hobbies }: ProfileHobbiesProps) {
  const hobbiesList = hobbies.split(",").map((hobby) => hobby.trim());

  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-primary/20 p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-lg">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-primaryLight/10 to-info/10 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />

      {/* Decorative icons */}
      <Heart className="absolute -right-12 -top-12 h-32 w-32 rotate-12 text-primary/5 transition-all duration-500 group-hover:scale-105 group-hover:text-primary/10" />
      <Sparkles className="absolute -bottom-8 -left-8 h-24 w-24 -rotate-12 text-primary/5 transition-all duration-500 group-hover:scale-105 group-hover:text-primary/10" />

      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Heart
          strokeWidth={3}
          className="size-4 fill-primary/25 text-primary transition-transform group-hover:-rotate-12 group-hover:scale-110"
        />
        <h2 className="text-xl font-semibold tracking-wide text-textPrimary">
          Interests and Hobbies
        </h2>
      </div>

      {/* Hobbies list with staggered animation */}
      <div className="flex flex-wrap gap-2">
        {hobbiesList.map((hobby, index) => (
          <span
            key={index}
            className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm transition-all duration-300 animate-in fade-in zoom-in hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary/20 hover:shadow-md"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "backwards",
            }}
          >
            {hobby}
          </span>
        ))}
      </div>
    </div>
  );
}
