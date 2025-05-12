import { useEffect, useRef } from "react";

const teamMembers = [
  {
    name: "Rerey (Repeat)",
    role: "Skin Creator",
    headImage: "https://i.supa.codes/HH74zP",
    teams: "Arteon Studio - Teams",
  },
  {
    name: "Loop",
    role: "Modeller & Texture",
    headImage: "https://i.supa.codes/REPmlr",
    teams: "Arteon Studio - Teams",
  },
  {
    name: "ThatSeii",
    role: "Programmer",
    headImage: "https://i.supa.codes/C4xBtq",
    teams: "Arteon Studio - Teams",
  },
  {
    name: "Nova (Springrey)",
    role: "Programmer",
    headImage: "https://i.supa.codes/j25lqu",
    teams: "Arteon Studio - Teams",
  },
  {
    name: "Kai",
    role: "Render Artist",
    headImage: "https://i.supa.codes/r_dRWm",
    teams: "Arteon Studio - Teams",
  },
];

const TeamsSection = () => {
  const teamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (teamsRef.current) {
      observer.observe(teamsRef.current);
    }

    return () => {
      if (teamsRef.current) {
        observer.unobserve(teamsRef.current);
      }
    };
  }, []);

  return (
    <section id="teams" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-4">
          Our Teams
        </h2>
        <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>

        <div
          ref={teamsRef}
          className="animate-on-scroll flex flex-col items-center gap-8"
        >
          {/* Baris pertama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="group relative bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center"
              >
                <div className="relative w-32 h-32 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={member.headImage}
                    alt={`${member.name}'s Minecraft Head`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-base font-semibold text-gray-700">
                    {member.role}
                  </p>
                </div>
                <div className="mt-4 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-full text-center max-w-full truncate">
                  {member.teams}
                </div>
              </div>
            ))}
          </div>

          {/* Baris kedua */}
          <div className="flex flex-wrap justify-center gap-8 mt-4 w-full">
            {teamMembers.slice(3).map((member, index) => (
              <div
                key={index + 3}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] group relative bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center"
              >
                <div className="relative w-32 h-32 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={member.headImage}
                    alt={`${member.name}'s Minecraft Head`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-base font-semibold text-gray-700">
                    {member.role}
                  </p>
                </div>
                <div className="mt-4 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-full text-center max-w-full truncate">
                  {member.teams}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
