type TooltipTextProps = {
    text: string;
    lines?: number;
  };
  
  export const TooltipText = ({ text, lines = 2 }: TooltipTextProps) => {
    return (
      <div className="relative group">
        {/* CLAMPED TEXT */}
        <p className={`text-sm text-body line-clamp-${lines}`}>
          {text}
        </p>
  
        {/* TOOLTIP */}
        <div
          className="
            absolute left-0 top-full z-20 mt-2 w-max max-w-xs
            rounded-lg bg-dark text-white text-xs
            px-3 py-2
            opacity-0 scale-95
            pointer-events-none
            group-hover:opacity-100 group-hover:scale-100
            transition-all duration-200
            shadow-xl
          "
        >
          {text}
        </div>
      </div>
    );
  };
  