interface ProfileHobbiesProps {
  hobbies: string;
}

export function ProfileHobbies({ hobbies }: ProfileHobbiesProps) {
  const hobbiesList = hobbies.split(",").map((hobby) => hobby.trim());

  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-primary/20 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/10 via-primaryLight/10 to-info/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <h2 className="mb-4 text-xl font-semibold text-textPrimary">
        Interests and Hobbies
      </h2>

      <div className="flex flex-wrap gap-2">
        {hobbiesList.map((hobby, index) => (
          <span
            key={index}
            className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/20"
          >
            {hobby}
          </span>
        ))}
      </div>
    </div>
  );
}
