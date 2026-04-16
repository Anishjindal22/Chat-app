const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-12 relative overflow-hidden bg-base-300/30">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
      
      <div className="max-w-md w-full text-center relative z-10 glassmorphism p-10 rounded-3xl">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-white/5 backdrop-blur-sm ${
                i % 2 === 0 ? "animate-[pulse_3s_ease-in-out_infinite]" : "animate-[pulse_4s_ease-in-out_infinite]"
              } hover:scale-105 transition-transform duration-300 cursor-pointer`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-br from-base-content to-base-content/60 bg-clip-text text-transparent">{title}</h2>
        <p className="text-base-content/70 leading-relaxed font-medium">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
